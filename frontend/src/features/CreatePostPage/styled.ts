import styled from "styled-components";

export const CreatePostStyled = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem 2.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07), 0 6px 20px rgba(0, 0, 0, 0.05);

  .post-input-container {
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
  }

  label {
    display: block;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #222;
    position: relative;
    cursor: pointer;

    &:focus-within::after,
    &:hover::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #40a9ff, #1890ff);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }

  .title-container,
  .content-container {
    display: flex;
    flex-direction: column;
  }

  input[type="text"],
  input,
  textarea {
    font-size: 1.1rem;
    padding: 0.65rem 1rem;
    border: 1.8px solid #d1d9e6;
    border-radius: 10px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    outline: none;
    width: 100%;

    &:focus {
      border-color: #1890ff;
      box-shadow: 0 0 8px rgba(24, 144, 255, 0.5),
        inset 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
      font-style: italic;
    }
  }

  .category-container {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    gap: 1.5rem;
  }

  .category-container > label {
    flex-shrink: 0;
    font-weight: 700;
    margin-right: 1rem;
    color: #444;
  }

  .ant-radio-group {
    display: flex;
    gap: 1.2rem;
  }

  .ant-radio-wrapper {
    margin-right: 0 !important;
  }

  .content-container {
    .toast-editor-wrapper {
      min-height: 280px;
      border: 1.8px solid #d1d9e6;
      border-radius: 10px;
      padding: 0.6rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);

      &:focus-within {
        border-color: #1890ff;
        box-shadow: 0 0 10px rgba(24, 144, 255, 0.55),
          inset 0 1px 4px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-end;

    button {
      background: linear-gradient(135deg, #1890ff, #40a9ff);
      color: white;
      border: none;
      padding: 0.7rem 1.8rem;
      font-weight: 700;
      font-size: 1rem;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: none;
      transition: background 0.3s ease;

      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #40a9ff, #1e90ff);
      }

      &:disabled {
        background-color: #a0cfff;
        cursor: not-allowed;
      }
    }
  }

  /* Error message */
  div[style*="color: red"] {
    margin-top: 0.35rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #e55353;
    font-style: italic;
  }

  /* Responsive */
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;

    .button-container {
      button {
        width: 100%;
      }
    }
  }
`;
