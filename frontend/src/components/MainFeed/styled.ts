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

  /* REMOVED ALL FIXED HEIGHTS from MainFeedStyled - let content dictate height */
  height: auto; /* Default to auto height */
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* --- Responsive Adjustments for MainFeedStyled (Card Container) --- */

  /* Default padding for larger screens */
  @media (max-width: 1400px) {
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.sm};
  }

  /* Adjustments for 3-column layout */
  @media (max-width: 1200px) {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }

  /* Adjustments for 2-column layout (tablets) */
  @media (max-width: 992px) {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }

  /* Adjustments for 1-column layout (mobile) */
  @media (max-width: 576px) {
    /* Reintroduce fixed height for 1-column view for consistency */
    height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "380px" // Consistent height for Most Recent/Liked on mobile
        : "300px"}; // Consistent height for Main Feed on mobile
    padding: ${theme.spacing
      .md}; /* More comfortable padding for single column */
    gap: ${theme.spacing.sm};
  }

  /* Adjustments for very small mobile devices */
  @media (max-width: 480px) {
    height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "360px" // Adjust for very small screens, maintaining distinction
        : "280px"}; /* Adjusted for very small screens */
    padding: ${theme.spacing.sm};
  }

  .main-thumbnail {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
    position: relative;
    height: 0; /* Collapses height */

    /* Aspect ratio for images based on card type */
    padding-bottom: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection
        ? "66.66%" /* 3:2 Aspect Ratio for Most Recent/Liked */
        : "56.25%"}; /* 16:9 Aspect Ratio for Main Feed */

    background-color: ${({ theme }) =>
      theme.colors
        .accentBackground}; /* Subtle background for any rare whitespace */

    /* Responsive adjustments for aspect ratio */
    @media (max-width: 576px) {
      padding-bottom: 60%; /* Slightly taller aspect ratio for mobile images (e.g., 5:3) */
    }
  }

  .main-thumbnail img {
    object-fit: cover; /* Fills the container, may crop image */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    object-position: center;
  }

  .main-title {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: ${({ theme }) => theme.spacing.sm} 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
    height: calc(1.4em * 2); /* Fixed height for 2 lines */

    /* Adjustments for title font size and line clamp */
    @media (max-width: 1200px) {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
    @media (max-width: 992px) {
      font-size: 0.95rem;
      margin: ${({ theme }) => theme.spacing.xs} 0;
    }
    @media (max-width: 576px) {
      font-size: ${theme.fontSizes
        .lg}; /* Larger title for mobile readability */
      -webkit-line-clamp: 3; /* Allow more lines for title on mobile */
      height: auto; /* Let content dictate height, rely on line-clamp for truncation */
    }
    @media (max-width: 480px) {
      font-size: ${theme.fontSizes.md};
    }
  }

  .main-citation-and-likes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: auto;

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
    @media (max-width: 576px) {
      font-size: ${theme.fontSizes.sm};
    }
    @media (max-width: 480px) {
      font-size: ${theme.fontSizes.xs};
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

    @media (max-width: 480px) {
      gap: ${({ theme }) => theme.spacing.xxs};
    }
  }

  .like-display-section .heart-icon {
    font-size: 0.9rem;
    line-height: 1;

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }

  .like-display-section .like-count {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

export const Section = styled.div`
  margin-bottom: 48px;

  @media (max-width: 992px) {
    margin-bottom: 40px;
  }
  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
  @media (max-width: 576px) {
    margin-bottom: 24px;
  }
  @media (max-width: 400px) {
    margin-bottom: 16px;
  }
`;
