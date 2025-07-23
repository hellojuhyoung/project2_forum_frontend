// frontend/src/components/MainFeed/styled.ts
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const MainFeedStyled = styled.div<{
  $isMostRecentSection?: boolean;
  $isMostLikedSection?: boolean;
}>`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md}; /* Default padding */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}; /* Default gap between elements */

  /* The card height will now be determined by its content, including the aspect-ratio image */
  /* height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
    $isMostRecentSection || $isMostLikedSection ? "420px" : "320px"}; */
  box-sizing: border-box; /* Ensures padding and border are included in the element's total height/width */

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* --- Responsive Adjustments for MainFeedStyled (Card Container) --- */

  /* For tablets and smaller desktops (e.g., up to 992px wide) */
  @media (max-width: 992px) {
    padding: ${({ theme }) => theme.spacing.sm}; /* Slightly less padding */
    /* height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection ? "380px" : "300px"}; */
    gap: ${({ theme }) => theme.spacing.xs}; /* Slightly less gap inside */
  }

  /* For larger mobile devices and smaller tablets (e.g., up to 768px wide) */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs}; /* Further reduced padding */
    /* height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection ? "350px" : "280px"}; */
    gap: ${({ theme }) => theme.spacing.xxs}; /* Minimal gap inside */
    border-radius: ${({ theme }) =>
      theme.borderRadius.sm}; /* Slightly smaller border-radius */
  }

  /* For small mobile devices (e.g., up to 576px wide, single column for MainFeedGrid) */
  @media (max-width: 576px) {
    padding: ${theme.spacing.sm}; /* Increased padding for single column view */
    /* Height for single column view - significantly increased for prominence */
    /* height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "380px" // Maintain distinction for Most Recent/Liked
        : "300px"}; */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Re-added shadow for single column */
    gap: ${theme.spacing.sm}; /* More gap for better spacing */
  }

  /* For very small mobile devices (e.g., up to 480px wide) */
  @media (max-width: 480px) {
    padding: ${theme.spacing.xs}; /* Adjusted to theme spacing */
    /* height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "360px" // Adjust for very small screens, maintaining distinction
        : "280px"}; */
    box-shadow: none; /* Optional: remove shadow for a flat mobile feel */
  }

  /* For even smaller mobile devices (e.g., up to 360px wide) */
  @media (max-width: 360px) {
    /* height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "340px" // Adjust for very small screens
        : "260px"}; */
  }

  .main-thumbnail {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
    /* Removed display: flex, justify-content, align-items as position absolute handles centering */
    position: relative; /* Essential for positioning the image inside */
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio (9 / 16 * 100%) */
    height: 0; /* Collapses the div's height, letting padding-bottom define it */
    background-color: ${({ theme }) =>
      theme.colors
        .footerBackground}; /* FIX: Changed to existing theme variable */

    /* Responsive adjustments for aspect ratio if needed, though 16:9 is common */
    @media (max-width: 576px) {
      padding-bottom: 75%; /* 4:3 Aspect Ratio for smaller screens */
    }
  }

  .main-thumbnail img {
    object-fit: contain; /* Ensures the entire image is visible within the container */
    position: absolute; /* Position the image to fill the parent's aspect ratio box */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* Fill the aspect-ratio defined by parent */
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    object-position: center; /* Ensures the image is centered within the space */

    /* Removed all fixed height settings as they are now controlled by the parent's aspect ratio */
  }

  .main-title {
    font-size: ${({ theme }) => theme.fontSizes.md}; /* Default font size */
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: ${({ theme }) => theme.spacing.sm} 0;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limits text to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
    height: calc(
      1.4em * 2
    ); /* Ensures two lines, adapts if font-size changes */

    /* --- Responsive Adjustments for Title Font Size --- */
    @media (max-width: 992px) {
      font-size: ${({ theme }) => theme.fontSizes.sm}; /* Slightly smaller */
    }
    @media (max-width: 768px) {
      font-size: 0.95rem; /* Specific rem value for fine control */
      margin: ${({ theme }) => theme.spacing.xs} 0; /* Reduced margin */
    }
    /* UPDATED: Title font size for single column mobile view */
    @media (max-width: 576px) {
      font-size: ${theme.fontSizes.md}; /* Keep title readable on mobile */
      -webkit-line-clamp: 2; /* Ensure 2 lines for consistency */
      height: auto; /* Let content dictate height, rely on line-clamp for truncation */
    }
    @media (max-width: 480px) {
      font-size: ${theme.fontSizes
        .sm}; /* Slightly smaller for very small phones */
    }
  }

  .main-citation-and-likes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.sm}; /* Default font size */
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: auto; /* Pushes content to the bottom of the flex container */

    /* --- Responsive Adjustments for Citation/Likes Font Size --- */
    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSizes.xs}; /* Smaller */
    }
    /* UPDATED: Citation/Likes font size for single column mobile view */
    @media (max-width: 576px) {
      font-size: ${theme.fontSizes.sm}; /* Larger for readability on mobile */
    }
    @media (max-width: 480px) {
      font-size: ${theme.fontSizes
        .xs}; /* Slightly smaller for very small phones */
    }
  }

  .main-citation {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .like-display-section {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.textSecondary};

    /* Adjust gap for smaller screens if needed */
    @media (max-width: 480px) {
      gap: ${({ theme }) => theme.spacing.xxs}; /* Smaller gap */
    }
  }

  .like-display-section .heart-icon {
    font-size: 0.9rem; /* Default font size */
    line-height: 1;

    /* Adjust icon size */
    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }

  .like-display-section .like-count {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

export default MainFeedStyled;

export const Section = styled.div`
  margin-bottom: 48px; /* Default desktop margin */

  /* --- Responsive Adjustments for Section margin --- */
  @media (max-width: 992px) {
    margin-bottom: 40px;
  }
  @media (max-width: 768px) {
    margin-bottom: 32px; /* Reduced margin for tablets */
  }
  @media (max-width: 576px) {
    margin-bottom: 24px; /* Further reduced margin for mobiles */
  }
  @media (max-width: 400px) {
    margin-bottom: 16px; /* Even smaller margin for small mobiles */
  }
`;
