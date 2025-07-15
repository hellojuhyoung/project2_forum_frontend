import { theme } from "@/styles/theme";
import styled from "styled-components";

export const DetailFeedStyled = styled.div`
  max-width: 900px; /* Increased max-width for a wider content area on desktop */
  margin: 60px auto; /* Default desktop margin */
  padding: 40px; /* Increased padding for more breathing room */
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); /* Slightly more prominent shadow */
  transition: box-shadow 0.3s ease;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12); /* More prominent hover shadow */
  }

  /* --- Responsive Adjustments for Main Container --- */

  /* For large tablets / smaller desktops (e.g., up to 1024px wide) */
  @media (max-width: 1024px) {
    max-width: 95%; /* Take up more width */
    margin: 40px auto; /* Reduced top/bottom margin */
    padding: 30px; /* Reduced padding */
  }

  /* For Tablets (e.g., up to 768px wide) */
  @media (max-width: 768px) {
    max-width: 95%; /* Maintain width */
    margin: 30px auto; /* Further reduced margin */
    padding: 24px; /* Further reduced padding */
    border-radius: ${({ theme }) =>
      theme.borderRadius.md}; /* Slightly smaller border radius */
  }

  /* For Mobile Devices (e.g., up to 576px wide) */
  @media (max-width: 576px) {
    max-width: 100%; /* Take full width */
    margin: 20px 0; /* Reduced top margin, no side margin */
    padding: 16px; /* Further reduced padding */
    border: none; /* Removed border for a seamless mobile look */
    box-shadow: none; /* Removed shadow for mobile */
    border-radius: 0; /* Removed border-radius for mobile */
  }

  /* For Small Mobile Devices (e.g., up to 400px wide) */
  @media (max-width: 400px) {
    margin: 15px 0; /* Even smaller margins */
    padding: 12px; /* Minimal padding */
  }

  .detail-title {
    font-size: ${({ theme }) => theme.fontSizes.xl}; /* Default font size */
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${theme.spacing.sm}; /* Use theme spacing */
    line-height: 1.3; /* Improve readability */

    /* --- Responsive Adjustments for Title --- */
    @media (max-width: 992px) {
      font-size: ${({ theme }) => theme.fontSizes.lg}; /* Smaller */
    }
    @media (max-width: 768px) {
      font-size: 1.8rem; /* Specific rem value */
      margin-bottom: ${theme.spacing.xs};
    }
    @media (max-width: 576px) {
      font-size: 1.5rem; /* Even smaller */
      margin-bottom: ${theme.spacing.xxs};
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
    margin-bottom: ${theme.spacing.lg}; /* Default margin */
    font-size: ${({ theme }) => theme.fontSizes.sm}; /* Default font size */
    color: ${({ theme }) => theme.colors.textSecondary};

    /* --- Responsive Adjustments for Meta Section --- */
    @media (max-width: 768px) {
      margin-bottom: ${theme.spacing.md}; /* Reduced margin */
      font-size: ${({ theme }) => theme.fontSizes.xs}; /* Smaller font */
    }
    @media (max-width: 576px) {
      flex-direction: column; /* Stack items vertically */
      align-items: flex-start; /* Align stacked items to start */
      gap: ${theme.spacing.xxs}; /* Small gap between stacked items */
      margin-bottom: ${theme.spacing.sm}; /* Further reduced margin */
    }

    .detail-category {
      background-color: ${({ theme }) => theme.colors.accentBackground};
      color: ${({ theme }) => theme.colors.primary};
      padding: ${theme.spacing.xxs} ${theme.spacing.xs}; /* Use theme spacing */
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
        margin-top: ${theme.spacing
          .xxs}; /* Space between category and username when stacked */
      }
    }

    .detail-createdAt {
      margin-left: ${theme.spacing.md}; /* Default margin */
      color: ${({ theme }) => theme.colors.textSecondary};

      @media (max-width: 576px) {
        margin-left: 0; /* Remove margin when stacked */
        margin-top: ${theme.spacing
          .xxs}; /* Space between username and created date when stacked */
      }
    }
  }

  .detail-content {
    font-size: ${({ theme }) => theme.fontSizes.md}; /* Default font size */
    line-height: 1.75;
    color: ${({ theme }) => theme.colors.textBody};
    white-space: pre-wrap; /* Preserve whitespace and line breaks */
    margin-bottom: ${theme.spacing.xl}; /* Increased margin after content */

    /* --- Responsive Adjustments for Content --- */
    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSizes.sm}; /* Smaller font */
      line-height: 1.6;
      margin-bottom: ${theme.spacing.lg}; /* Reduced margin */
    }
    @media (max-width: 480px) {
      font-size: 0.9rem; /* Even smaller */
      line-height: 1.5;
      margin-bottom: ${theme.spacing.md}; /* Further reduced margin */
    }
  }

  .detail-main-image {
    margin: ${theme.spacing.lg} 0; /* Adjusted margin */
    cursor: pointer; /* Indicate clickable */

    /* --- Responsive Adjustments for Main Image Container --- */
    @media (max-width: 768px) {
      margin: ${theme.spacing.md} 0; /* Reduced margin */
    }
    @media (max-width: 480px) {
      margin: ${theme.spacing.sm} 0; /* Further reduced margin */
    }

    .main-img {
      width: 100%;
      max-height: 500px; /* Significantly increased max-height for wallpaper effect */
      object-fit: cover; /* CHANGED: Use 'cover' to fill the area, cropping if necessary */
      border-radius: ${({ theme }) => theme.borderRadius.md};
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* More prominent shadow */

      /* --- Responsive Adjustments for Main Image --- */
      @media (max-width: 1024px) {
        max-height: 400px; /* Reduced max-height for medium desktops */
      }
      @media (max-width: 768px) {
        max-height: 300px; /* Further reduced max-height for tablets */
      }
      @media (max-width: 576px) {
        max-height: 250px; /* Even smaller for mobiles */
      }
      @media (max-width: 400px) {
        max-height: 200px; /* Smallest max-height */
      }
    }
  }

  .detail-gallery {
    margin-top: ${theme.spacing.lg}; /* Adjusted margin */
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(150px, 1fr)
    ); /* Default grid columns, slightly larger min */
    gap: ${theme.spacing.sm}; /* Default gap */

    /* --- Responsive Adjustments for Gallery --- */
    @media (max-width: 992px) {
      margin-top: ${theme.spacing.md}; /* Reduced margin */
      grid-template-columns: repeat(
        auto-fill,
        minmax(120px, 1fr)
      ); /* Smaller min column width */
      gap: ${theme.spacing.xs}; /* Reduced gap */
    }
    @media (max-width: 768px) {
      margin-top: ${theme.spacing.md};
      grid-template-columns: repeat(
        auto-fill,
        minmax(100px, 1fr)
      ); /* Even smaller min column width */
      gap: ${theme.spacing.xs};
    }
    @media (max-width: 576px) {
      margin-top: ${theme.spacing.sm};
      grid-template-columns: repeat(
        auto-fill,
        minmax(90px, 1fr)
      ); /* Minimal min column width */
      gap: ${theme.spacing.xxs};
    }
    @media (max-width: 400px) {
      grid-template-columns: repeat(
        auto-fill,
        minmax(70px, 1fr)
      ); /* Adjust for very small screens */
      gap: ${theme.spacing.xxs};
    }

    .gallery-img {
      width: 100%;
      height: 120px; /* Default fixed height, smaller than main image */
      object-fit: cover; /* Use cover to fill space */
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      cursor: pointer; /* Indicate clickable */

      /* --- Responsive Adjustments for Gallery Images --- */
      @media (max-width: 992px) {
        height: 100px; /* Reduced height */
      }
      @media (max-width: 768px) {
        height: 80px; /* Further reduced height */
      }
      @media (max-width: 576px) {
        height: 70px; /* Even smaller */
      }
      @media (max-width: 400px) {
        height: 60px; /* Smallest height */
      }
    }
  }

  .like-section {
    margin-top: ${theme.spacing
      .xl}; /* Add margin to separate from content/gallery */
    border-top: 1px solid ${({ theme }) => theme.colors.border}; /* Optional: Separator */
    padding-top: ${theme.spacing.md}; /* Space after separator */

    @media (max-width: 576px) {
      margin-top: ${theme.spacing.lg};
      padding-top: ${theme.spacing.sm};
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
    gap: ${theme.spacing.xxs}; /* Use theme spacing */
    transition: color 0.2s ease;

    /* --- Responsive Adjustments for Like Button --- */
    @media (max-width: 768px) {
      font-size: 1.1rem;
      gap: ${theme.spacing.xxs};
    }
    @media (max-width: 480px) {
      font-size: 1rem;
      gap: ${theme.spacing.xxs};
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
    color: ${({ theme }) =>
      theme.colors
        .textSecondary}; /* Changed from textLight for better contrast */
  }

  .like-section button:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.dangerHover || "#ff3366"};
  }

  .action-buttons {
    margin-top: ${theme.spacing.xl}; /* Default margin */
    display: flex;
    justify-content: flex-end; /* Align to right */
    gap: ${theme.spacing.sm}; /* Use theme spacing */

    /* --- Responsive Adjustments for Action Buttons Container --- */
    @media (max-width: 768px) {
      margin-top: ${theme.spacing.lg}; /* Reduced margin */
      gap: ${theme.spacing.xs};
    }
    @media (max-width: 576px) {
      flex-direction: column; /* Stack buttons vertically */
      justify-content: center; /* Center stacked buttons */
      align-items: center; /* Center items when stacked */
      gap: ${theme.spacing.xs}; /* Smaller gap when stacked */
      margin-top: ${theme.spacing.md}; /* Further reduced margin */
    }
  }

  .edit-btn,
  .delete-btn {
    padding: ${theme.spacing.xs} ${theme.spacing.md}; /* Default padding */
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.sm}; /* Default font size */
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: auto; /* Default for non-stacked */

    /* --- Responsive Adjustments for Action Buttons --- */
    @media (max-width: 768px) {
      padding: ${theme.spacing.xxs} ${theme.spacing.sm}; /* Reduced padding */
      font-size: 0.9rem;
    }
    @media (max-width: 576px) {
      width: 100%; /* Take full width when stacked */
      padding: ${theme.spacing.xs} ${theme.spacing.md}; /* Adjust padding for full width */
      font-size: ${({ theme }) =>
        theme.fontSizes.sm}; /* Keep readable font size */
    }
    @media (max-width: 400px) {
      padding: ${theme.spacing.xxs} ${theme.spacing.sm};
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

// NEW: Styled component for the image lightbox modal
export const ImageLightboxStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85); /* Darker overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of everything */
  cursor: zoom-out; /* Indicate it's clickable to close */

  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain; /* Ensure the whole image is visible */
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Stronger shadow for pop-up */
  }
`;
