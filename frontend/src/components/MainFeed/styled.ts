import styled from "styled-components";

// isMostRecentSection is changed to $isMostRecentSection
// MainFeedStyled is created using styled.div, which means it ultimately
// renders a native HTML 'div' element. HTML 'div' elements do not have a standard
// attribute called 'isMostRecentSection'. when React sees a prop being passed to a native
// DOM element that isn't a standard HTML attribute (like 'className', 'id', 'src', ...)
// it warns you because it might be unintended or could lead to invalid HTML.

export const MainFeedStyled = styled.div<{
  $isMostRecentSection?: boolean;
  $isMostLikedSection?: boolean;
}>`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
    $isMostRecentSection || $isMostLikedSection ? "380px" : "300px"};

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .main-thumbnail {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
  }

  .main-thumbnail img {
    object-fit: contain;
    width: 100%;
    height: ${({ $isMostRecentSection, $isMostLikedSection }) =>
      $isMostRecentSection || $isMostLikedSection ? "220px" : "160px"};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
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
    height: calc(1.4em * 2);
  }

  .main-citation-and-likes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: auto;
  }

  .main-citation {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .like-display-section {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .like-display-section .heart-icon {
    font-size: 0.9rem;
    line-height: 1;
  }

  .like-display-section .like-count {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

export default MainFeedStyled;

export const Section = styled.div`
  margin-bottom: 48px;
`;
