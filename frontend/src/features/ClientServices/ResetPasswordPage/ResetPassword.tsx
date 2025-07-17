// frontend/src/features/ClientServices/ResetPasswordPage/ResetPassword.tsx

import { ResetPasswordStyled } from "./styled";
import clsx from "clsx";

import * as Yup from "yup";
import { instance } from "@/utils/apis/axios";

import { Form, Formik, Field, FormikHelpers, ErrorMessage } from "formik";
import { Button, Input, notification } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react"; // Add useCallback
import { useTranslation } from "react-i18next";
import Link from "next/link";

const backendErrorMessageMap: { [key: string]: string } = {
  "Invalid or expired token.": "token_invalid_or_expired_backend_error",
  "Password reset failed.": "password_reset_failed_backend_error",
  "An unexpected error occurred during password reset.":
    "unexpected_error_backend_reset_password",
};

interface ResetPasswordValues {
  newPassword: string;
  confirmNewPassword: string;
}

const initialValues: ResetPasswordValues = {
  newPassword: "",
  confirmNewPassword: "",
};

const ResetPassword: React.FC = () => {
  const { t } = useTranslation("ClientServices.resetpassword");
  const router = useRouter();
  const [passwordToken, setPasswordToken] = useState<string | null>(null);
  // Keep loadingToken true initially. Set to false only after token check.
  const [loadingToken, setLoadingToken] = useState(true);
  const [hasCheckedToken, setHasCheckedToken] = useState(false); // New state variable

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, t("new_password_min_length_validation"))
      .max(16, t("new_password_max_length_validation"))
      .required(t("new_password_required_validation")),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("confirm_password_match_validation"))
      .required(t("confirm_password_required_validation")),
  });

  // Use useCallback to memoize the token check function
  const checkToken = useCallback(() => {
    // --- START DEBUG CONSOLES ---
    console.log("checkToken function executing.");
    console.log("router.isReady:", router.isReady);
    console.log("Current router.query:", router.query);
    // --- END DEBUG CONSOLES ---

    if (router.isReady) {
      const { token } = router.query;

      // --- START DEBUG CONSOLES ---
      console.log("Extracted 'token' variable in checkToken:", token);
      console.log("Type of 'token' in checkToken:", typeof token);
      // --- END DEBUG CONSOLES ---

      if (typeof token === "string") {
        setPasswordToken(token);
        console.log("Token successfully set to state in checkToken:", token);
      } else {
        console.log(
          "Token is NOT a string or is missing in checkToken. Triggering error/redirect."
        );
        notification.error({
          message: t("invalid_link_notification_message"),
          description: t("invalid_link_notification_description"),
          placement: "topRight",
        });
        // This is the line that redirects if token is missing
        router.push("/auth/forgot/password");
      }
      setLoadingToken(false); // Done loading regardless of success/failure
      setHasCheckedToken(true); // Mark that we've performed the check
    }
  }, [router.isReady, router.query, router, t]);

  useEffect(() => {
    // Only run checkToken if we haven't already and router is ready
    if (!hasCheckedToken && router.isReady) {
      checkToken();
    }
  }, [router.isReady, hasCheckedToken, checkToken]); // Depend on checkToken, hasCheckedToken, router.isReady

  // Optional: Add another useEffect to handle cases where router.query changes *after* initial ready state
  // This is less common for direct links but can prevent issues in some navigations.
  // useEffect(() => {
  //   if (router.isReady && !hasCheckedToken && router.query.token && typeof router.query.token === 'string') {
  //     console.log("Router query updated with token after initial check, processing...");
  //     checkToken();
  //   }
  // }, [router.isReady, router.query.token, hasCheckedToken, checkToken]);

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
      router.push("/auth/login");
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
        : t("password_reset_failed_generic");
      notification.error({
        message: t("password_reset_failed_message"),
        description: translatedErrorDescription,
        placement: "topRight",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Only render the form (or error state) once token check is complete
  if (loadingToken) {
    return (
      <ResetPasswordStyled className={clsx("reset-password-container")}>
        <div className="input-container">
          <p>{t("loading_reset_link_message")}</p>
        </div>
      </ResetPasswordStyled>
    );
  }

  // If loadingToken is false but passwordToken is null, it means the check failed.
  // We can render an error message here instead of just redirecting.
  if (!passwordToken && hasCheckedToken) {
    return (
      <ResetPasswordStyled className={clsx("reset-password-container")}>
        <div className="input-container">
          <h2>{t("reset_password_title")}</h2>
          <p>{t("invalid_link_notification_description")}</p>
          <div className="back-to-forgot-link-container">
            <Link href="/auth/forgot/password" className="auth-utility-link">
              {t("request_new_link_button")} {/* New translation key */}
            </Link>
          </div>
        </div>
      </ResetPasswordStyled>
    );
  }

  // Render form only if token is available and check is complete
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

export default ResetPassword;
