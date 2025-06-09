// styled.ts (for SignupPage.tsx)
import styled from "styled-components";

export const SignupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 576px) {
    padding: 10px;
  }

  .signup-container {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    padding: 30px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;

    @media (max-width: 768px) {
      padding: 25px;
      max-width: 450px;
    }

    @media (max-width: 576px) {
      padding: 20px;
      max-width: 95%;
    }
  }

  .input-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    @media (max-width: 576px) {
      max-width: 100%;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    @media (max-width: 576px) {
      gap: 12px;
    }
  }

  .form-field-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .ant-input,
    .ant-input-password,
    .ant-picker,
    .ant-select {
      height: 40px;
      font-size: 16px;
    }
    .ant-input-textarea {
      height: auto;
      min-height: 80px;
    }
  }

  .ant-space-compact {
    display: flex;
    width: 100%;

    .ant-input {
      flex-grow: 1;
    }
    .ant-btn {
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

      @media (max-width: 480px) {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 8px;
    }
  }

  .form-label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 4px;

    @media (max-width: 576px) {
      font-size: 13px;
    }
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

    /* Responsive gap and font size for radio buttons */
    @media (max-width: 576px) {
      gap: 10px; /* Smaller gap between radios on mobile */
      font-size: 15px;
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

        /* Responsive image preview size */
        @media (max-width: 576px) {
          max-width: 100px; /* Smaller preview image on mobile */
          max-height: 100px;
        }
      }
    }
  }

  .error-message {
    color: ${({ theme }) => theme.colors.danger};
    font-size: 12px;
    margin-top: 4px;
    /* This min-height was original, so keeping it */
    min-height: 15px;

    /* Responsive font size for error messages */
    @media (max-width: 576px) {
      font-size: 11px; /* Slightly smaller font on mobile */
    }
  }

  .username-validation-message {
    font-size: 12px;
    margin-top: 5px; /* This margin was original, so keeping it */
    font-weight: 500;
    min-height: 15px;

    &.available {
      color: ${({ theme }) => theme.colors.success};
    }

    &.taken {
      color: ${({ theme }) => theme.colors.danger};
    }

    /* Responsive font size for validation messages */
    @media (max-width: 576px) {
      font-size: 11px; /* Slightly smaller font on mobile */
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
        background-color: ${({ theme }) => theme.colors.disabledBackground};
        color: ${({ theme }) => theme.colors.textSecondary};
        cursor: not-allowed;
      }
    }
  }
`;
