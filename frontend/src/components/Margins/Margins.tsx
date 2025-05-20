// import preset header and footer components and combine them into margins
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// styling attributes
import { MarginsStyled } from "./styled";
import clsx from "clsx";

import { useRouter } from "next/router";

// aquire token from redux store
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Margins = (props: { children: React.ReactNode }) => {
  const router = useRouter();
  // declare the urls in the noMargins array to specify
  // which routes you want to exclude having margins
  const noMargins = ["/auth/signup"];
  // with the built-in function 'includes' to find that url
  // and check with 'pathname'
  const hiddenMargins = noMargins.includes(router.pathname);

  const authentication = useSelector(
    (state: RootState) => state.authentication
  );
  const token = authentication.token;

  // with the '&&' signs for both header and footer to decide
  // whether to render the margins or not
  return (
    <MarginsStyled className={clsx("margins-container")}>
      <div>
        {!hiddenMargins && <Header isLoggedIn={!!token} />}
        <main>{props.children}</main>
        {!hiddenMargins && <Footer />}
      </div>
    </MarginsStyled>
  );
};

export default Margins;
