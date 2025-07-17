// frontend/src/features/ClientServices/ProfileUpdatePage/ProfileUpdate.tsx

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
import { getCookie } from "cookies-next"; // Although you're using useSelector for token, keeping for consistency if other cookies are used
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
  profilePicture: string | null; // Path of existing picture (from backend)
  profilePictureFile?: File | null; // For new file upload (optional, not strictly used in state)
}

// Added prop interface for the component to receive the refresh function
interface UpdateProfilePageProps {
  onProfilePictureChange?: () => void; // Optional function to trigger profile picture refresh in header
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

// Modified component definition to accept props
const UpdateProfilePage: React.FC<UpdateProfilePageProps> = ({
  onProfilePictureChange,
}) => {
  const { t } = useTranslation("ClientServices.profileupdate");
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector(
    (state: RootState) => state.authentication.id
  );

  const loggedInUsername = useSelector(
    (state: RootState) => state.authentication.username
  );

  const currentToken = useSelector(
    (state: RootState) => state.authentication.token
  );

  console.log("current token from redux store", currentToken);

  // Form instance for Ant Design Form
  const [form] = Form.useForm();

  const [initialUserData, setInitialUserData] =
    useState<UserProfileFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // State to hold the selected profile picture file, to be sent to backend
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // State to hold the preview URL for the image shown on *this* page
  // It will either be the initial image, a new local base64 preview, or the updated image from backend
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

  // Effect for initial authentication checks and redirection
  useEffect(() => {
    if (!currentToken && !isInitialCompletion) {
      console.log(
        "ProfileUpdatePage (Auth Effect): No token, not initial completion. Redirecting to login."
      );
      router.replace("/auth/login");
      return;
    }

    if (!loggedInUserId && !isInitialCompletion) {
      console.log(
        "ProfileUpdatePage (Auth Effect): No loggedInUserId, not initial completion. Redirecting to login."
      );
      router.replace("/auth/login");
      return;
    }

    if (isInitialCompletion && !initialUserIdFromQuery) {
      console.log(
        "ProfileUpdatePage (Auth Effect): Initial completion but missing userId. Redirecting to login."
      );
      router.replace("/auth/login?reason=invalid_initial_completion");
      return;
    }
  }, [
    currentToken,
    loggedInUserId,
    isInitialCompletion,
    initialUserIdFromQuery,
    router,
  ]);

  // Effect for fetching or preparing user profile data on component mount
  useEffect(() => {
    if (!router.isReady) return;

    const userIdToUse: any = isInitialCompletion
      ? initialUserIdFromQuery
      : loggedInUserId;

    if (!userIdToUse || (!currentToken && !isInitialCompletion)) {
      console.log(
        "ProfileUpdatePage (Fetch Effect): Pre-empting fetch due to unauthenticated/invalid state."
      );
      setLoading(false);
      return;
    }

    const fetchOrCreateUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedUser: UserProfileFormData;

        if (isInitialCompletion) {
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
            profilePicture: null,
            profilePictureFile: null, // No file initially
          };
          // Dispatch user info to Redux if it's initial completion
          dispatch(
            setUser({
              id: parseInt(userIdToUse),
              username: fetchedUser.username,
              token: currentToken || "",
            })
          );
        } else {
          // Fetch existing user data
          const response: any = await instance.get<{
            user: UserProfileFormData;
          }>(`/users/${userIdToUse}`);
          fetchedUser = response.user;
          // If username changed, update Redux
          if (loggedInUsername !== fetchedUser.username) {
            dispatch(
              setUser({
                id: fetchedUser.id,
                username: fetchedUser.username,
                token: currentToken || "",
              })
            );
          }
        }

        // Prepare data for form initial values and internal state
        const formData: UserProfileFormData = {
          id: fetchedUser.id,
          username: fetchedUser.username || "",
          email: fetchedUser.email || "",
          fullName: fetchedUser.fullName || null,
          gender: fetchedUser.gender || null,
          phoneNumber: fetchedUser.phoneNumber || null,
          dateOfBirth: fetchedUser.dateOfBirth || null,
          occupation: fetchedUser.occupation || null,
          profilePicture: fetchedUser.profilePicture || null,
          profilePictureFile: null, // Ensure file is null
        };

        setInitialUserData(formData);
        setFormInitialValues({
          ...formData,
          dateOfBirth: formData.dateOfBirth
            ? moment(formData.dateOfBirth)
            : null,
        });

        // Set username validation message if it's an existing user
        if (!isInitialCompletion) {
          setUsernameAvailable(true);
          setUsernameValidationMessage(
            t(backendMessageMap["This is your current username."])
          );
        } else {
          setUsernameAvailable(null);
          setUsernameValidationMessage(null);
        }

        // --- Initial image setup for the page's preview ---
        // Display existing profile picture on load
        if (fetchedUser.profilePicture) {
          const fullInitialUrl = `${BACKEND_BASE_URL}${fetchedUser.profilePicture}`;
          setImagePreviewUrl(fullInitialUrl);
          console.log(
            "ProfileUpdatePage (initial load): Setting imagePreviewUrl to",
            fullInitialUrl
          );
        } else {
          setImagePreviewUrl(null);
          console.log(
            "ProfileUpdatePage (initial load): No initial profile picture."
          );
        }
        // --- End initial image setup ---
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
    currentToken,
  ]);

  // Effect for displaying temporary username notification (if applicable)
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

  // Handle file selection - provides immediate local preview on THIS page
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file); // Store the file to be sent to the backend

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set imagePreviewUrl to the base64 string for *local preview on this page only*
        setImagePreviewUrl(reader.result as string);
        console.log(
          "handleFileChange: Setting *local page preview* imagePreviewUrl to (base64):",
          reader.result
        );
      };
      reader.readAsDataURL(file);
    } else {
      // If file selection is cleared (e.g., user opens dialog, then cancels without choosing)
      // Revert imagePreviewUrl to the *currently saved* one or null
      const fallbackUrl = initialUserData?.profilePicture
        ? `${BACKEND_BASE_URL}${initialUserData.profilePicture}`
        : null;
      setImagePreviewUrl(fallbackUrl);
      console.log(
        "handleFileChange: File selection cleared. Reverting local page imagePreviewUrl to fallback:",
        fallbackUrl
      );
    }
  };

  // Handler for explicitly removing the image (pre-save, signals backend to clear)
  const handleRemoveImageClick = () => {
    setSelectedFile(null); // Signal no new file to upload
    setImagePreviewUrl(null); // Clear local page preview immediately to show default
    console.log("handleRemoveImageClick: Cleared imagePreviewUrl to null.");
    const fileInput = document.getElementById(
      "profile-picture-input"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = ""; // Clear file input element to allow re-upload of same file
  };

  // Function to validate username against backend
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
            // Exclude profilePictureFile as it's handled separately
            if (key === "username") {
              formData.append("username", values.username);
            } else {
              formData.append(key, values[key]);
            }
          }
        }
      }

      // Append the new profile picture file if selected
      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      } else if (imagePreviewUrl === null && initialUserData?.profilePicture) {
        // This condition correctly tells the backend to clear the image
        // It triggers if imagePreviewUrl is null (meaning user clicked 'Remove')
        // AND there was an initial profile picture (meaning it needs clearing from DB)
        formData.append("clearProfilePicture", "true");
      }

      const response: any = await instance.put(
        `/users/update/${userIdForUpdate}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentToken}`, // Ensure token is sent
          },
          withCredentials: true,
        }
      );

      if (response.result) {
        notification.success({
          message: t("profile_updated_message"),
          description: t(
            backendMessageMap["Your profile has been successfully updated!"]
          ),
        });

        // Update Redux user state with the latest data from the backend
        dispatch(
          setUser({ ...response.user, token: currentToken || "" }) // Preserve token
        );

        // Update the local initialUserData with the *saved* data from the response
        setInitialUserData((prev) => ({
          ...prev!, // Assumes prev is not null at this point
          ...response.user,
          profilePicture: response.user.profilePicture || null, // Ensure it's null if cleared
        }));

        // --- Crucial: Update local page's image preview using the *backend's confirmed URL*
        // This ensures that after save, the page displays the persistent image URL
        const newProfilePictureUrl = response.user.profilePicture
          ? `${BACKEND_BASE_URL}${response.user.profilePicture}`
          : null;
        setImagePreviewUrl(newProfilePictureUrl);
        console.log(
          "onFinish: Profile updated. Setting page imagePreviewUrl to (from backend):",
          newProfilePictureUrl
        );

        // Reset selectedFile as it's now handled by the backend and initialUserData
        setSelectedFile(null);

        // --- THIS IS THE KEY FOR HEADER REFRESH ---
        // Call the prop to notify the parent (Margins) to refresh the header
        if (onProfilePictureChange) {
          onProfilePictureChange();
          console.log(
            "onFinish: Triggered onProfilePictureChange for header refresh."
          );
        }
        // --- End Header Refresh Key ---

        setUsernameAvailable(true); // After successful update, current username is valid
        setUsernameValidationMessage(
          t(backendMessageMap["This is your current username."])
        );

        // Redirect after successful update
        if (isInitialCompletion) {
          router.replace("/"); // Redirect to home page
        } else {
          router.replace(`/account/profile?userid=${userIdForUpdate}`); // Redirect to profile view page
        }
      } else {
        // Handle backend error response
        notification.error({
          message: t("update_failed_message"),
          description: t(
            backendMessageMap[response.message] ||
              "something_went_wrong_generic"
          ),
        });
      }
    } catch (err: any) {
      // Handle network or unexpected errors
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

  // Handle errors or loading states for the component itself
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
                {/* This section displays the image. It will show:
                    1. The initial saved image (on page load)
                    2. A locally selected file (base64) before save
                    3. The newly saved image (from backend response) after successful save
                    4. The default avatar if no image is present/selected/saved
                */}
                {imagePreviewUrl ? ( // If there's a URL (saved or local preview)
                  <img
                    src={imagePreviewUrl}
                    alt={t("profile_preview_alt_text")}
                    className="profile-preview-image"
                  />
                ) : (
                  // If no URL, show the default avatar
                  <img
                    src="/images/default-avatar.png" // Path to your default avatar image
                    alt={t("default_profile_alt_text")}
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
                    onClick={handleRemoveImageClick} // Use the dedicated handler
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

            {/* Form actions with Ant Design Space for button gap */}
            <Form.Item className="form-actions">
              <Space>
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
                  >
                    {t("cancel_button")}
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Form>
        </div>
      </EditProfileStyled>
    </>
  );
};

export default UpdateProfilePage;
