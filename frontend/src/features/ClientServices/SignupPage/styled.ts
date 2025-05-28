import styled from "styled-components";

export const SignupStyled = styled.div`
  &.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 160px); /* accounts for header + footer */
    background-color: ${({ theme }) => theme.colors.backgroundLight};

    .input-container {
      background-color: ${({ theme }) => theme.colors.background};
      padding: ${({ theme }) => theme.spacing.lg};
      border-radius: ${({ theme }) => theme.borderRadius.md};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 400px;

      form {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.md};

        .username-container,
        .password-container,
        .email-container {
          display: flex;
          flex-direction: column;
        }

        .ant-input,
        .ant-input-password {
          height: 44px;
          border-radius: ${({ theme }) => theme.borderRadius.sm};
          font-size: ${({ theme }) => theme.fontSizes.md};
        }

        .error-message {
          color: red;
          font-size: ${({ theme }) => theme.fontSizes.sm};
          margin-top: 4px;
        }

        .submit-button-container {
          margin-top: ${({ theme }) => theme.spacing.md};

          button {
            width: 100%;
            height: 44px;
            font-size: ${({ theme }) => theme.fontSizes.md};
            font-weight: ${({ theme }) => theme.fontWeights.bold};
            border-radius: ${({ theme }) => theme.borderRadius.sm};
          }
        }
      }
    }
  }
`;
