// pages/auth/FindUsername.tsx
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ForgotUsernameStyled } from "./styled";
import clsx from "clsx";

import { instance } from "@/utils/apis/axios";
import { useRouter } from "next/router";

const ForgotUsername: React.FC = () => {
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
          message: "Request Sent",
          description: response.message,
          placement: "topRight",
        });
      } else {
        notification.success({
          message: "Request Sent",
          description:
            "If an account is associated with this email, your username has been sent to your inbox.",
          placement: "topRight",
        });
      }
      form.resetFields();

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      console.error("Find username error:", error);
      notification.error({
        message: "Request Failed",
        description:
          error.response?.message || "An error occurred. Please try again.",
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
        <h2 className="page-title">Find Your Username</h2>
        <p className="page-description">
          Enter your registered email address below, and we'll send your
          username to your inbox.
        </p>
        <Form
          form={form}
          name="find_username"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email address!" },
              { type: "email", message: "The input is not a valid E-mail!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email Address"
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
              Send Username
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ForgotUsernameStyled>
  );
};

export default ForgotUsername;
