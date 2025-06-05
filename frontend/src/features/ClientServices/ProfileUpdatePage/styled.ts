import styled from "styled-components";

export const EditProfileStyled = styled.div`
  max-width: 600px; // A suitable width for the edit form
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  h1 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-align: center;
  }

  .ant-form-item-label > label {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .profile-picture-upload-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  .profile-preview-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  .username-compact-group {
    width: 100%;

    .ant-input {
      flex-grow: 1;
    }
    .validate-username-button {
      width: 100px;
      height: 40px;
      font-size: 16px;
      background-color: ${({ theme }) => theme.colors.buttonDefault};
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.borderColor};

      &:hover {
        background-color: ${({ theme }) => theme.colors.buttonDefaultHover};
        color: ${({ theme }) => theme.colors.text};
        border-color: ${({ theme }) => theme.colors.borderColorHover};
      }
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(${({ theme }) => theme.colors.primary}, 0.2);
      }
      &:disabled {
        background-color: ${({ theme }) => theme.colors.disabledBackground};
        color: ${({ theme }) => theme.colors.disabledText};
        border-color: ${({ theme }) => theme.colors.disabledBorder};
        cursor: not-allowed;
      }
    }
  }

  .username-validation-message {
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 15px;
    font-weight: 500;
    min-height: 15px;

    &.available {
      color: ${({ theme }) => theme.colors.success};
    }

    &.taken {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  .ant-btn {
    // Basic styling for Ant Design buttons if you want them to match theme
    // You can override specific Ant Design button styles here
    &.ant-btn-primary {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryHover};
        border-color: ${({ theme }) => theme.colors.primaryHover};
      }
    }
    &.ant-btn-link {
      color: ${({ theme }) => theme.colors.danger};
      &:hover {
        color: ${({ theme }) => theme.colors.dangerHover};
      }
    }
  }
`;
