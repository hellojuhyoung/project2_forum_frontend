import { ForgotPasswordStyled } from "./styled";

import React, { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { instance } from "@/utils/apis/axios";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
const backendErrorMessageMap: { [key: string]: string } = {
  "Email address is required.": "email_required_backend_error_fp",
  "An error occurred while processing your request.":
    "generic_processing_error_fp",
};

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation("ClientServices.forgotpassword");

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      const response: any = await instance.post(
        "/auth/request-password-reset",
        {
          email: values.email,
        }
      );

      if (response && response.message) {
        notification.success({
          message: t("request_sent_message"), // Translate "Request Sent"
          description: t("forgot_password_success_description_generic"), // Translate the specific backend message
          placement: "topRight",
        });
      } else {
        notification.success({
          message: "Request Sent",
          description:
            "If an account is associated with this email, a password reset link has been sent to your inbox.",
          placement: "topRight",
        });
      }
      form.resetFields();

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      console.error("Password reset request error:", error);

      const backendErrorMsg = error.response?.message;
      const translatedErrorDescription = backendErrorMsg
        ? t(
            backendErrorMessageMap[backendErrorMsg] ||
              "request_failed_description_generic_fp"
          )
        : t("request_failed_description_generic_fp");

      notification.error({
        message: t("request_failed_message_fp"),
        description: translatedErrorDescription,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotPasswordStyled className={clsx("find-password-page-container")}>
      <div className="input-container">
        <Title level={4} className="page-title">
          {t("forgot_password_title")}
        </Title>
        <Text className="page-description">
          {t("forgot_password_description")}
        </Text>

        <Form
          form={form}
          name="forgot_password_request"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t("email_required_message_fp") },
              { type: "email", message: t("email_invalid_message_fp") },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder={t("email_placeholder_fp")}
              className="input-username"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="button-login"
            >
              {t("send_reset_link_button")}
            </Button>
          </Form.Item>
        </Form>

        <div className="back-to-login-link-container">
          <Link href="/auth/login" className="auth-utility-link">
            {t("back_to_login_link")}
          </Link>
        </div>
      </div>
    </ForgotPasswordStyled>
  );
};

export default ForgotPassword;
