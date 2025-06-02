// frontend/pages/account/styled.ts (add this below ProfileStyled)

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
