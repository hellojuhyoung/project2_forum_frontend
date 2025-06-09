import styled from "styled-components";

export const ForgotUsernameStyled = styled.div`
  &.find-username-container {
    width: 100%;
    max-width: 400px; /* Default max-width for desktop/larger screens */
    margin: 80px auto; /* Default top/bottom margin, horizontally centered */
    padding: 40px; /* Default internal padding */
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* Ensures padding is included in the element's total width and height */

    /* For Tablets (e.g., up to 768px wide) */
    @media (max-width: 768px) {
      margin-top: 60px; /* Slightly less top margin */
      padding: 30px; /* Slightly reduced internal padding */
    }

    /* For Larger Mobile Devices (e.g., up to 576px wide) */
    @media (max-width: 576px) {
      max-width: 90%; /* Allow the container to take more width on smaller screens */
      margin-top: 40px; /* Further reduce top margin */
      padding: 20px; /* Reduced internal padding */
      box-shadow: none; /* Optional: remove box-shadow for a cleaner mobile look */
      border: none; /* Optional: remove border on mobile */
      border-radius: 0; /* Optional: remove border-radius if it's taking full width */
    }

    /* For Small Mobile Devices (e.g., up to 400px wide, which is your original max-width) */
    @media (max-width: 400px) {
      max-width: 100%; /* Take full available width */
      margin: 20px 10px; /* Reduce top margin more, add consistent side margin */
      padding: 15px; /* Minimal padding */
    }

    /* --- Inner Elements Responsiveness --- */

    .input-container {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.md};

      /* This applies to all direct <input> elements within .input-container
         (including the one inside Ant Design's .ant-input-affix-wrapper if styled this way) */
      input {
        padding: ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fontSizes.md}; /* Default font size */
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

      /* Styles for Ant Design Input.Password and Inputs with prefixes/suffixes */
      .ant-input-affix-wrapper {
        padding: ${({ theme }) =>
          theme.spacing.sm}; /* Apply padding to the wrapper */
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        transition: border-color 0.3s, box-shadow 0.3s;

        &:focus-within {
          border-color: ${({ theme }) => theme.colors.primary};
          box-shadow: 0 0 0 2px rgba(0, 100, 255, 0.2);
        }

        input {
          // The actual input element *inside* the wrapper
          border: none !important;
          outline: none;
          box-shadow: none !important;
          padding: 0; // Remove its internal padding (wrapper has it, and font-size is set above)
          /* Font-size for the input inside the wrapper is now controlled by the general 'input' rule above */
        }
        /* Adjust Ant Design wrapper padding if needed, for small mobile screens */
        @media (max-width: 480px) {
          padding: ${({ theme }) =>
            theme.spacing.xs}; /* Adjust wrapper padding */
        }
      }

      .page-title {
        text-align: center;
        margin-bottom: ${({ theme }) => theme.spacing.md};
        color: #333; // Or use ${({ theme }) => theme.colors.textPrimary};

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

      .page-description {
        text-align: center;
        margin-bottom: ${({ theme }) => theme.spacing.md};

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

      form {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.md};
      }

      /* NOTE: There was a duplicate 'input' style block here. 
         The first 'input' rule (directly under .input-container) is more general
         and where responsive font/padding was applied. This duplicate block is redundant.
         You might want to remove it unless it serves a specific, different purpose. */
      /* input { 
        padding: ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fontSizes.md};
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        outline: none;
        &:focus {
          border-color: ${({ theme }) => theme.colors.primary};
        }
      } */

      button {
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
