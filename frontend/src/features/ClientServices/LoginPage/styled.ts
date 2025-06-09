import styled from "styled-components";

export const LoginStyled = styled.div`
  &.login-container {
    width: 100%; /* Always take full width available to its parent */
    max-width: 400px; /* Desktop/Tablet default maximum width */
    margin: 80px auto; /* Centered horizontally, default top/bottom margin */
    padding: 40px; /* Default padding inside the container */
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* Ensures padding is included in the element's total width and height */

    /* --- Responsive Adjustments --- */

    /* For Tablets (e.g., up to 768px wide) */
    @media (max-width: 768px) {
      margin-top: 60px; /* Reduce top margin slightly */
      padding: 30px; /* Slightly reduce internal padding */
    }

    /* For Larger Mobile Devices (e.g., up to 576px wide) */
    @media (max-width: 576px) {
      max-width: 90%; /* Allow it to take up more width on smaller screens */
      margin-top: 40px; /* Further reduce top margin */
      padding: 20px; /* Further reduce internal padding */
      box-shadow: none; /* Optional: remove box-shadow for a cleaner look on mobile */
      border: none; /* Optional: remove border on mobile */
      border-radius: 0; /* Optional: make corners sharp if it's almost full width */
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

      .recovery-links-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: ${({ theme }) => theme.spacing.md};
        margin-bottom: ${({ theme }) => theme.spacing.sm};
      }

      .auth-utility-link {
        background: none;
        border: none;
        padding: 0;
        font-size: ${({ theme }) => theme.fontSizes.sm}; /* Default font size */
        cursor: pointer;
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
        transition: text-decoration 0.3s, color 0.3s;

        &:hover {
          text-decoration: underline;
          color: ${({ theme }) => theme.colors.primaryDark};
        }

        /* Adjust font size for utility links on very small screens */
        @media (max-width: 480px) {
          font-size: ${({ theme }) =>
            theme.fontSizes.xs}; /* Smaller font for better fit */
        }
      }

      form {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.md};
      }

      input {
        padding: ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fontSizes.md}; /* Default font size */
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        outline: none;
        &:focus {
          border-color: ${({ theme }) => theme.colors.primary};
        }

        /* Adjust font size for inputs on very small screens */
        @media (max-width: 480px) {
          font-size: ${({ theme }) =>
            theme.fontSizes.sm}; /* Smaller font for inputs */
          padding: ${({ theme }) =>
            theme.spacing.xs}; /* Slightly less padding */
        }
      }

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
          border: none !important; /* Ant Design's input within wrapper */
          outline: none;
          box-shadow: none !important;
        }

        /* Adjust Ant Design wrapper padding if needed, but input handles font size */
        @media (max-width: 480px) {
          /* You might want to adjust overall height if input font size changes */
        }
      }

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

        /* Adjust font size for buttons on very small screens */
        @media (max-width: 480px) {
          font-size: ${({ theme }) =>
            theme.fontSizes.sm}; /* Smaller font for buttons */
          padding: ${({ theme }) =>
            theme.spacing.xs}; /* Slightly less padding */
        }
      }

      .button-logout {
        background-color: ${({ theme }) => theme.colors.danger};
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;
