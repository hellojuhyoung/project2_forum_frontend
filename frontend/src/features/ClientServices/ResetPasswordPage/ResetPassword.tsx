// frontend/pages/auth/reset/password.tsx
import { ResetPasswordStyled } from "./styled"; // We'll create this styled component below
import clsx from "clsx";

import * as Yup from "yup";
import { instance } from "@/utils/apis/axios"; // Assuming this is your Axios instance

import { Form, Formik, Field, FormikHelpers, ErrorMessage } from "formik";
import { Button, Input, notification } from "antd"; // Import necessary Ant Design components
import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // Import useEffect for token extraction
import { useTranslation } from "react-i18next";

const backendErrorMessageMap: { [key: string]: string } = {
  "Invalid or expired token.": "token_invalid_or_expired_backend_error",
  "Password reset failed.": "password_reset_failed_backend_error",
  "An unexpected error occurred during password reset.":
    "unexpected_error_backend_reset_password",
};

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

const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation("ClientServices.resetpassword");
  const router = useRouter();
  const [passwordToken, setPasswordToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);

  // --- Validation Schema (Yup) ---
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, t("new_password_min_length_validation"))
      .max(16, t("new_password_max_length_validation"))
      .required(t("new_password_required_validation")),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("confirm_password_match_validation")) // Translate
      .required(t("confirm_password_required_validation")),
  });

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
          message: t("invalid_link_notification_message"),
          description: t("invalid_link_notification_description"),
          placement: "topRight",
        });
        router.push("/auth/forgot/password");
      }
      setLoadingToken(false);
    }
  }, [router.isReady, router.query, router, t]); // Depend on router.isReady and router.query

  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting, resetForm }: FormikHelpers<ResetPasswordValues>
  ) => {
    setSubmitting(true);

    if (!passwordToken) {
      notification.error({
        message: t("missing_token_error_message"),
        description: t("missing_token_error_description"),
        placement: "topRight",
      });
      setSubmitting(false);
      return;
    }

    try {
      const response: any = await instance.post("/auth/reset-password", {
        token: passwordToken,
        newPassword: values.newPassword,
      });

      console.log("Password reset response:", response);

      notification.success({
        message: t("password_reset_success_message"),
        description: t("password_reset_success_description"),
        placement: "topRight",
      });

      resetForm();
      router.push("/auth/login"); // Redirect to login page after successful reset
    } catch (error: any) {
      console.error(
        "error resetting password",
        error?.response || error.message
      );
      const backendErrorMsg = error?.response?.message || error?.message;
      const translatedErrorDescription = backendErrorMsg
        ? t(
            backendErrorMessageMap[backendErrorMsg] ||
              "password_reset_failed_description_generic"
          )
        : t("password_reset_failed_description_generic");
      notification.error({
        message: t("password_reset_failed_message"),
        description: translatedErrorDescription,
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
          <p>{t("loading_reset_link_message")}</p>
        </div>
      </ResetPasswordStyled>
    );
  }

  // Render form only if token is available
  return (
    <ResetPasswordStyled className={clsx("reset-password-container")}>
      <div className="input-container">
        <h2>{t("reset_password_title")}</h2>
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
                  placeholder={t("new_password_placeholder")}
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
                  placeholder={t("confirm_new_password_placeholder")}
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
                  {t("reset_password_button")}
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
