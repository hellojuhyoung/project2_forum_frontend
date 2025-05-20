import clsx from "clsx";
import { FooterStyled } from "./styled";

const Footer = () => {
  return (
    <FooterStyled className={clsx("footer-container")}>
      <footer>
        <h2>this is footer</h2>
        <div>place basic company info</div>
      </footer>
    </FooterStyled>
  );
};

export default Footer;
