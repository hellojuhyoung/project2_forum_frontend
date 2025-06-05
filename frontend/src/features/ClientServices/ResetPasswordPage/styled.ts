// frontend/pages/auth/reset/styled.ts
import styled from "styled-components";

export const ResetPasswordStyled = styled.div`
  &.reset-password-container {
    width: 100%;
    max-width: 400px;
    margin: 80px auto;
    padding: 40px;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .input-container {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.md};

      // Add specific styles for the title if you want it
      h2 {
        font-size: ${({ theme }) => theme.fontSizes.lg};
        color: ${({ theme }) => theme.colors.textPrimary};
        margin-bottom: ${({ theme }) => theme.spacing.md};
        text-align: center;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.md};
      }

      // Style for standard input (Ant Design Input)
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
      }

      // Override styles for password input (Ant Design Input.Password)
      .ant-input-affix-wrapper {
        padding: 0; // Ant Design adds padding inside, this might be needed
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
          &::placeholder {
            font-size: ${({ theme }) => theme.fontSizes.md};
            color: ${({ theme }) => theme.colors.textSecondary};
            opacity: 1;
          }
        }
      }

      // Style for error messages (matching your signup page)
      .error-message {
        color: red;
        font-size: ${({ theme }) => theme.fontSizes.sm};
        margin-top: ${({ theme }) =>
          theme.spacing.xs}; // Small space above error
      }

      button {
        width: 100%;
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
      }
    }
  }
`;
