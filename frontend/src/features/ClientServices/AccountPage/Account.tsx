import { AccountStyled } from "./styled";
import clsx from "clsx";

const AccountPage = () => {
  return (
    <>
      <AccountStyled className={clsx("account-container")}>
        hello world
      </AccountStyled>
    </>
  );
};

export default AccountPage;
