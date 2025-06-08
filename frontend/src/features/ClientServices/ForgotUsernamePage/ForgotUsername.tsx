// pages/auth/FindUsername.tsx
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ForgotUsernameStyled } from "./styled";
import clsx from "clsx";

import { instance } from "@/utils/apis/axios";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const backendErrorMessageMap: { [key: string]: string } = {
  "Email address is required.": "email_required_backend_error",
  "An error occurred while processing your request.":
    "generic_processing_error",
};

const ForgotUsername: React.FC = () => {
  // translation
  const { t } = useTranslation("ClientServices.forgotusername");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      const response: any = await instance.post("/auth/forgot/username", {
        email: values.email,
      });

      if (response && response.message) {
        notification.success({
          message: t("request_sent_message"),
          description: t("forgot_username_success_description_generic"),
          placement: "topRight",
        });
      } else {
        notification.success({
          message: t("request_sent_message"),
          description: t("forgot_username_success_description_generic"),
          placement: "topRight",
        });
      }
      form.resetFields();

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      console.error("Find username error:", error);

      const backendErrorMsg = error.response?.message;
      const translatedErrorDescription = backendErrorMsg
        ? t(
            backendErrorMessageMap[backendErrorMsg] ||
              "request_failed_description_generic"
          )
        : t("request_failed_description_generic");

      notification.error({
        message: t("request_failed_message"), // Already translated
        description: translatedErrorDescription,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Use the new FindUsernameStyled component here
    <ForgotUsernameStyled className={clsx("find-username-container")}>
      <div className="input-container">
        <h2 className="page-title">{t("find_username_title")}</h2>
        <p className="page-description">{t("find_username_description")}</p>
        <Form
          form={form}
          name="find_username"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t("email_required_message") },
              { type: "email", message: t("email_invalid_message") },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("email_placeholder")}
              className="input-username" // Keep this class if you have specific username input styles
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              {t("send_username_button")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ForgotUsernameStyled>
  );
};

export default ForgotUsername;
