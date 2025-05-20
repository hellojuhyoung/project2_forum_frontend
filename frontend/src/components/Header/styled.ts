import { styled } from "styled-components";

export const HeaderStyled = styled.div`
  &.header-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: gray;

    .header {
      display: flex;
      max-width: 1280px;
      height: 100%;
      margin: 0 auto;
      align-items: center;
      justify-content: space-between;
    }

    .navigation-bar {
      ul {
        display: flex;
        list-style: none;
      }

      /* having li + li would only affect the ones without the first 'li' tag */
      /* styles are affected which are preceded by another 'li' tag */
      li + li {
        margin-left: 50px;
      }
    }
  }
`;
