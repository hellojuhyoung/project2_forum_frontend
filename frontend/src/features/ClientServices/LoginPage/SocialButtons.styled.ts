// features/ClientServices/LoginPage/SocialButtons.styled.ts

import styled, { css } from "styled-components";

// Container for all social login buttons (now horizontal)
export const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

// Base styling for a social login button (now square and icon-only)
export const StyledSocialButton = styled.button`
  background-color: transparent; /* Make the button background completely transparent */
  border: none; /* Remove any borders */
  padding: 0; /* Remove internal padding of the button */

  width: 45px; /* Define the clickable square area for the icon */
  height: 45px;
  border-radius: 8px; /* Maintain subtle rounded corners for the clickable area */
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out; /* Smooth transitions for hover effects */

  &:hover {
    transform: translateY(-2px); /* Slight lift effect */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* A subtle shadow to highlight the transparent button */
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow when clicked */
  }

  img {
    width: 50px; /* Size of the icon itself within the 50px clickable area */
    height: 50px;
    border-radius: 8px;
    object-fit: contain; /* Ensures the image fits without distortion */
  }
`;

// Specific styling for Google button
export const GoogleButton = styled(StyledSocialButton)`
  background-color: #ffffff; /* White background for Google G logo */
  border: 1px solid #dadce0; /* Light gray border for Google */
`;

// Specific styling for Kakao button (Placeholder)
export const KakaoButton = styled(StyledSocialButton)`
  background-color: #fee500; /* Kakao Yellow */
  border: none; /* Kakao typically has no border */
`;

// Specific styling for Naver button (Placeholder)
export const NaverButton = styled(StyledSocialButton)`
  background-color: #03c75a; /* Naver Green */
  border: none; /* Naver typically has no border */
`;
