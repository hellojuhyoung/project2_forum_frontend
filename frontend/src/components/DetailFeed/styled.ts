import styled from "styled-components";

export const DetailFeedStyled = styled.div`
  max-width: 800px; /* Default desktop max-width */
  margin: 60px auto; /* Default desktop margin */
  padding: 32px; /* Default desktop padding */
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  box-sizing: border-box; /* Ensures padding and border are included in the element's total width */

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* --- Responsive Adjustments for Main Container --- */

  /* For large tablets / smaller desktops (e.g., up to 992px wide) */
  @media (max-width: 992px) {
    max-width: 90%; /* Take up more width */
    margin: 40px auto; /* Reduced top/bottom margin */
    padding: 24px; /* Reduced padding */
  }

  /* For Tablets (e.g., up to 768px wide) */
  @media (max-width: 768px) {
    max-width: 95%; /* Even more width */
    margin: 30px auto; /* Further reduced margin */
    padding: 20px; /* Further reduced padding */
    border-radius: ${({ theme }) =>
      theme.borderRadius.md}; /* Slightly smaller border radius */
  }

  /* For Mobile Devices (e.g., up to 576px wide) */
  @media (max-width: 576px) {
    max-width: 100%; /* Take full width */
    margin: 20px 10px; /* Reduced top margin, consistent side margin */
    padding: 16px; /* Further reduced padding */
    border: none; /* Optional: remove border for a seamless look */
    box-shadow: none; /* Optional: remove shadow */
    border-radius: 0; /* Optional: remove border-radius */
  }

  /* For Small Mobile Devices (e.g., up to 400px wide) */
  @media (max-width: 400px) {
    margin: 15px 8px; /* Even smaller margins */
    padding: 12px; /* Minimal padding */
  }

  .detail-title {
    font-size: ${({ theme }) => theme.fontSizes.xl}; /* Default font size */
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 8px;

    /* --- Responsive Adjustments for Title --- */
    @media (max-width: 992px) {
      font-size: ${({ theme }) => theme.fontSizes.lg}; /* Smaller */
    }
    @media (max-width: 768px) {
      font-size: 1.8rem; /* Specific rem value */
      margin-bottom: 6px;
    }
    @media (max-width: 576px) {
      font-size: 1.5rem; /* Even smaller */
      margin-bottom: 4px;
    }
    @media (max-width: 400px) {
      font-size: 1.3rem; /* Smallest */
    }
  }

  .detail-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; /* Allows items to wrap */
    margin-bottom: 24px; /* Default margin */
    font-size: ${({ theme }) => theme.fontSizes.sm}; /* Default font size */
    color: ${({ theme }) => theme.colors.textSecondary};

    /* --- Responsive Adjustments for Meta Section --- */
    @media (max-width: 768px) {
      margin-bottom: 16px; /* Reduced margin */
      font-size: ${({ theme }) => theme.fontSizes.xs}; /* Smaller font */
    }
    @media (max-width: 576px) {
      flex-direction: column; /* Stack items vertically */
      align-items: flex-start; /* Align stacked items to start */
      gap: 4px; /* Small gap between stacked items */
      margin-bottom: 12px; /* Further reduced margin */
    }

    .detail-category {
      background-color: ${({ theme }) => theme.colors.accentBackground};
      color: ${({ theme }) => theme.colors.primary};
      padding: 4px 10px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      font-weight: 500;

      @media (max-width: 576px) {
        padding: 3px 8px; /* Smaller padding */
        font-size: 0.75rem; /* Ensure consistent font size */
      }
    }

    .detail-username {
      font-weight: 500;
      /* On stacked layout, add margin if needed to separate username and category */
      @media (max-width: 576px) {
        margin-top: 4px; /* Space between category and username when stacked */
      }
    }

    .detail-createdAt {
      margin-left: 20px; /* Default margin */
      color: ${({ theme }) => theme.colors.textSecondary};

      @media (max-width: 576px) {
        margin-left: 0; /* Remove margin when stacked */
        margin-top: 4px; /* Space between username and created date when stacked */
      }
    }
  }

  .detail-content {
    font-size: ${({ theme }) => theme.fontSizes.md}; /* Default font size */
    line-height: 1.75;
    color: ${({ theme }) => theme.colors.textBody};
    white-space: pre-wrap;
    margin-bottom: 36px; /* Default margin */

    /* --- Responsive Adjustments for Content --- */
    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSizes.sm}; /* Smaller font */
      line-height: 1.6;
      margin-bottom: 24px; /* Reduced margin */
    }
    @media (max-width: 480px) {
      font-size: 0.9rem; /* Even smaller */
      line-height: 1.5;
      margin-bottom: 16px; /* Further reduced margin */
    }
  }

  .detail-main-image {
    margin: 24px 0; /* Default margin */

    /* --- Responsive Adjustments for Main Image Container --- */
    @media (max-width: 768px) {
      margin: 16px 0; /* Reduced margin */
    }
    @media (max-width: 480px) {
      margin: 12px 0; /* Further reduced margin */
    }

    .main-img {
      width: 100%;
      max-height: 300px; /* Default max-height */
      object-fit: contain;
      border-radius: ${({ theme }) => theme.borderRadius.md};
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);

      /* --- Responsive Adjustments for Main Image --- */
      @media (max-width: 992px) {
        max-height: 250px; /* Reduced max-height */
      }
      @media (max-width: 768px) {
        max-height: 200px; /* Further reduced max-height */
      }
      @media (max-width: 576px) {
        max-height: 180px; /* Even smaller */
      }
      @media (max-width: 400px) {
        max-height: 150px; /* Smallest max-height */
      }
    }
  }

  .detail-gallery {
    margin-top: 24px; /* Default margin */
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(180px, 1fr)
    ); /* Default grid columns */
    gap: 12px; /* Default gap */

    /* --- Responsive Adjustments for Gallery --- */
    @media (max-width: 992px) {
      margin-top: 18px; /* Reduced margin */
      grid-template-columns: repeat(
        auto-fill,
        minmax(150px, 1fr)
      ); /* Smaller min column width */
      gap: 10px; /* Reduced gap */
    }
    @media (max-width: 768px) {
      margin-top: 16px;
      grid-template-columns: repeat(
        auto-fill,
        minmax(120px, 1fr)
      ); /* Even smaller min column width */
      gap: 8px;
    }
    @media (max-width: 576px) {
      margin-top: 12px;
      grid-template-columns: repeat(
        auto-fill,
        minmax(100px, 1fr)
      ); /* Minimal min column width */
      gap: 6px;
    }
    @media (max-width: 400px) {
      grid-template-columns: repeat(
        auto-fill,
        minmax(80px, 1fr)
      ); /* Adjust for very small screens */
      gap: 4px;
    }

    .gallery-img {
      width: 100%;
      height: 160px; /* Default fixed height */
      object-fit: cover;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      /* --- Responsive Adjustments for Gallery Images --- */
      @media (max-width: 992px) {
        height: 140px; /* Reduced height */
      }
      @media (max-width: 768px) {
        height: 120px; /* Further reduced height */
      }
      @media (max-width: 576px) {
        height: 90px; /* Even smaller */
      }
      @media (max-width: 400px) {
        height: 70px; /* Smallest height */
      }
    }
  }

  .like-section {
    margin-top: 24px; /* Add margin to separate from content/gallery */
    border-top: 1px solid ${({ theme }) => theme.colors.border}; /* Optional: Separator */
    padding-top: 16px; /* Space after separator */

    @media (max-width: 576px) {
      margin-top: 16px;
      padding-top: 12px;
    }
  }

  .like-section button {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2rem; /* Default font size */
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s ease;

    /* --- Responsive Adjustments for Like Button --- */
    @media (max-width: 768px) {
      font-size: 1.1rem;
      gap: 5px;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
      gap: 4px;
    }
  }

  .like-section button:disabled {
    opacity: 1;
    cursor: not-allowed;
  }

  .like-section button.liked {
    color: ${({ theme }) => theme.colors.danger};
  }

  .like-section button:not(.liked) {
    color: ${({ theme }) => theme.colors.textLight};
  }

  .like-section button:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.dangerHover || "#ff3366"};
  }

  .action-buttons {
    margin-top: 2rem; /* Default margin */
    display: flex;
    justify-content: flex-end; /* Align to right */
    gap: 12px; /* Default gap */

    /* --- Responsive Adjustments for Action Buttons Container --- */
    @media (max-width: 768px) {
      margin-top: 1.5rem; /* Reduced margin */
      gap: 10px;
    }
    @media (max-width: 576px) {
      flex-direction: column; /* Stack buttons vertically */
      justify-content: center; /* Center stacked buttons */
      align-items: center; /* Center items when stacked */
      gap: 8px; /* Smaller gap when stacked */
      margin-top: 1rem; /* Further reduced margin */
    }
  }

  .edit-btn,
  .delete-btn {
    padding: 10px 20px; /* Default padding */
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.sm}; /* Default font size */
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: auto; /* Default for non-stacked */

    /* --- Responsive Adjustments for Action Buttons --- */
    @media (max-width: 768px) {
      padding: 8px 16px; /* Reduced padding */
      font-size: 0.9rem;
    }
    @media (max-width: 576px) {
      width: 100%; /* Take full width when stacked */
      padding: 10px 15px; /* Adjust padding for full width */
      font-size: ${({ theme }) =>
        theme.fontSizes.sm}; /* Keep readable font size */
    }
    @media (max-width: 400px) {
      padding: 8px 12px;
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
  }

  .edit-btn {
    background-color: ${({ theme }) => theme.colors.success};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.successDark};
    }
  }

  .delete-btn {
    background-color: ${({ theme }) => theme.colors.danger};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.dangerDark};
    }
  }
`;
