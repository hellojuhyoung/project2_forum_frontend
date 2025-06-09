import styled from "styled-components";

export const CreatePostStyled = styled.div`
  max-width: 800px; /* Default max-width for desktop */
  margin: 2rem auto; /* Default top/bottom margin, horizontally centered */
  padding: 2rem 2.5rem; /* Default internal padding */
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07), 0 6px 20px rgba(0, 0, 0, 0.05);
  box-sizing: border-box; /* Ensures padding/border is included in the element's total width */

  /* --- Responsive Adjustments for the main container --- */

  /* For large tablets / smaller desktops (e.g., iPad Pro, laptops) */
  @media (max-width: 992px) {
    max-width: 90%; /* Allow it to take up more width */
    margin: 1.5rem auto; /* Slightly less top/bottom margin */
    padding: 1.8rem 2rem; /* Slightly reduced padding */
  }

  /* For Tablets (e.g., standard iPads, larger phones in landscape) */
  @media (max-width: 768px) {
    max-width: 95%; /* Even more width */
    margin: 1.5rem auto;
    padding: 1.5rem 1.8rem; /* Further reduced padding */
  }

  /* For Larger Mobile Devices (and existing 600px breakpoint) */
  @media (max-width: 600px) {
    padding: 1.5rem 1rem; /* Existing adjustment */
    max-width: 100%; /* Take full width on mobile */
    margin: 1rem 0.8rem; /* Reduced top margin, add side margin */
    border-radius: 0; /* Optional: remove border-radius for a full-width feel */
    box-shadow: none; /* Optional: remove shadow for a cleaner mobile look */
  }

  /* For Small Mobile Devices (e.g., up to 400px wide) */
  @media (max-width: 400px) {
    padding: 1rem 0.8rem; /* Even smaller padding */
    margin: 0.8rem 0.5rem; /* Minimal margins */
  }

  .post-input-container {
    display: flex;
    flex-direction: column;
    gap: 2.2rem; /* Default gap */

    /* Adjust gap for smaller screens */
    @media (max-width: 576px) {
      gap: 1.5rem;
    }
    @media (max-width: 400px) {
      gap: 1rem;
    }
  }

  label {
    display: block;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #222;
    position: relative;
    cursor: pointer;

    /* No changes needed here, as the pseudo-element scales with font/container */
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
    font-size: 1.1rem; /* Default font size */
    padding: 0.65rem 1rem; /* Default padding */
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

    /* Adjust font size and padding for inputs/textareas on smaller screens */
    @media (max-width: 576px) {
      font-size: 1rem; /* Slightly smaller */
      padding: 0.5rem 0.8rem;
    }
    @media (max-width: 400px) {
      font-size: 0.9rem; /* Even smaller */
      padding: 0.4rem 0.6rem;
    }
  }

  .category-container {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    gap: 1.5rem; /* Default gap */

    /* Make category container stack vertically on smaller screens to prevent overflow */
    @media (max-width: 576px) {
      flex-direction: column; /* Stack label and radio group */
      align-items: flex-start; /* Align items to the start when stacked */
      gap: 0.8rem; /* Reduce gap when stacked */
    }
  }

  .category-container > label {
    flex-shrink: 0;
    font-weight: 700;
    margin-right: 1rem; /* Default margin */
    color: #444;

    @media (max-width: 576px) {
      margin-right: 0; /* Remove right margin when stacked */
      margin-bottom: 0.5rem; /* Add bottom margin if needed when stacked */
    }
  }

  .ant-radio-group {
    display: flex;
    gap: 1.2rem; /* Default gap between radios */
    flex-wrap: wrap; /* Allow radios to wrap to the next line if space is tight */

    /* Adjust gap for radios on smaller screens */
    @media (max-width: 400px) {
      gap: 0.8rem; /* Reduced gap */
    }
    /* If individual radio options are very long or numerous, consider changing to column on very small screens: */
    /* @media (max-width: 360px) {
      flex-direction: column;
      gap: 0.5rem;
    } */
  }

  .ant-radio-wrapper {
    margin-right: 0 !important;
  }

  .content-container {
    .toast-editor-wrapper {
      min-height: 280px; /* Default min-height */
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

      /* Adjust min-height for toast editor on smaller screens to save vertical space */
      @media (max-width: 768px) {
        min-height: 250px;
      }
      @media (max-width: 576px) {
        min-height: 200px;
        padding: 0.4rem; /* Reduce padding */
      }
      @media (max-width: 400px) {
        min-height: 180px; /* Even smaller on very small phones */
      }
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-end; /* Default for larger screens */
    margin-top: 2rem; /* Add extra space above the button container */

    /* Center the button on smaller screens, and if multiple buttons, stack them */
    @media (max-width: 600px) {
      justify-content: center; /* Center button horizontally */
    }
    @media (max-width: 400px) {
      flex-direction: column; /* Stack buttons vertically if there are multiple */
      gap: 0.5rem; /* Gap between buttons if stacked */
    }

    button {
      background: linear-gradient(135deg, #1890ff, #40a9ff);
      color: white;
      border: none;
      padding: 0.7rem 1.8rem;
      font-weight: 700;
      font-size: 1rem; /* Default font size */
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

      /* Apply 100% width on existing 600px breakpoint */
      @media (max-width: 600px) {
        width: 100%; /* Existing rule */
        font-size: 0.95rem; /* Slightly smaller button text */
        padding: 0.6rem 1.5rem;
      }
      @media (max-width: 400px) {
        font-size: 0.9rem; /* Even smaller button text */
        padding: 0.5rem 1rem;
      }
    }
  }

  /* Error message */
  div[style*="color: red"] {
    margin-top: 0.35rem;
    font-size: 0.9rem; /* Default font size */
    font-weight: 600;
    color: #e55353;
    font-style: italic;

    /* Adjust font size for error messages on smaller screens */
    @media (max-width: 480px) {
      font-size: 0.8rem; /* Slightly smaller error message font */
    }
  }
`;
