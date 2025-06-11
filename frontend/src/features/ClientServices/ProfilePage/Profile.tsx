// frontend/pages/account/profile.tsx

import { ProfileStyled } from "./styled"; // Your styled component
import clsx from "clsx"; // If you're still using clsx for other classes not defined in ProfileStyled
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { instance } from "@/utils/apis/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  gender?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  profilePicture?: string;
}

const ProfilePage = () => {
  const { t } = useTranslation("ClientServices.profile");
  const router = useRouter();
  const { userid: queryUserId } = router.query;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const userId = Array.isArray(queryUserId) ? queryUserId[0] : queryUserId;

    if (userId) {
      const fetchUserProfile = async () => {
        try {
          setLoading(true);
          setError(null);

          const response: any = await instance.get<{ user: UserProfile }>(
            `/users/${userId}`
          ); // Assuming your backend returns { user: {...} }

          setUser(response.user); // Access the 'user' property if your backend wraps it
        } catch (err: any) {
          console.error("Failed to fetch user profile:", err);
          setError(t("failed_to_load_profile_error"));
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
      setError(t("user_id_not_provided_error"));
    }
  }, [queryUserId, t]);

  if (loading) {
    return (
      <ProfileStyled>
        {/* Use ProfileStyled directly */}
        <p>{t("loading_profile_message")}</p>
      </ProfileStyled>
    );
  }

  if (error) {
    return (
      <ProfileStyled>
        {t("error_prefix")}: {error}
      </ProfileStyled>
    );
  }

  if (!user) {
    return (
      <ProfileStyled>
        <p>{t("no_user_data_found_message")}</p>
      </ProfileStyled>
    );
  }

  const profileImageUrl = user.profilePicture
    ? `${BACKEND_BASE_URL}${user.profilePicture}`
    : "/no-image.jpg"; // Correct path to default image

  return (
    <ProfileStyled>
      {" "}
      {/* Use ProfileStyled as the main container */}
      {t("users_profile_title", { username: user.username })}
      <div className="profile-picture-container">
        {" "}
        {/* Apply the styled class */}
        <img
          src={profileImageUrl}
          alt={t("users_profile_alt_text", { username: user.username })}
          // Styles are now mostly handled by the CSS in styled.ts
        />
      </div>
      <div className="profile-details">
        {" "}
        {/* Apply the styled class */}
        <div className="detail-item">
          <strong>{t("label_id")}:</strong> <span>{user.id}</span>{" "}
        </div>
        <div className="detail-item">
          <strong>{t("label_full_name")}:</strong>
          <span>{user.fullName || t("not_provided_text")}</span>
        </div>
        <div className="detail-item">
          <strong>{t("label_email")}:</strong> <span>{user.email}</span>{" "}
        </div>
        <div className="detail-item">
          <strong>{t("label_gender")}:</strong>
          <span>{user.gender || t("not_provided_text")}</span>
        </div>
        <div className="detail-item">
          <strong>{t("label_phone_number")}:</strong>
          <span>{user.phoneNumber || t("not_provided_text")}</span>
        </div>
        <div className="detail-item">
          <strong>{t("label_date_of_birth")}:</strong>
          <span>{user.dateOfBirth || t("not_provided_text")}</span>
        </div>
      </div>
      {/* Example for an "Edit Profile" button */}
      {/* <button className="edit-button">Edit Profile</button> */}
      <button
        className="edit-button"
        onClick={() => router.push(`/account/update`)}
      >
        {t("edit_profile_button")}
      </button>
    </ProfileStyled>
  );
};

export default ProfilePage;
