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

  // Styling for the Ant Design Space.Compact holding username input and validate button
  // This ensures proper spacing and rounded corners when the input and button are side-by-side.
  .ant-space-compact {
    width: 100%; // Ensure it takes full width

    // Style for the Input component within the compact group
    .ant-input-affix-wrapper,
    .ant-input {
      flex-grow: 1; // Allow input to take available space
      border-radius: 10px 0 0 10px; // Rounded left side for input
    }

    // Specific styling for the validate username button within the compact group
    .ant-btn {
      border-radius: 0 10px 10px 0; // Rounded right side for button
      height: 40px; // Match input height
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
    margin-bottom: 15px; // This ensures consistent spacing after message
    font-weight: 500;
    min-height: 15px; /* Give it a minimum height to prevent layout shifts */

    &.available {
      color: ${({ theme }) => theme.colors.success};
    }

    &.taken {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  // Style for the Form.Item that contains the action buttons (Update/Complete & Cancel)
  // This uses flexbox to push the buttons to the right and control their spacing.
  .ant-form-item.ant-form-item-control-input-last {
    .ant-form-item-control-input-content {
      display: flex;
      justify-content: flex-end; /* Align buttons to the right */
      gap: 10px; /* Space between the buttons */

      /* Responsive adjustment: stack buttons on very small screens */
      @media (max-width: 480px) {
        flex-direction: column; /* Stack buttons vertically */
        align-items: center; /* Center stacked buttons horizontally */
      }
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
    // Specific styles for the "Upload Image" / "Change Image" button (which is a default Ant Design button)
    &.ant-btn-default {
      background-color: ${({ theme }) => theme.colors.buttonDefault};
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.borderColor};
      &:hover {
        background-color: ${({ theme }) => theme.colors.buttonDefaultHover};
        color: ${({ theme }) => theme.colors.text};
        border-color: ${({ theme }) => theme.colors.borderColorHover};
      }
    }
  }
`;
