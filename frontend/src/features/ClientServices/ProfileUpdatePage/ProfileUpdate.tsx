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

const UpdateProfilePage = () => {
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
          setUsernameValidationMessage("This is your current username.");
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
        setError("Failed to load profile data.");
        setInitialUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateUserProfile();
    // if (isInitialCompletion) {
    //   router.replace("/account/update", undefined, { shallow: true });
    // }
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
        message: "Temporary Username Detected",
        description: `You are currently logged in with a temporary username: "${initialUserData.username}". Please choose a unique username to personalize your profile!`,
        duration: 0,
        placement: "topRight",
        key: "temporary-username-notification",
      });
      hasNotifiedTempUserRef.current = true;
    }
  }, [isInitialCompletion, initialUserData]);

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
      setUsernameValidationMessage("Username cannot be empty.");
      return;
    }
    if (username.length < 4) {
      setUsernameAvailable(false);
      setUsernameValidationMessage("Username must be at least 4 characters.");
      return;
    }

    if (!isInitialCompletion && username === initialUserData?.username) {
      setUsernameAvailable(true);
      setUsernameValidationMessage("This is your current username.");
      return; // No need to check backend
    }

    setIsCheckingUsername(true);

    try {
      const response: any = await instance.get(
        `/users/validate-username?username=${username}`
      );
      const isAvailable = response.isAvailable; // Using response.isAvailable as per your fix
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

  // Handle form submission
  const onFinish = async (values: any) => {
    const userIdForUpdate = isInitialCompletion
      ? initialUserData?.id || loggedInUserId
      : loggedInUserId;

    if (!userIdForUpdate) {
      notification.error({
        message: "Error",
        description: "User ID not found for update.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const usernameHasChanged = initialUserData?.username !== values.username;
      const requiresValidation = isInitialCompletion || usernameHasChanged;

      if (requiresValidation && usernameAvailable !== true) {
        notification.error({
          message: "Profile Update Failed",
          description: "Please validate your username to ensure it's unique.",
          placement: "topRight",
        });
        setIsSubmitting(false); // Stop submission if validation failed
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
          message: "Profile Updated",
          description: "Your profile has been successfully updated!",
        });

        dispatch(
          setUser({
            id: userIdForUpdate,
            username: values.username,
            token: currentToken || "",
          })
        );

        setUsernameAvailable(true);
        setUsernameValidationMessage("This is your current username.");

        if (isInitialCompletion) {
          router.push("/");
        } else {
          router.push(`/account/profile?userid=${userIdForUpdate}`);
        }
      } else {
        notification.error({
          message: "Update Failed",
          description: response.message || "Something went wrong.",
        });
      }
    } catch (err: any) {
      console.error("Profile update error:", err);
      notification.error({
        message: "Update Failed",
        description:
          err.response?.data?.message || "An error occurred during update.",
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
          <p>Loading profile...</p>
        </div>
      </EditProfileStyled>
    );
  }

  if (error) {
    return (
      <EditProfileStyled>
        <div>
          <p>Error: {error}</p>
          {!isInitialCompletion && loggedInUserId && (
            <Button
              name="back-to-profile-button"
              onClick={() =>
                router.push(`/account/profile?userid=${loggedInUserId}`)
              }
            >
              Back to Profile
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
          <p>No profile data available.</p>
        </div>
      </EditProfileStyled>
    );
  }

  return (
    <>
      <EditProfileStyled>
        <div>
          <h1>
            {isInitialCompletion ? "Complete Your Profile" : "Edit Profile"}
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
              <label htmlFor="profile-picture-input">Profile Picture</label>
              <div className="profile-picture-upload-section">
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Profile Preview"
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
                  {imagePreviewUrl ? "Change Image" : "Upload Image"}
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
                    Remove Image
                  </Button>
                )}
              </div>
            </div>

            {/* Username Field - Editable for Initial Completion, Disabled for Edit */}
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              {isInitialCompletion ? (
                // Editable username with validation for initial completion
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder="Username (required, min 4 chars)"
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
                            "Please fix local username errors."
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
                            "Please fix local username errors."
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
                    Validate
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label="Full Name" name="fullName">
              <Input />
            </Form.Item>

            <Form.Item label="Gender" name="gender">
              <>
                <Select placeholder="Select your gender">
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                </Select>
              </>
            </Form.Item>

            <Form.Item label="Phone Number" name="phoneNumber">
              <Input />
            </Form.Item>

            <Form.Item label="Date of Birth" name="dateOfBirth">
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item label="Occupation" name="occupation">
              <Input />
            </Form.Item>

            <Form.Item label="Preferred Language" name="preferredLanguage">
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
                  {isInitialCompletion ? "Complete Profile" : "Update Profile"}
                </Button>
                {!isInitialCompletion && (
                  <Button
                    name="cancel-button"
                    onClick={() =>
                      router.push(`/account/profile?userid=${loggedInUserId}`)
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
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
