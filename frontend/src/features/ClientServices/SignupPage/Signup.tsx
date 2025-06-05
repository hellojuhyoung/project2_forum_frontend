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

const { Option } = Select; // Destructure Option for Select component

// --- Interfaces ---
interface SignupValues {
  username: string;
  password: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  occupation: string;
  preferredLanguage: string;
}

const initialValues: SignupValues = {
  username: "",
  password: "",
  email: "",
  fullName: "",
  gender: "",
  phoneNumber: "",
  dateOfBirth: "",
  occupation: "",
  preferredLanguage: "english",
};

// --- Validation Schema (Yup) ---
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .required("Password is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  fullName: Yup.string()
    .max(50, "Full Name must be at most 50 characters")
    .notRequired(),
  gender: Yup.string().notRequired(),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9\s-()]{7,20}$/, "Invalid phone number format")
    .min(7, "Phone number too short")
    .max(20, "Phone number too long")
    .notRequired(),
  dateOfBirth: Yup.string().notRequired(),
  occupation: Yup.string()
    .max(100, "Occupation must be at most 100 characters")
    .notRequired(),
  preferredLanguage: Yup.string().notRequired(),
});

const SignupPage: React.FC = () => {
  const router = useRouter();
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

      console.log("handleFileChange: File selected:", file);
      console.log("handleFileChange: File name:", file.name);
      console.log("handleFileChange: File type:", file.type);
      console.log("handleFileChange: File size:", file.size);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePictureFile(null);
      setProfilePicturePreview(null);

      console.log("handleFileChange: No file selected.");
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
      setUsernameValidationMessage("Username cannot be empty.");
      return;
    }
    if (username.length < 4) {
      setUsernameAvailable(false);
      setUsernameValidationMessage("Username must be at least 4 characters.");
      return;
    }

    setIsCheckingUsername(true);
    setFieldTouched("username", true); // Mark username field as touched for Yup

    try {
      // Calling the backend endpoint you've set up
      const response: any = await instance.get(
        `/users/validate-username?username=${username}`
      );
      // console.log("this is validate username", response);
      const isAvailable = response.isAvailable;
      setUsernameAvailable(isAvailable);
      setUsernameValidationMessage(
        isAvailable ? "Username is available!" : "Username is already taken."
      );
    } catch (error: any) {
      console.error("Error checking username availability:", error);
      setUsernameAvailable(false);
      const errorMessage =
        error.response?.data?.message ||
        "Error checking username. Please try again.";
      setUsernameValidationMessage(errorMessage);
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
          message: "Signup Failed",
          description: "Please validate your username to ensure it's unique.",
          placement: "topRight",
        });
        setSubmitting(false); // Stop submission if validation failed
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
      if (values.preferredLanguage)
        formData.append("preferredLanguage", values.preferredLanguage);

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
        message: "Signup Successful",
        description: "Your account has been created. Please log in.",
        placement: "topRight",
      });

      resetForm();
      setProfilePictureFile(null);
      setProfilePicturePreview(null);
      setUsernameAvailable(null);
      setUsernameValidationMessage(null);

      router.push("/auth/login");
    } catch (error: any) {
      console.error("error in signup", error?.response?.data || error.message);
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred during signup.";
      notification.error({
        message: "Signup Failed",
        description: errorMessage,
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
                      placeholder="Username (required, min 4 chars)"
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
                        // Optional: Trigger backend check on blur if Yup passes and username is not empty
                        // if (!errors.username && e.target.value) {
                        //   checkUsernameAvailability(e.target.value, setFieldTouched);
                        // }
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
                      Validate
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
                    placeholder="Password (required, 8-16 chars)"
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

                {/* Email */}
                <div className="form-field-container">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email (required)"
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
                    placeholder="Full Name (optional, max 50 chars)"
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
                    Gender (optional)
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
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
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
                    placeholder="Phone Number (optional, e.g., +1234567890)"
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
                    Date of Birth (optional)
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
                    placeholder="Occupation/Industry (optional, max 100 chars)"
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

                {/* Preferred Language (Ant Design Select) */}
                <div className="form-field-container">
                  <label htmlFor="preferredLanguage" className="form-label">
                    Preferred Language (optional)
                  </label>
                  <Select
                    id="preferredLanguage"
                    defaultValue={initialValues.preferredLanguage}
                    style={{ width: "100%" }}
                    onChange={(value: string) => {
                      setFieldValue("preferredLanguage", value);
                      setFieldTouched("preferredLanguage", true, false);
                    }}
                    onBlur={handleBlur}
                    value={values.preferredLanguage}
                  >
                    <Option value="english">English</Option>
                    <Option value="spanish">Spanish</Option>
                    <Option value="french">French</Option>
                    <Option value="korean">Korean</Option>
                    <Option value="other">Other</Option>
                  </Select>
                  {touched.preferredLanguage && errors.preferredLanguage && (
                    <div className="error-message">
                      {errors.preferredLanguage}
                    </div>
                  )}
                </div>

                {/* Profile Picture File Upload */}
                <div className="form-field-container profile-picture-upload">
                  <label htmlFor="profilePicture" className="form-label">
                    Profile Picture (optional)
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
                        alt="Profile Preview"
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
                    Sign Up
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
