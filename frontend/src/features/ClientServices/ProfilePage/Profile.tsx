// frontend/pages/account/profile.tsx

import { ProfileStyled } from "./styled"; // Your styled component
import clsx from "clsx"; // If you're still using clsx for other classes not defined in ProfileStyled
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { instance } from "@/utils/apis/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  gender?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  occupation?: string;
  preferredLanguage?: string;
  profilePicture?: string;
}

const ProfilePage = () => {
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
          setError(
            "Failed to load profile data. User might not exist or network error."
          );
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
      setError("User ID not provided in URL.");
    }
  }, [queryUserId]);

  if (loading) {
    return (
      <ProfileStyled>
        {" "}
        {/* Use ProfileStyled directly */}
        <p>Loading profile...</p>
      </ProfileStyled>
    );
  }

  if (error) {
    return (
      <ProfileStyled>
        <p>Error: {error}</p>
      </ProfileStyled>
    );
  }

  if (!user) {
    return (
      <ProfileStyled>
        <p>No user data found.</p>
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
      <h1>{user.username}'s Profile</h1>
      <div className="profile-picture-container">
        {" "}
        {/* Apply the styled class */}
        <img
          src={profileImageUrl}
          alt={`${user.username}'s profile`}
          // Styles are now mostly handled by the CSS in styled.ts
        />
      </div>
      <div className="profile-details">
        {" "}
        {/* Apply the styled class */}
        <div className="detail-item">
          <strong>ID:</strong> <span>{user.id}</span>
        </div>
        <div className="detail-item">
          <strong>Full Name:</strong>{" "}
          <span>{user.fullName || "Not provided"}</span>
        </div>
        <div className="detail-item">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="detail-item">
          <strong>Gender:</strong> <span>{user.gender || "Not provided"}</span>
        </div>
        <div className="detail-item">
          <strong>Phone Number:</strong>{" "}
          <span>{user.phoneNumber || "Not provided"}</span>
        </div>
        <div className="detail-item">
          <strong>Date of Birth:</strong>{" "}
          <span>{user.dateOfBirth || "Not provided"}</span>
        </div>
        <div className="detail-item">
          <strong>Occupation:</strong>{" "}
          <span>{user.occupation || "Not provided"}</span>
        </div>
        <div className="detail-item">
          <strong>Preferred Language:</strong>{" "}
          <span>{user.preferredLanguage || "Not provided"}</span>
        </div>
      </div>
      {/* Example for an "Edit Profile" button */}
      {/* <button className="edit-button">Edit Profile</button> */}
    </ProfileStyled>
  );
};

export default ProfilePage;
