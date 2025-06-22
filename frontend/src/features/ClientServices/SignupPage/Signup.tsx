// SignupPage.tsx
import { SignupStyled } from "./styled";
import clsx from "clsx";

import * as Yup from "yup";
import { instance } from "@/utils/apis/axios";

// Import Ant Design components including Radio, DatePicker, Select
import { Form, Formik, Field, FormikHelpers, ErrorMessage } from "formik";
import {
  Button,
  Divider,
  Input,
  notification,
  Radio,
  DatePicker,
  Select,
  Space,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment"; // Import moment for date handling if needed for display/parsing
import { useTranslation } from "react-i18next";
import axios from "axios";

const { Option } = Select; // Destructure Option for Select component

const backendMessageMap: { [key: string]: string } = {
  // Username Validation Messages from Backend
  "Username cannot be empty.": "username_cannot_be_empty",
  "Username must be at least 4 characters.":
    "username_min_length_backend_error", // This is redundant with Yup, but if backend sends it.
  "Username is available!": "username_is_available",
  "Username is already taken.": "username_is_already_taken",
  "Error checking username. Please try again.": "error_checking_username",

  // General Error Messages
  "An unexpected error occurred during signup.": "signup_unexpected_error",
  // Add other specific backend messages you might encounter here
  "Please validate your username to ensure it's unique.":
    "username_validation_required_notification", // From handleSubmit logic
};

// --- Interfaces ---
interface SignupValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  occupation: string;
}

const initialValues: SignupValues = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  fullName: "",
  gender: "",
  phoneNumber: "",
  dateOfBirth: "",
  occupation: "",
};

const SignupPage: React.FC = () => {
  const { t } = useTranslation("ClientServices.signup");
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, t("username_min_length_validation"))
      .required(t("username_required_validation")),

    password: Yup.string()
      .min(8, t("password_min_length_validation"))
      .max(16, t("password_max_length_validation"))
      .required(t("password_required_validation")),

    confirmPassword: Yup.string()
      .required(t("confirm_password_required_validation"))
      .oneOf([Yup.ref("password")], t("passwords_must_match_validation")),

    email: Yup.string()
      .email(t("email_invalid_validation"))
      .required(t("email_required_validation")),

    fullName: Yup.string()
      .max(50, t("full_name_max_length_validation"))
      .notRequired(),
    gender: Yup.string().notRequired(),
    phoneNumber: Yup.string()
      .matches(
        /^\+?[0-9\s-()]{7,20}$/,
        t("phone_number_invalid_format_validation")
      )
      .min(7, t("phone_number_too_short_validation"))
      .max(20, t("phone_number_too_long_validation"))
      .notRequired(),
    dateOfBirth: Yup.string().notRequired(),
    occupation: Yup.string()
      .max(100, t("occupation_max_length_validation"))
      .notRequired(),
  });
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePictureFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePictureFile(null);
      setProfilePicturePreview(null);

      // console.log("handleFileChange: No file selected.");
    }
  };

  //
  //
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  ); // true: available, false: taken, null: not checked yet
  const [usernameValidationMessage, setUsernameValidationMessage] = useState<
    string | null
  >(null);

  const validateUsername = async (
    username: string,
    setFieldTouched: (
      field: string,
      touched: boolean,
      shouldValidate?: boolean
    ) => void
  ) => {
    setUsernameAvailable(null);
    setUsernameValidationMessage(null);

    // Basic client-side validation before hitting the backend
    if (!username) {
      setUsernameAvailable(false);
      setUsernameValidationMessage(
        t(backendMessageMap["Username cannot be empty."])
      );
      return;
    }
    if (username.length < 4) {
      setUsernameAvailable(false);
      setUsernameValidationMessage(
        t(backendMessageMap["Username must be at least 4 characters."])
      );
      return;
    }

    setIsCheckingUsername(true);
    setFieldTouched("username", true); // Mark username field as touched for Yup

    try {
      // const response: any = await instance.get(
      //   `/users/validate-username?username=${username}`
      // );

      const TEMP_HTTP_BASE_URL =
        "https://forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com";

      const response: any = await axios.get(
        `${TEMP_HTTP_BASE_URL}/users/validate-username`, // Hardcode the http:// URL here
        {
          params: { username: username },
        }
      );

      // console.log("this is validate username", response);
      const isAvailable = response.isAvailable;
      setUsernameAvailable(isAvailable);
      setUsernameValidationMessage(
        isAvailable
          ? t(backendMessageMap["Username is available!"])
          : t(backendMessageMap["Username is already taken."])
      );
    } catch (error: any) {
      console.error("Error checking username availability:", error);
      setUsernameAvailable(false);
      const errorMessageKey =
        backendMessageMap[error.response?.message] || "error_checking_username";
      setUsernameValidationMessage(t(errorMessageKey));
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleSubmit = async (
    values: SignupValues,
    { setSubmitting, resetForm }: FormikHelpers<SignupValues>
  ) => {
    console.log("set submitting called", values.username);
    setSubmitting(true);

    try {
      if (usernameAvailable !== true) {
        notification.error({
          message: t("signup_failed_message"),
          description: t(
            backendMessageMap[
              "Please validate your username to ensure it's unique."
            ]
          ),
          placement: "topRight",
        });
        setSubmitting(false);
        return;
      }

      const formData = new FormData();

      console.log(
        "handleSubmit: current profilePictureFile state:",
        profilePictureFile
      );

      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("email", values.email);
      if (values.fullName) formData.append("fullName", values.fullName);
      if (values.gender) formData.append("gender", values.gender);
      if (values.phoneNumber)
        formData.append("phoneNumber", values.phoneNumber);
      if (values.dateOfBirth)
        formData.append("dateOfBirth", values.dateOfBirth);
      if (values.occupation) formData.append("occupation", values.occupation);
      if (profilePictureFile) {
        console.log("handleSubmit: Appended profilePicture to FormData.");

        formData.append("profilePicture", profilePictureFile);
      }

      console.log("handleSubmit: FormData contents BEFORE sending request:");
      for (let [key, value] of formData.entries()) {
        console.log(
          `  ${key}: ${
            value instanceof File
              ? `[File: ${value.name}, ${value.size} bytes, ${value.type}]`
              : value
          }`
        );
      }
      const response: any = await instance.post("/users/signup", formData);

      // console.log("response from signup", response.data);

      notification.success({
        message: t("signup_success_message"),
        description: t("signup_success_description"),
        placement: "topRight",
      });

      resetForm();
      setProfilePictureFile(null);
      setProfilePicturePreview(null);
      setUsernameAvailable(null);
      setUsernameValidationMessage(null);

      router.push("/auth/login");
    } catch (error: any) {
      console.error("error in signup", error?.response || error.message);
      const backendErrorMsg = error?.response?.message || error.message;
      const translatedErrorMessage = t(
        backendMessageMap[backendErrorMsg] || "signup_unexpected_error"
      );
      notification.error({
        message: t("signup_failed_message"),
        description: translatedErrorMessage,
        placement: "topRight",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SignupStyled className={clsx("signup-container")}>
      <div className="input-container">
        <Formik<SignupValues>
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
            validateField,
            setFieldTouched,
            setFieldValue,
            errors,
            touched,
            values,
          }) => {
            return (
              <Form>
                {/* Username */}
                <div className="form-field-container">
                  <Space.Compact>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      placeholder={t("username_placeholder")}
                      as={Input}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        // Reset backend validation status when user types
                        setUsernameAvailable(null);
                        setUsernameValidationMessage(null);
                      }}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        handleBlur(e);
                        validateField("username"); // Validate against Yup's rules first
                      }}
                      // Adjust width to make space for the button
                      style={{ width: "calc(100% - 100px)" }}
                    />
                    <Button
                      type="default"
                      onClick={() =>
                        validateUsername(values.username, setFieldTouched)
                      }
                      loading={isCheckingUsername}
                      // Disable button if username is empty, checking, Yup validation fails, or already validated as available
                      disabled={
                        !values.username ||
                        isCheckingUsername ||
                        (touched.username && errors.username !== undefined) ||
                        usernameAvailable === true
                      }
                      style={{ width: "100px" }} // Fixed width for the button
                    >
                      {t("validate_username_button")}
                    </Button>
                  </Space.Compact>
                  <ErrorMessage
                    name="username"
                    component="div"
                    render={(error) => (
                      <div className="error-message">{error}</div>
                    )}
                  />
                  {/* Display backend validation message */}
                  {usernameValidationMessage && (
                    <div
                      style={{
                        color: usernameAvailable === true ? "green" : "red",
                        marginTop: "5px",
                        fontSize: "0.85em",
                      }}
                    >
                      {usernameValidationMessage}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="form-field-container">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t("password_placeholder")}
                    as={Input.Password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      validateField("password");
                      setFieldTouched("password", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    render={(error) => (
                      <div className="error-message">{error}</div>
                    )}
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="form-field-container">
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder={t("confirm_password_placeholder")} // Need to translate this
                    as={Input.Password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      validateField("confirmPassword");
                      setFieldTouched("confirmPassword", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    render={(error) => (
                      <div className="error-message">{error}</div>
                    )}
                  />
                </div>

                {/* Email */}
                <div className="form-field-container">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("email_placeholder")}
                    as={Input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      validateField("email");
                      setFieldTouched("email", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    render={(error) => (
                      <div className="error-message">{error}</div>
                    )}
                  />
                </div>

                {/* Full Name */}
                <div className="form-field-container">
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder={t("full_name_placeholder")}
                    as={Input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      validateField("fullName");
                      setFieldTouched("fullName", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    render={(error) => (
                      <div className="error-message">{error}</div>
                    )}
                  />
                </div>

                {/* Gender (Ant Design Radio.Group) */}
                <div className="form-field-container">
                  <label htmlFor="gender" className="form-label">
                    {t("gender_label")}
                  </label>
                  <Radio.Group
                    id="gender"
                    name="gender"
                    onChange={(e) => {
                      setFieldValue("gender", e.target.value);
                      setFieldTouched("gender", true, false);
                    }}
                    onBlur={handleBlur}
                    value={values.gender}
                  >
                    <Radio value="male">{t("gender_male_option")}</Radio>
                    <Radio value="female">{t("gender_female_option")}</Radio>
                  </Radio.Group>
                  {touched.gender && errors.gender && (
                    <div className="error-message">{errors.gender}</div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-field-container">
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder={t("phone_number_placeholder")}
                    as={Input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      validateField("phoneNumber");
                      setFieldTouched("phoneNumber", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    render={(error) => (
                      <div className="error-message">{error}</div>
                    )}
                  />
                </div>

                {/* Date of Birth (Ant Design DatePicker) */}
                <div className="form-field-container">
                  <label htmlFor="dateOfBirth" className="form-label">
                    {t("date_of_birth_label")}
                  </label>
                  <DatePicker
                    id="dateOfBirth"
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      setFieldValue("dateOfBirth", dateString);
                      setFieldTouched("dateOfBirth", true, false);
                      validateField("dateOfBirth");
                    }}
                    onBlur={handleBlur}
                    value={
                      values.dateOfBirth ? moment(values.dateOfBirth) : null
                    }
                  />
                  {touched.dateOfBirth && errors.dateOfBirth && (
                    <div className="error-message">{errors.dateOfBirth}</div>
                  )}
                </div>

                {/* Occupation/Industry */}
                <div className="form-field-container">
                  <Field
                    type="text"
                    id="occupation"
                    name="occupation"
                    placeholder={t("occupation_placeholder")}
                    as={Input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      validateField("occupation");
                      setFieldTouched("occupation", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="occupation"
                    component="div"
                    render={(error) => (
                      <div className="error-message">{error}</div>
                    )}
                  />
                </div>

                {/* Profile Picture File Upload */}
                <div className="form-field-container profile-picture-upload">
                  <label htmlFor="profilePicture" className="form-label">
                    {t("profile_picture_label")}
                  </label>
                  <Input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    onBlur={handleBlur}
                  />
                  {profilePicturePreview && (
                    <div className="profile-picture-preview">
                      <img
                        src={profilePicturePreview}
                        alt={t("profile_picture_preview_alt")}
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="submit-button-container">
                  <Button htmlType="submit" disabled={isSubmitting}>
                    {t("signup_button")}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </SignupStyled>
  );
};

export default SignupPage;
