import styled from "styled-components";

export const MainStyled = styled.div`
  &.main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .most-recent-feed {
    display: flex;
    overflow-x: hidden;
    width: 100%;
  }
  .main-feed {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columns */
    gap: 16px;
  }
`;
