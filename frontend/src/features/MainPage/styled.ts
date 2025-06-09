import styled from "styled-components";
import { theme } from "@/styles/theme";

export const MainStyled = styled.div`
  min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
  padding-top: 20px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    padding-top: 15px;
    padding-bottom: 15px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 992px) {
    padding: 0 20px;
    gap: 30px;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    gap: 25px;
  }

  @media (max-width: 576px) {
    padding: 0 10px;
    gap: 20px;
  }
`;

export const MostRecentFeed = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 10px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MostLikedFeed = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 10px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MainFeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0 auto;
  flex-wrap: wrap;
  padding: 0 10px;

  .page-number {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    margin: 0 6px;
    user-select: none;
    font-size: 16px;

    @media (max-width: 576px) {
      font-size: 14px;
      margin: 0 4px;
    }
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

    @media (max-width: 576px) {
      font-size: 16px;
      padding: 0 5px;
    }
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

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 576px) {
    margin-bottom: 20px;
  }
`;

export const SectionHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: ${({ theme }) => theme.spacing.lg} 0
    ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 992px) {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin: ${({ theme }) => theme.spacing.md} 0
      ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 576px) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin: ${({ theme }) => theme.spacing.sm} 0
      ${({ theme }) => theme.spacing.xs};
  }
`;
