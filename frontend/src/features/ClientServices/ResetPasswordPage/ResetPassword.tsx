// frontend/pages/auth/reset/password.tsx
import { ResetPasswordStyled } from "./styled"; // We'll create this styled component below
import clsx from "clsx";

import * as Yup from "yup";
import { instance } from "@/utils/apis/axios"; // Assuming this is your Axios instance

import { Form, Formik, Field, FormikHelpers, ErrorMessage } from "formik";
import { Button, Input, notification } from "antd"; // Import necessary Ant Design components
import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // Import useEffect for token extraction

// --- Interfaces ---
interface ResetPasswordValues {
  newPassword: string;
  confirmNewPassword: string;
}

// --- Initial Values ---
const initialValues: ResetPasswordValues = {
  newPassword: "",
  confirmNewPassword: "",
};

// --- Validation Schema (Yup) ---
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .max(16, "New password must be at most 16 characters")
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match") // Ensures it matches newPassword
    .required("Confirm password is required"),
});

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [passwordToken, setPasswordToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);

  // Extract token from URL query parameters when the component mounts
  useEffect(() => {
    if (router.isReady) {
      // Ensure router is ready before accessing query params
      const { token } = router.query;
      if (typeof token === "string") {
        setPasswordToken(token);
      } else {
        // Handle case where token is missing or not a string (e.g., redirect or show error)
        notification.error({
          message: "Invalid Link",
          description: "Password reset token is missing or invalid.",
          placement: "topRight",
        });
        // router.push("/auth/forgot/password");
      }
      setLoadingToken(false);
    }
  }, [router.isReady, router.query, router]); // Depend on router.isReady and router.query

  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting, resetForm }: FormikHelpers<ResetPasswordValues>
  ) => {
    setSubmitting(true);

    if (!passwordToken) {
      notification.error({
        message: "Error",
        description:
          "Missing reset token. Please use the link from your email.",
        placement: "topRight",
      });
      setSubmitting(false);
      return;
    }

    try {
      // Backend endpoint to reset the password
      // Make sure this matches your backend's POST /api/auth/reset-password endpoint
      const response: any = await instance.post("/auth/reset-password", {
        token: passwordToken,
        newPassword: values.newPassword,
      });

      console.log("Password reset response:", response);

      notification.success({
        message: "Password Reset Successful",
        description: "Your password has been updated. Please log in.",
        placement: "topRight",
      });

      resetForm();
      router.push("/auth/login"); // Redirect to login page after successful reset
    } catch (error: any) {
      console.error(
        "error resetting password",
        error?.response || error.message
      );
      const errorMessage =
        error?.response?.message ||
        "An unexpected error occurred during password reset.";
      notification.error({
        message: "Password Reset Failed",
        description: errorMessage,
        placement: "topRight",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingToken) {
    return (
      <ResetPasswordStyled className={clsx("reset-password-container")}>
        <div className="input-container">
          <p>Loading reset link...</p>
        </div>
      </ResetPasswordStyled>
    );
  }

  // Render form only if token is available
  return (
    <ResetPasswordStyled className={clsx("reset-password-container")}>
      <div className="input-container">
        <h2>Reset Your Password</h2>
        <Formik<ResetPasswordValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            isSubmitting,
            handleBlur,
            handleChange,
            setFieldTouched,
            errors,
            touched,
          }) => (
            <Form>
              {/* New Password */}
              <div className="form-field-container">
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password (8-16 chars)"
                  as={Input.Password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setFieldTouched("newPassword", true, false);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  render={(error) => (
                    <div className="error-message">{error}</div>
                  )}
                />
              </div>

              {/* Confirm New Password */}
              <div className="form-field-container">
                <Field
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  as={Input.Password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setFieldTouched("confirmNewPassword", true, false);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="confirmNewPassword"
                  component="div"
                  render={(error) => (
                    <div className="error-message">{error}</div>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="submit-button-container">
                <Button htmlType="submit" disabled={isSubmitting}>
                  Reset Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ResetPasswordStyled>
  );
};

export default ResetPasswordPage;
