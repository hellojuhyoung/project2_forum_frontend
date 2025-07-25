// frontend/src/features/MainPage/styled.ts
import styled from "styled-components";
import { theme } from "@/styles/theme";

export const MainStyled = styled.div`
  min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
  padding-top: ${theme.spacing
    .xl}; /* Increased padding top for more breathing room */
  padding-bottom: ${theme.spacing.xl}; /* Increased padding bottom */
  background-color: ${theme.colors.backgroundLight}; /* A subtle background */

  @media (max-width: 768px) {
    padding-top: ${theme.spacing.lg};
    padding-bottom: ${theme.spacing.lg};
  }

  @media (max-width: 576px) {
    padding-top: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
  }
`;

export const Container = styled.div`
  max-width: 1400px; /* Increased max-width for more content on larger screens */
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg}; /* Adjusted padding */
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing
    .xl}; /* Increased gap between sections for better separation */

  @media (max-width: 1440px) {
    max-width: 1200px; /* Standardize max-width for common large screens */
  }

  @media (max-width: 992px) {
    padding: 0 ${theme.spacing.md};
    gap: ${theme.spacing.lg};
  }

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }

  @media (max-width: 576px) {
    padding: 0 ${theme.spacing.sm};
    gap: ${theme.spacing.md};
  }
`;

export const MostRecentFeed = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding-bottom: ${theme.spacing
    .sm}; /* Reduced padding to make scrollbar less intrusive */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }

  /* REMOVED: The fixed width and margin-right on children.
     Swiper will now manage the slide widths via its own configuration. */
`;

export const MostLikedFeed = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding-bottom: ${theme.spacing.sm}; /* Reduced padding */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }

  /* REMOVED: The fixed width and margin-right on children.
     Swiper will now manage the slide widths via its own configuration. */
`;

export const MainFeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.md}; /* Consistent gap */
  grid-auto-rows: 1fr;
  align-items: stretch;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* 3 columns for slightly smaller desktops */
    gap: ${theme.spacing.md};
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets */
    gap: ${theme.spacing.sm};
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr; /* Single column for mobile */
    gap: ${theme.spacing.sm};
  }
`;

export const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing.xl} auto ${theme.spacing.md} auto; /* Adjusted margin */
  flex-wrap: wrap;
  padding: 0 ${theme.spacing.sm};

  .page-number {
    cursor: pointer;
    color: ${theme.colors.textSecondary}; /* Default color */
    text-decoration: none;
    margin: 0 ${theme.spacing.xs}; /* Smaller margin for numbers */
    user-select: none;
    font-size: ${theme.fontSizes.md}; /* Base font size */
    padding: ${theme.spacing.xxs} ${theme.spacing.xs}; /* Added padding for better click area */
    border-radius: ${theme.borderRadius.sm}; /* Slightly rounded corners */
    transition: all 0.2s ease-in-out; /* Smooth transition */

    @media (max-width: 576px) {
      font-size: ${theme.fontSizes.sm};
      margin: 0 ${theme.spacing.xxs};
      padding: ${theme.spacing.xxs} ${theme.spacing.xs};
    }
  }

  .page-number:hover {
    background-color: ${theme.colors.primaryHover}; /* Highlight on hover */
    color: ${theme.colors.backgroundLight}; /* White text on hover */
    text-decoration: none; /* No underline on hover */
  }

  .page-number.active {
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.background}; /* White text for active */
    background-color: ${theme.colors.primary}; /* Primary color for active */
    pointer-events: none; /* Disable click on active page */
  }

  .arrow {
    background: none;
    border: 1px solid ${theme.colors.borderColor}; /* Subtle border */
    border-radius: ${theme.borderRadius.sm};
    cursor: pointer;
    font-size: ${theme.fontSizes.lg};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    color: ${theme.colors.text};
    user-select: none;
    transition: all 0.2s ease-in-out;

    @media (max-width: 576px) {
      font-size: ${theme.fontSizes.md};
      padding: ${theme.spacing.xs};
    }
  }

  .arrow:hover {
    background-color: ${theme.colors.buttonDefaultHover};
    color: ${theme.colors.primary};
    text-decoration: none;
  }

  .arrow:disabled {
    cursor: not-allowed;
    color: ${theme.colors.disabledText};
    border-color: ${theme.colors.disabledBorder};
    background-color: ${theme.colors.disabledBackground};
    text-decoration: none;
  }
`;

export const Section = styled.div`
  margin-bottom: ${theme.spacing.xl}; /* Increased margin between sections */

  @media (max-width: 768px) {
    margin-bottom: ${theme.spacing.lg};
  }

  @media (max-width: 576px) {
    margin-bottom: ${theme.spacing.md};
  }
`;

// Renamed from SectionHeader to avoid conflict and make it a component
export const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl}; /* Larger heading */
  font-weight: ${theme.fontWeights.bold};
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md}; /* Adjusted top/bottom margin */
  color: ${theme.colors.textPrimary}; /* Darker text for headings */
  border-bottom: 2px solid ${theme.colors.borderColor}; /* Subtle underline */
  padding-bottom: ${theme.spacing.sm}; /* Padding for the underline */
  display: inline-block; /* To make border-bottom wrap content */
  line-height: 1.2; /* Adjust line height for better spacing */

  @media (max-width: 992px) {
    font-size: ${theme.fontSizes.lg};
    margin: ${theme.spacing.md} 0 ${theme.spacing.sm};
    padding-bottom: ${theme.spacing.xs};
  }

  @media (max-width: 576px) {
    font-size: ${theme.fontSizes.md};
    margin: ${theme.spacing.sm} 0 ${theme.spacing.xs};
    padding-bottom: ${theme.spacing.xxs};
  }
`;
