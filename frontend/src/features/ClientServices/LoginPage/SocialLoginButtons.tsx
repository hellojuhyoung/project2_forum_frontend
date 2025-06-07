// features/ClientServices/LoginPage/SocialLoginButtons.tsx

import React from "react";
import {
  SocialButtonsContainer,
  GoogleButton,
  KakaoButton,
  NaverButton,
} from "./SocialButtons.styled";

const SocialLoginButtons: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/naver`;
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
        <img src="/naver-logo.png" alt="Naver" />
      </NaverButton>
    </SocialButtonsContainer>
  );
};

export default SocialLoginButtons;
