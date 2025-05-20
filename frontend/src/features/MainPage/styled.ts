import styled from "styled-components";

export const MainStyled = styled.div`
  &.main-container {
    display: flex;
    justify-content: space-evenly;
  }

  .main-feed {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columns */
    gap: 16px;
  }
`;
