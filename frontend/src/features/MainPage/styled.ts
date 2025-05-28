import styled from "styled-components";
import { theme } from "@/styles/theme";

export const MainStyled = styled.div``;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto; /* Center align */
  padding: 0 16px; /* Add side padding for screens smaller than max-width */
  display: flex;
  flex-direction: column;
  gap: 40px; /* Space between sections */
`;

export const MostRecentFeed = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
`;

export const MainFeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
  gap: 16px;
`;

export const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0 auto;

  .page-number {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    margin: 0 6px;
    user-select: none;
    font-size: 16px;
  }

  .page-number:hover {
    text-decoration: underline;
    color: #0070f3;
  }

  .page-number.active {
    font-weight: bold;
    color: #0070f3;
  }

  .arrow {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    padding: 0 8px;
    color: inherit;
    user-select: none;
  }

  .arrow:hover {
    text-decoration: underline;
    color: #0070f3;
  }

  .arrow:disabled {
    cursor: default;
    color: grey;
    text-decoration: none;
  }
`;

export const Section = styled.div`
  margin-bottom: 48px;
`;

export const SectionHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: ${({ theme }) => theme.spacing.lg} 0
    ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;
