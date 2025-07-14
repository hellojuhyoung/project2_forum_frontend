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
  /* REMOVED: margin - Swiper handles spacing between slides */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}; /* Default gap between elements */

  /* UPDATED: Increased default height for better visual balance and content space */
  height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
    $isMostRecentSection || $isMostLikedSection ? "420px" : "320px"};
  box-sizing: border-box; /* Ensures padding and border are included in the element's total height/width */

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* --- Responsive Adjustments for MainFeedStyled (Card Container) --- */

  /* For tablets and smaller desktops (e.g., up to 992px wide) */
  @media (max-width: 992px) {
    padding: ${({ theme }) => theme.spacing.sm}; /* Slightly less padding */
    /* margin handled by Swiper */
    height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "380px"
        : "300px"}; /* Reduced card height, but still taller for recent/liked */
    gap: ${({ theme }) => theme.spacing.xs}; /* Slightly less gap inside */
  }

  /* For larger mobile devices and smaller tablets (e.g., up to 768px wide) */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs}; /* Further reduced padding */
    /* margin handled by Swiper */
    height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "350px"
        : "280px"}; /* Further reduced card height, maintaining recent/liked difference */
    gap: ${({ theme }) => theme.spacing.xxs}; /* Minimal gap inside */
    border-radius: ${({ theme }) =>
      theme.borderRadius.sm}; /* Slightly smaller border-radius */
  }

  /* For small mobile devices (e.g., up to 480px wide) */
  @media (max-width: 480px) {
    padding: ${theme.spacing.xs}; /* Adjusted to theme spacing */
    /* margin handled by Swiper */
    height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "320px"
        : "260px"}; /* Even more reduced card height, ensuring images are prominent */
    box-shadow: none; /* Optional: remove shadow for a flat mobile feel */
  }

  /* For very small mobile devices (e.g., up to 360px wide) */
  @media (max-width: 360px) {
    height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "300px"
        : "240px"}; /* Adjust for very small screens */
  }

  .main-thumbnail {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
  }

  .main-thumbnail img {
    object-fit: cover; /* CHANGED: Use 'cover' to fill the area, reducing whitespace */
    width: 100%;
    /* UPDATED: Increased image height to take up more space within the card */
    height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection ? "260px" : "180px"};
    border-radius: ${({ theme }) => theme.borderRadius.sm};

    /* --- Responsive Adjustments for Image Height --- */
    @media (max-width: 992px) {
      height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
        $isMostRecentSection || $isMostLikedSection
          ? "220px"
          : "160px"}; /* Reduced height for tablets */
    }
    @media (max-width: 768px) {
      height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
        $isMostRecentSection || $isMostLikedSection
          ? "190px"
          : "140px"}; /* Further reduced height for mobiles */
    }
    @media (max-width: 480px) {
      height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
        $isMostRecentSection || $isMostLikedSection
          ? "160px"
          : "110px"}; /* Even more reduced height for small mobiles, but still prominent */
    }
    @media (max-width: 360px) {
      height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
        $isMostRecentSection || $isMostLikedSection
          ? "140px"
          : "90px"}; /* Adjust for very small screens */
    }
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
    @media (max-width: 480px) {
      font-size: 0.9rem; /* Even smaller */
      -webkit-line-clamp: 3; /* Allow more lines if title is long on small screens */
      height: auto; /* Let content dictate height, rely on line-clamp for truncation */
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
    @media (max-width: 480px) {
      font-size: 0.75rem; /* Even smaller */
    }
  }

  .main-citation {
    /* Font size inherited from .main-citation-and-likes for responsiveness */
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .like-display-section {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    /* Font size inherited from .main-citation-and-likes for responsiveness */
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
