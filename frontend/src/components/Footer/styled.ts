import { styled } from "styled-components";

export const FooterStyled = styled.div`
  &.footer-container {
    width: 100%;
    height: 100px;
    background-color: ${({ theme }) => theme.colors.footerBackground};
    color: ${({ theme }) => theme.colors.textLight};

    footer {
      max-width: 1280px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;
