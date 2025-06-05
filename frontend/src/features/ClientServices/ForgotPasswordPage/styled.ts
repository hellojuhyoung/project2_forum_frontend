import styled from "styled-components";

export const ForgotPasswordStyled = styled.div`
  &.find-password-page-container {
    width: 100%; /* Ensure it takes full width for max-width to work */
    max-width: 400px; /* Make the outer container width consistent */
    margin: 80px auto; /* This sets 80px from top and centers horizontally */

    .input-container {
      /* Styles for the white box containing the form elements */
      background: white;
      padding: ${({ theme }) =>
        theme.spacing.xl}; /* Generous padding inside the box */
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
      width: 100%;
      max-width: 400px; /* Max width for the form box to keep it tidy */
      text-align: center; /* Center text content inside the box */

      /* Styles for the Forgot Password? Title */
      .page-title {
        text-align: center;
        margin-bottom: ${({ theme }) =>
          theme.spacing.md}; /* Space below the title */
        /* If Typography.Title's default styling is not what you want, override here */
      }

      /* Styles for the descriptive text below the title */
      .page-description {
        text-align: center;
        display: block; /* Ensure it behaves as a block for margins */
        margin-bottom: ${({ theme }) =>
          theme.spacing.md}; /* Space below the description */
        /* If Typography.Text's default styling is not what you want, override here */
      }

      /* Assuming these are general styles inherited from LoginStyled or defined elsewhere */
      /* If not, you might need to add specific Ant Design input/button overrides here */
      .input-username {
        /* Applied to Ant Design Input */
        /* Example: width: 100%; */
      }
      .button-login {
        /* Applied to Ant Design Button */
        /* Example: width: 100%; */
      }

      /* Styles for the container holding the "Back to Login" link */
      .back-to-login-link-container {
        text-align: center;
        margin-top: ${({ theme }) =>
          theme.spacing.md}; /* Space above the link */
      }

      /* Styles for the "Back to Login" link itself, consistent with Login page utility links */
      .auth-utility-link {
        background: none;
        border: none;
        padding: 0;
        font-size: ${({ theme }) =>
          theme.fontSizes.sm}; /* Matching font size */
        cursor: pointer;
        color: ${({ theme }) => theme.colors.primary}; /* Matching color */
        text-decoration: none; /* No underline by default */
        transition: text-decoration 0.3s, color 0.3s; /* Smooth transition for hover */

        &:hover {
          text-decoration: underline; /* Underline on hover */
          color: ${({ theme }) =>
            theme.colors.primaryDark}; /* Darker color on hover */
        }
      }
    }
  }
`;
