import styled from "styled-components";

export const LoginStyled = styled.div`
  &.login-container {
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

      // Style for username input
      input {
        padding: ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fontSizes.md};
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        outline: none;
        &:focus {
          border-color: ${({ theme }) => theme.colors.primary};
        }
      }

      // Override styles for password input
      .ant-input-affix-wrapper {
        padding: 0;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        transition: border-color 0.3s;

        &:focus-within {
          border-color: ${({ theme }) => theme.colors.primary};
          box-shadow: none;
        }

        input {
          border: none !important;
          outline: none;
          box-shadow: none !important;
        }
      }

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
      }

      .button-logout {
        background-color: ${({ theme }) => theme.colors.secondary};
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;
