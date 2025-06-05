// styled.ts (for SignupPage.tsx)
import styled from "styled-components";

export const SignupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; // Ensure it takes full viewport height for centering
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;

  .signup-container {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    padding: 30px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px; // Max width for the form container
    box-sizing: border-box; // Include padding in width calculation
  }

  .input-container {
    width: 100%;
    max-width: 400px; /* Adjust max-width of form fields if needed */
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Spacing between form fields */
  }

  .form-field-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px; /* Spacing between label, input, and error */

    .ant-input,
    .ant-input-password,
    .ant-picker,
    .ant-select {
      height: 40px; /* Standard height for Ant Design inputs */
      font-size: 16px;
    }
    .ant-input-textarea {
      height: auto; // Allow textarea to adjust height
      min-height: 80px; // Minimum height for textarea
    }
  }

  .ant-space-compact {
    /* Target the Space.Compact component */
    display: flex; // Ensure input and button are flex items
    width: 100%; // Make sure the compact group takes full width

    .ant-input {
      flex-grow: 1; // Allow input to take remaining space
      /* Ant Design Space.Compact usually handles border radius for compact items */
      /* You might not need explicit border-radius: 0; here if Space.Compact does it */
    }
    .ant-btn {
      width: 100px; // Fixed width for the validate button as set in TSX
      height: 40px; // Match input height
      font-size: 16px; // Match input font size
      /* Ant Design Space.Compact usually handles border radius for compact items */
      /* You might not need explicit border-radius: 0; here if Space.Compact does it */
      // Adjust colors for a 'default' Ant Design button or secondary action
      background-color: ${({ theme }) =>
        theme.colors.buttonDefault}; // Assuming a default button color
      color: ${({ theme }) =>
        theme.colors.text}; // Assuming text color for default button
      border-color: ${({ theme }) =>
        theme.colors.borderColor}; // Assuming a border color

      &:hover {
        background-color: ${({ theme }) => theme.colors.buttonDefaultHover};
        color: ${({ theme }) => theme.colors.text};
        border-color: ${({ theme }) => theme.colors.borderColorHover};
      }
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(${({ theme }) => theme.colors.primary}, 0.2); // Focus ring
      }
      &:disabled {
        background-color: ${({ theme }) => theme.colors.disabledBackground};
        color: ${({ theme }) => theme.colors.disabledText};
        border-color: ${({ theme }) => theme.colors.disabledBorder};
        cursor: not-allowed;
      }
    }
  }

  .form-label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 4px;
  }

  /* Styling for Radio.Group */
  .ant-radio-group {
    display: flex;
    flex-wrap: wrap; // Allow radios to wrap if space is limited
    gap: 15px;
    font-size: 16px;
    .ant-radio-wrapper {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  /* Styling for file upload */
  .profile-picture-upload {
    .ant-input[type="file"] {
      height: auto; // Allow file input to determine its height
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .profile-picture-preview {
      margin-top: 10px;
      text-align: center;
      img {
        max-width: 150px;
        max-height: 150px;
        border-radius: 50%; // Make it circular
        object-fit: cover;
        border: 2px solid ${({ theme }) => theme.colors.border};
      }
    }
  }

  .error-message {
    color: ${({ theme }) => theme.colors.danger};
    font-size: 12px;
    margin-top: 4px;
  }

  .username-validation-message {
    font-size: 12px;
    margin-top: 5px;
    font-weight: 500;
    min-height: 15px;

    &.available {
      color: ${({ theme }) => theme.colors.success};
    }

    &.taken {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  .submit-button-container {
    margin-top: 20px;
    .ant-btn {
      width: 100%;
      height: 45px;
      font-size: 18px;
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      border: none;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryHover};
        color: white; // Keep text white on hover
      }
      &:disabled {
        background-color: ${({ theme }) => theme.colors.backgroundLight};
        color: ${({ theme }) => theme.colors.textSecondary};
        cursor: not-allowed;
      }
    }
  }
`;
