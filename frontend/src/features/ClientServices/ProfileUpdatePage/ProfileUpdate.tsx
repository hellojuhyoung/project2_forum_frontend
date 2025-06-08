import { EditProfileStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { instance } from "@/utils/apis/axios";
import {
  notification,
  Input,
  Button,
  Form,
  Select,
  DatePicker,
  Space,
} from "antd"; // Import Ant Design components
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import moment, { Moment } from "moment"; // For DatePicker value handling
import { setUser } from "@/redux/redux";
import { getCookie } from "cookies-next";
import { useTranslation } from "react-i18next";

// Define the shape of your user data for the form
interface UserProfileFormData {
  id: number | null;
  username: string;
  email: string;
  fullName: string | null;
  gender: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  occupation: string | null;
  preferredLanguage: string | null;
  profilePicture: string | null; // Path of existing picture
  profilePictureFile: File | null; // For new file upload
}

const backendMessageMap: { [key: string]: string } = {
  // Username Validation Messages
  "Username cannot be empty.": "username_cannot_be_empty",
  "Username must be at least 4 characters.":
    "username_min_length_backend_error",
  "This is your current username.": "username_is_current",
  "Username is available!": "username_is_available",
  "Username is already taken.": "username_is_already_taken",
  "Error checking username. Please try again.": "error_checking_username",
  "Please fix local username errors.": "fix_local_username_errors",

  // Profile Update Notifications/Errors
  "User ID not found for update.": "user_id_not_found_for_update",
  "Please validate your username to ensure it's unique.":
    "username_validation_required_update_error",
  "Your profile has been successfully updated!":
    "profile_updated_success_description",
  "Something went wrong.": "something_went_wrong_generic",
  "An error occurred during update.": "update_unexpected_error",
  // Add other specific backend messages you might encounter here
};

const UpdateProfilePage = () => {
  const { t } = useTranslation("ClientServices.profileupdate");
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector(
    (state: RootState) => state.authentication.id
  );

  const loggedInUsername = useSelector(
    (state: RootState) => state.authentication.username
  );

  // Form instance for Ant Design Form
  const [form] = Form.useForm();

  const [initialUserData, setInitialUserData] =
    useState<UserProfileFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // State to hold the selected profile picture file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // State to hold the preview URL for the selected image
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  ); // true: available, false: taken, null: not checked yet
  const [usernameValidationMessage, setUsernameValidationMessage] = useState<
    string | null
  >(null);

  const hasNotifiedTempUserRef = useRef(false);

  // Get your backend's base URL
  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const isInitialCompletion = router.query.isNewUser === "true";
  const initialEmailFromQuery = router.query.email as string | undefined;
  const initialUserIdFromQuery = router.query.userId as string | undefined;
  const initialUsernameFromQuery = router.query.username as string | undefined;

  const [formInitialValues, setFormInitialValues] = useState<any>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const userIdToUse: any = isInitialCompletion
      ? initialUserIdFromQuery
      : loggedInUserId;

    if (!userIdToUse) {
      setLoading(false);
      if (!isInitialCompletion) {
        router.push("/account/update");
      }
      return;
    }

    const fetchOrCreateUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedUser: UserProfileFormData;

        if (isInitialCompletion) {
          const currentToken = getCookie("token") as string | undefined;

          fetchedUser = {
            id: parseInt(userIdToUse),
            username:
              initialUsernameFromQuery ||
              (initialEmailFromQuery
                ? initialEmailFromQuery.split("@")[0]
                : ""),
            email: initialEmailFromQuery || "",
            fullName: null,
            gender: null,
            phoneNumber: null,
            dateOfBirth: null,
            occupation: null,
            preferredLanguage: null,
            profilePicture: null,
            profilePictureFile: null,
          };
          dispatch(
            setUser({
              id: parseInt(userIdToUse),
              username: fetchedUser.username,
              token: currentToken || "",
            })
          );
        } else {
          const response: any = await instance.get<{
            user: UserProfileFormData;
          }>(`/users/${userIdToUse}`);
          fetchedUser = response.user;
          if (loggedInUsername !== fetchedUser.username) {
            const currentToken = getCookie("token") as string | undefined;
            dispatch(
              setUser({
                id: fetchedUser.id,
                username: fetchedUser.username,
                token: currentToken || "",
              })
            );
          }
        }

        const formData: UserProfileFormData = {
          id: fetchedUser.id,
          username: fetchedUser.username || "",
          email: fetchedUser.email || "",
          fullName: fetchedUser.fullName || null,
          gender: fetchedUser.gender || null,
          phoneNumber: fetchedUser.phoneNumber || null,
          dateOfBirth: fetchedUser.dateOfBirth || null,
          occupation: fetchedUser.occupation || null,
          preferredLanguage: fetchedUser.preferredLanguage || null,
          profilePicture: fetchedUser.profilePicture || null,
          profilePictureFile: null,
        };

        setInitialUserData(formData);
        setFormInitialValues({
          ...formData,
          dateOfBirth: formData.dateOfBirth
            ? moment(formData.dateOfBirth)
            : null,
        });

        if (!isInitialCompletion) {
          setUsernameAvailable(true);
          setUsernameValidationMessage(
            t(backendMessageMap["This is your current username."])
          );
        } else {
          setUsernameAvailable(null);
          setUsernameValidationMessage(null);
        }

        if (fetchedUser.profilePicture) {
          setImagePreviewUrl(
            `${BACKEND_BASE_URL}${fetchedUser.profilePicture}`
          );
        }
      } catch (err: any) {
        console.error("Failed to load/prepare user profile:", err);
        setError(t("failed_to_load_profile_error_update"));
        setInitialUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateUserProfile();
  }, [
    router.isReady,
    isInitialCompletion,
    initialUserIdFromQuery,
    initialEmailFromQuery,
    initialUsernameFromQuery,
    loggedInUserId,
    loggedInUsername,
    router,
    form,
    BACKEND_BASE_URL,
    dispatch,
  ]);

  useEffect(() => {
    if (
      isInitialCompletion &&
      initialUserData &&
      !hasNotifiedTempUserRef.current
    ) {
      notification.info({
        message: t("temp_username_detected_message"),
        description: t("temp_username_detected_description", {
          username: initialUserData.username,
        }),
        duration: 0,
        placement: "topRight",
        key: "temporary-username-notification",
      });
      hasNotifiedTempUserRef.current = true;
    }
  }, [isInitialCompletion, initialUserData, t]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(
        initialUserData?.profilePicture
          ? `${BACKEND_BASE_URL}${initialUserData.profilePicture}`
          : null
      );
    }
  };
  // validate username
  const validateUsername = async (username: string) => {
    // Clear previous validation status when user types or initiates check
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

    if (!isInitialCompletion && username === initialUserData?.username) {
      setUsernameAvailable(true);
      setUsernameValidationMessage(
        t(backendMessageMap["This is your current username."])
      );
      return; // No need to check backend
    }

    setIsCheckingUsername(true);

    try {
      const response: any = await instance.get(
        `/users/validate-username?username=${username}`
      );
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

  // Handle form submission
  const onFinish = async (values: any) => {
    const userIdForUpdate = isInitialCompletion
      ? initialUserData?.id || loggedInUserId
      : loggedInUserId;

    if (!userIdForUpdate) {
      notification.error({
        message: t("error_message_general"),
        description: t(backendMessageMap["User ID not found for update."]),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const usernameHasChanged = initialUserData?.username !== values.username;
      const requiresValidation = isInitialCompletion || usernameHasChanged;

      if (requiresValidation && usernameAvailable !== true) {
        notification.error({
          message: t("profile_update_failed_message"),
          description: t(
            backendMessageMap[
              "Please validate your username to ensure it's unique."
            ]
          ),
          placement: "topRight",
        });
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();

      // Append all form values
      for (const key in values) {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === "dateOfBirth" && values[key] instanceof moment) {
            formData.append(key, (values[key] as Moment).format("YYYY-MM-DD"));
          } else if (key !== "profilePictureFile") {
            if (key === "username") {
              formData.append("username", values.username);
            } else {
              formData.append(key, values[key]);
            }
          }
        }
      }

      // Append the new profile picture file if selected (remains the same)
      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      } else if (imagePreviewUrl === null && initialUserData?.profilePicture) {
        formData.append("clearProfilePicture", "true");
      }

      const response: any = await instance.put(
        `/users/update/${userIdForUpdate}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.result) {
        const currentToken = getCookie("token") as string | undefined;

        notification.success({
          message: t("profile_updated_message"),
          description: t(
            backendMessageMap["Your profile has been successfully updated!"]
          ),
        });

        dispatch(
          setUser({
            id: userIdForUpdate,
            username: values.username,
            token: currentToken || "",
          })
        );

        setUsernameAvailable(true);
        setUsernameValidationMessage(
          t(backendMessageMap["This is your current username."])
        );

        if (isInitialCompletion) {
          router.push("/");
        } else {
          router.push(`/account/profile?userid=${userIdForUpdate}`);
        }
      } else {
        notification.error({
          message: t("update_failed_message"),
          description: t(
            backendMessageMap[response.message] ||
              "something_went_wrong_generic"
          ),
        });
      }
    } catch (err: any) {
      console.error("Profile update error:", err);
      const errorMessageKey =
        backendMessageMap[err.response?.message] || "update_unexpected_error";
      notification.error({
        message: t("update_failed_message"),
        description: t(errorMessageKey),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle errors or loading states
  if (loading) {
    return (
      <EditProfileStyled>
        <div>
          <p>{t("loading_profile_message")}</p>
        </div>
      </EditProfileStyled>
    );
  }

  if (error) {
    return (
      <EditProfileStyled>
        <div>
          {t("error_prefix")}: {error}
          {!isInitialCompletion && loggedInUserId && (
            <Button
              name="back-to-profile-button"
              onClick={() =>
                router.push(`/account/profile?userid=${loggedInUserId}`)
              }
            >
              {t("back_to_profile_button")}
            </Button>
          )}
        </div>
      </EditProfileStyled>
    );
  }

  if (!initialUserData) {
    return (
      <EditProfileStyled>
        <div>
          <p>{t("no_profile_data_available_message")}</p>
        </div>
      </EditProfileStyled>
    );
  }

  return (
    <>
      <EditProfileStyled>
        <div>
          <h1>
            {isInitialCompletion
              ? t("complete_profile_title")
              : t("edit_profile_title")}{" "}
          </h1>
          <Form
            form={form}
            name="profile_form"
            onFinish={onFinish}
            layout="vertical"
            initialValues={formInitialValues}
            onValuesChange={(changedValues, allValues) => {
              if (
                changedValues.username !== undefined &&
                changedValues.username !== null
              ) {
                // Reset validation if username is being typed
                if (usernameAvailable !== null) {
                  // Only reset if it was already validated
                  setUsernameAvailable(null);
                  setUsernameValidationMessage(null);
                }
              }
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <label htmlFor="profile-picture-input">
                {t("profile_picture_label")}
              </label>
              <div className="profile-picture-upload-section">
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt={t("profile_preview_alt_text")}
                    className="profile-preview-image"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="profile-picture-input"
                  style={{ display: "none" }}
                />
                <label htmlFor="profile-picture-input" className="ant-btn">
                  {imagePreviewUrl
                    ? t("change_image_button")
                    : t("upload_image_button")}{" "}
                </label>
                {imagePreviewUrl && (
                  <Button
                    name="remove-image-button"
                    type="link"
                    danger
                    onClick={() => {
                      setSelectedFile(null);
                      setImagePreviewUrl(null);
                      const fileInput = document.getElementById(
                        "profile-picture-input"
                      ) as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    {t("remove_image_button")}
                  </Button>
                )}
              </div>
            </div>

            {/* Username Field - Editable for Initial Completion, Disabled for Edit */}
            <Form.Item
              label={t("username_label")}
              name="username"
              rules={[
                { required: true, message: t("username_required_validation") },
              ]}
            >
              {isInitialCompletion ? (
                // Editable username with validation for initial completion
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder={t("username_placeholder")}
                    // Ant Design Form.Item handles value/onChange automatically
                    onBlur={(e) => {
                      // Trigger Ant Design form validation for username
                      form
                        .validateFields(["username"])
                        .then(() => {
                          // If Ant Design's local rules pass, then check backend
                          validateUsername(e.target.value);
                        })
                        .catch(() => {
                          // If Ant Design local rules fail, reset backend validation messages
                          setUsernameAvailable(false);
                          setUsernameValidationMessage(
                            t(
                              backendMessageMap[
                                "Please fix local username errors."
                              ]
                            )
                          );
                        });
                    }}
                  />
                  <Button
                    type="default"
                    onClick={() => {
                      form
                        .validateFields(["username"])
                        .then(() => {
                          validateUsername(form.getFieldValue("username"));
                        })
                        .catch(() => {
                          setUsernameAvailable(false);
                          setUsernameValidationMessage(
                            t(
                              backendMessageMap[
                                "Please fix local username errors."
                              ]
                            )
                          );
                        });
                    }}
                    loading={isCheckingUsername}
                    disabled={
                      !form.getFieldValue("username") ||
                      isCheckingUsername ||
                      form.getFieldError("username").length > 0 || // Check Ant Design's errors
                      usernameAvailable === true // Disable if already validated as available
                    }
                    style={{ width: "100px" }} // Fixed width for the button
                  >
                    {t("validate_username_button")}
                  </Button>
                </Space.Compact>
              ) : (
                // Disabled username for regular edit mode
                <Input disabled={true} />
              )}
            </Form.Item>
            {/* Display username validation message only if initial completion or if username was changed and needs re-validation */}
            {(isInitialCompletion ||
              initialUserData?.username !== form.getFieldValue("username")) &&
              usernameValidationMessage && (
                <div
                  className={`username-validation-message ${
                    usernameAvailable === true ? "available" : "taken"
                  }`}
                >
                  {usernameValidationMessage}
                </div>
              )}

            <Form.Item
              label={t("email_label")}
              name="email"
              rules={[
                { required: true, message: t("email_required_validation") },
                { type: "email", message: t("email_invalid_validation") },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label={t("full_name_label")} name="fullName">
              <Input />
            </Form.Item>

            <Form.Item label={t("gender_label")} name="gender">
              <>
                <Select placeholder={t("select_gender_placeholder")}>
                  <Select.Option value="Male">
                    {t("gender_male_option")}
                  </Select.Option>
                  <Select.Option value="Female">
                    {t("gender_female_option")}
                  </Select.Option>
                </Select>
              </>
            </Form.Item>

            <Form.Item label={t("phone_number_label")} name="phoneNumber">
              <Input />
            </Form.Item>

            <Form.Item label={t("date_of_birth_label")} name="dateOfBirth">
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item label={t("occupation_label")} name="occupation">
              <Input />
            </Form.Item>

            <Form.Item
              label={t("preferred_language_label")}
              name="preferredLanguage"
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <>
                <Button
                  name="update-profile-button"
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                >
                  {isInitialCompletion
                    ? t("complete_profile_button")
                    : t("update_profile_button")}{" "}
                </Button>
                {!isInitialCompletion && (
                  <Button
                    name="cancel-button"
                    onClick={() =>
                      router.push(`/account/profile?userid=${loggedInUserId}`)
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    {t("cancel_button")}
                  </Button>
                )}
              </>
            </Form.Item>
          </Form>
        </div>
      </EditProfileStyled>
    </>
  );
};

export default UpdateProfilePage;
