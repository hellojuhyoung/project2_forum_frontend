// features/ClientServices/LoginPage/SocialLoginButtons.tsx

import React from "react";
import {
  SocialButtonsContainer,
  GoogleButton,
  KakaoButton, // Now imported
  NaverButton, // Now imported
} from "./SocialButtons.styled";

const SocialLoginButtons: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const handleKakaoLogin = () => {
    // Replace with your actual Kakao OAuth initiation URL
    alert("Kakao Login coming soon!");
    // window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/kakao`;
  };

  const handleNaverLogin = () => {
    // Replace with your actual Naver OAuth initiation URL
    alert("Naver Login coming soon!");
    // window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/naver`;
  };

  return (
    <SocialButtonsContainer>
      <GoogleButton onClick={handleGoogleLogin}>
        <img src="/google-logo.svg" alt="Google" />
      </GoogleButton>

      <KakaoButton onClick={handleKakaoLogin}>
        <img src="/kakao-logo.svg" alt="Kakao" />
      </KakaoButton>

      <NaverButton onClick={handleNaverLogin}>
        <img src="/naver-logo.svg" alt="Naver" />
      </NaverButton>
    </SocialButtonsContainer>
  );
};

export default SocialLoginButtons;
