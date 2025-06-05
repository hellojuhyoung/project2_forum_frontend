import styled from "styled-components";

export const ForgotUsernameStyled = styled.div`
  &.find-username-container {
    /* Changed class name to be specific to FindUsername */
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

      .page-title {
        text-align: center;
        margin-bottom: ${({ theme }) =>
          theme.spacing.md}; /* Corresponds to 24px if md=24px */
        color: #333; // Or use ${({ theme }) => theme.colors.textPrimary};
      }

      .page-description {
        text-align: center;
        margin-bottom: ${({ theme }) =>
          theme.spacing.md}; /* Corresponds to 24px */
      }

      form {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.md};
      }

      // Styles for regular Ant Design Input
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

      // Styles for Ant Design Input.Password wrapper (also affects Input if Ant Design uses it similarly)
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
    }
  }
`;
