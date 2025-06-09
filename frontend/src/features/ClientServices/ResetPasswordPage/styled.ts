// frontend/pages/auth/reset/styled.ts
import styled from "styled-components";

export const ResetPasswordStyled = styled.div`
  &.reset-password-container {
    width: 100%;
    max-width: 400px; /* Default max-width for desktop/larger screens */
    margin: 80px auto; /* Default top/bottom margin, horizontally centered */
    padding: 40px; /* Default internal padding */
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* IMPORTANT: Ensures padding/border is included in the element's total width */

    /* --- Responsive Adjustments (Consistent with previous forms) --- */

    /* For Tablets (e.g., up to 768px wide) */
    @media (max-width: 768px) {
      margin-top: 60px; /* Reduce top margin slightly */
      padding: 30px; /* Slightly reduced internal padding */
    }

    /* For Larger Mobile Devices (e.g., up to 576px wide) */
    @media (max-width: 576px) {
      max-width: 90%; /* Allow it to take up more width on smaller screens */
      margin-top: 40px; /* Further reduce top margin */
      padding: 20px; /* Reduced internal padding */
      box-shadow: none; /* Optional: remove box-shadow for a cleaner mobile look */
      border: none; /* Optional: remove border on mobile */
      border-radius: 0; /* Optional: remove border-radius if it's taking full width */
    }

    /* For Small Mobile Devices (e.g., up to 400px wide, which is your original max-width) */
    @media (max-width: 400px) {
      max-width: 100%; /* Take full available width */
      margin: 20px 10px; /* Reduced top margin more, add consistent side margin */
      padding: 15px; /* Minimal padding */
    }

    /* --- Inner Elements Responsiveness --- */

    .input-container {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.md};

      // Add specific styles for the title (h2)
      h2 {
        font-size: ${({ theme }) => theme.fontSizes.lg}; /* Default font size */
        color: ${({ theme }) => theme.colors.textPrimary};
        margin-bottom: ${({ theme }) => theme.spacing.md};
        text-align: center;

        /* Adjust font size for title on smaller screens */
        @media (max-width: 576px) {
          font-size: 1.5rem; /* Example: A specific smaller rem value (e.g., 24px) */
          margin-bottom: ${({ theme }) => theme.spacing.sm};
        }
        @media (max-width: 400px) {
          font-size: 1.3rem; /* Even smaller on very small phones (e.g., 20.8px) */
          margin-bottom: ${({ theme }) => theme.spacing.xs};
        }
      }

      form {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.md};
      }

      // Style for standard input (Ant Design Input) and inputs within Ant Design wrappers
      input {
        padding: ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fontSizes.md};
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        outline: none;
        &:focus {
          border-color: ${({ theme }) => theme.colors.primary};
        }
        &::placeholder {
          font-size: ${({ theme }) => theme.fontSizes.sm};
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

      // Override styles for password input (Ant Design Input.Password) wrapper
      .ant-input-affix-wrapper {
        padding: 0; /* Keep Ant Design's wrapper padding at 0 as inputs have their own */
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        transition: border-color 0.3s;

        &:focus-within {
          border-color: ${({ theme }) => theme.colors.primary};
          box-shadow: none;
        }

        input {
          border: none !important; // Ensure no double border
          outline: none;
          box-shadow: none !important;
          /* font-size and placeholder are handled by the general 'input' rule above */
        }
        /* Adjust Ant Design wrapper padding for small mobile screens */
        @media (max-width: 480px) {
          padding: ${({ theme }) =>
            theme.spacing.xs}; /* Adjust wrapper padding */
        }
      }

      // Style for error messages (matching your signup page)
      .error-message {
        color: red;
        font-size: ${({ theme }) => theme.fontSizes.sm}; /* Default font size */
        margin-top: ${({ theme }) => theme.spacing.xs};

        /* Adjust font size for error messages on smaller screens */
        @media (max-width: 480px) {
          font-size: ${({ theme }) =>
            theme.fontSizes.xs}; /* Smaller font for better fit */
        }
      }

      button {
        width: 100%;
        margin-top: ${({ theme }) => theme.spacing.sm};
        padding: ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fontSizes.md}; /* Default font size */
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
    }
  }
`;
