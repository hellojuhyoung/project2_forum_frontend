import styled from "styled-components";

export const ForgotPasswordStyled = styled.div`
  &.find-password-page-container {
    width: 100%; /* Ensure it takes full width for max-width to work */
    max-width: 400px; /* Default max-width for desktop/larger screens */
    margin: 80px auto; /* Default top/bottom margin, horizontally centered */
    box-sizing: border-box; /* IMPORTANT: Ensures padding/border is included in the element's total width */

    /* --- Responsive Adjustments for the main page container --- */

    /* For Tablets (e.g., up to 768px wide) */
    @media (max-width: 768px) {
      margin-top: 60px; /* Reduce top margin slightly */
    }

    /* For Larger Mobile Devices (e.g., up to 576px wide) */
    @media (max-width: 576px) {
      max-width: 90%; /* Allow it to take up more width on smaller screens */
      margin-top: 40px; /* Further reduce top margin */
    }

    /* For Small Mobile Devices (e.g., up to 400px wide) */
    @media (max-width: 400px) {
      max-width: 100%; /* Take full available width */
      margin: 20px 10px; /* Reduced top margin, add consistent side margin */
    }

    .input-container {
      /* Styles for the white box containing the form elements */
      background: white;
      padding: ${({ theme }) =>
        theme.spacing.xl}; /* Default generous padding */
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
      width: 100%; /* Ensures it fills its max-width parent */
      text-align: center; /* Center text content inside the box */
      box-sizing: border-box; /* Ensure padding is included in the width */

      /* --- Responsive Adjustments for the inner content box --- */
      @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.lg}; /* Slightly less padding */
      }

      @media (max-width: 576px) {
        padding: ${({ theme }) =>
          theme.spacing.md}; /* Reduced padding for mobile */
        box-shadow: none; /* Optional: remove box-shadow for a cleaner look on mobile */
        border-radius: 0; /* Optional: remove border-radius if it's taking full width */
        /* If there's an implicit border due to background/shadow, you might want to add 'border: none;' here */
      }

      @media (max-width: 400px) {
        padding: ${({ theme }) =>
          theme.spacing.sm}; /* Minimal padding on very small screens */
      }

      input {
        padding: ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fontSizes.md};
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;

        &:focus {
          border-color: ${({ theme }) => theme.colors.primary};
          box-shadow: 0 0 0 2px rgba(0, 100, 255, 0.2);
        }
        &::placeholder {
          font-size: ${({ theme }) => theme.fontSizes.md};
          color: ${({ theme }) => theme.colors.textSecondary};
          opacity: 1;
        }

        /* Adjust font size for inputs on small mobile screens */
        @media (max-width: 480px) {
          font-size: ${({ theme }) =>
            theme.fontSizes.sm}; /* Smaller input font */
          padding: ${({ theme }) =>
            theme.spacing.xs}; /* Slightly less padding */
        }
      }

      // Styles for Ant Design Input.Password and Inputs with prefixes/suffixes
      .ant-input-affix-wrapper {
        padding: ${({ theme }) =>
          theme.spacing.sm}; // Apply padding to the wrapper
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        transition: border-color 0.3s, box-shadow 0.3s;

        &:focus-within {
          border-color: ${({ theme }) => theme.colors.primary};
          box-shadow: 0 0 0 2px rgba(0, 100, 255, 0.2);
        }

        // The actual input element *inside* the wrapper
        input {
          border: none !important; // Remove its individual border
          outline: none;
          box-shadow: none !important;
          padding: 0; // Remove its internal padding (wrapper has it)
          /* Font-size and placeholder are now controlled by the general 'input' rule above */
        }
        /* Adjust Ant Design wrapper padding for small mobile screens */
        @media (max-width: 480px) {
          padding: ${({ theme }) =>
            theme.spacing.xs}; /* Adjust wrapper padding */
        }
      }

      /* Styles for the Forgot Password? Title */
      .page-title {
        text-align: center;
        margin-bottom: ${({ theme }) =>
          theme.spacing.md}; /* Space below the title */

        /* Adjust font size for title on smaller screens */
        @media (max-width: 576px) {
          font-size: 1.5rem; /* Example: A specific smaller rem value */
          margin-bottom: ${({ theme }) => theme.spacing.sm};
        }
        @media (max-width: 400px) {
          font-size: 1.3rem; /* Even smaller on very small phones */
          margin-bottom: ${({ theme }) => theme.spacing.xs};
        }
      }

      /* Styles for the descriptive text below the title */
      .page-description {
        text-align: center;
        display: block; /* Ensure it behaves as a block for margins */
        margin-bottom: ${({ theme }) =>
          theme.spacing.md}; /* Space below the description */

        /* Adjust font size for description on smaller screens */
        @media (max-width: 576px) {
          font-size: ${({ theme }) =>
            theme.fontSizes.sm}; /* Or a specific rem value like 0.9rem */
          margin-bottom: ${({ theme }) => theme.spacing.sm};
        }
        @media (max-width: 400px) {
          font-size: ${({ theme }) =>
            theme.fontSizes.xs}; /* Even smaller if needed */
          margin-bottom: ${({ theme }) => theme.spacing.xs};
        }
      }

      /* Generic form styling, common across forms */
      form {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) =>
          theme.spacing.md}; /* Spacing between form elements */
      }

      /* Button Styles (added for consistency as they were in other forms) */
      button {
        margin-top: ${({ theme }) => theme.spacing.sm};
        padding: ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fontSizes.md};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: ${({ theme }) => theme.colors.primaryDark};
        }

        /* Adjust font size for buttons on small mobile screens */
        @media (max-width: 480px) {
          font-size: ${({ theme }) =>
            theme.fontSizes.sm}; /* Smaller button font */
          padding: ${({ theme }) =>
            theme.spacing.xs}; /* Slightly less padding */
        }
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
          theme.fontSizes.sm}; /* Matching default font size */
        cursor: pointer;
        color: ${({ theme }) => theme.colors.primary}; /* Matching color */
        text-decoration: none; /* No underline by default */
        transition: text-decoration 0.3s, color 0.3s; /* Smooth transition for hover */

        &:hover {
          text-decoration: underline; /* Underline on hover */
          color: ${({ theme }) =>
            theme.colors.primaryDark}; /* Darker color on hover */
        }
        /* Adjust font size for utility links on small mobile screens */
        @media (max-width: 480px) {
          font-size: 0.8rem; /* Use a specific rem value or theme.fontSizes.sm */
        }
      }
    }
  }
`;
