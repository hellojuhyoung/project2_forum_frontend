import { styled } from "styled-components";

export const HeaderStyled = styled.div`
  &.header-container {
    width: 100%;
    height: 80px;
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.textLight};

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
        padding: 0;
        margin: 0;
      }

      li + li {
        margin-left: 50px;
      }
    }
  }
`;
