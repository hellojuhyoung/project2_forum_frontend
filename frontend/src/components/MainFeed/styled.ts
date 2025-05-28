import styled from "styled-components";

// isMostRecentSection is changed to $isMostRecentSection
// MainFeedStyled is created using styled.div, which means it ultimately
// renders a native HTML 'div' element. HTML 'div' elements do not have a standard
// attribute called 'isMostRecentSection'. when React sees a prop being passed to a native
// DOM element that isn't a standard HTML attribute (like 'className', 'id', 'src', ...)
// it warns you because it might be unintended or could lead to invalid HTML.

const MainFeedStyled = styled.div<{ $isMostRecentSection?: boolean }>`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 16px;
  margin: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: ${({ $isMostRecentSection }) =>
    $isMostRecentSection ? "380px" : "300px"};

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .main-thumbnail {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  .main-thumbnail img {
    object-fit: contain;
    width: 100%;
    height: ${({ $isMostRecentSection }) =>
      $isMostRecentSection ? "220px" : "160px"};
    border-radius: 6px;
  }

  .main-title {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: bold;
    margin: 12px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
    height: calc(1.4em * 2); /* Make space for exactly 2 lines */
  }

  .main-citation-and-likes {
    display: flex; /* Make it a flex container */
    justify-content: space-between; /* Push citation to left, likes to right */
    align-items: center; /* Vertically align items */
    font-size: 13px;
    color: #777;
    margin-top: auto; /* Pushes this section to the bottom of the card */
  }

  .main-citation {
    font-size: 13px;
    color: #777;
  }

  .like-display-section {
    display: flex;
    align-items: center;
    gap: 4px; /* Slightly reduced gap for a more compact look */
    font-size: 12px; /* Match font size with main-citation for alignment */
    color: #777; /* Match color with main-citation */
  }

  .like-display-section .heart-icon {
    font-size: 0.9rem; /* Smaller heart icon size */
    line-height: 1; /* Helps with vertical alignment */
  }

  .like-display-section .like-count {
    font-weight: 500;
  }
`;

export default MainFeedStyled;

export const Section = styled.div`
  margin-bottom: 48px;
`;
