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
