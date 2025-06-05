import { ForgotPasswordStyled } from "./styled";

import React, { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { instance } from "@/utils/apis/axios";

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
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
          message: "Request Sent",
          description: response.message,
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
    <ForgotPasswordStyled className={clsx("find-password-page-container")}>
      <div className="input-container">
        <Title level={4} className="page-title">
          Forgot Password?
        </Title>
        <Text className="page-description">
          Enter your email address below and we'll send you a link to reset your
          password.
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
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email Address"
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
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>

        <div className="back-to-login-link-container">
          <Link href="/auth/login" className="auth-utility-link">
            Back to Login
          </Link>
        </div>
      </div>
    </ForgotPasswordStyled>
  );
};

export default ForgotPassword;
