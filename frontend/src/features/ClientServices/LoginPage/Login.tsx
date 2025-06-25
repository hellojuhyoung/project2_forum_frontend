import { LoginStyled } from "./styled";
import clsx from "clsx";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

// react and next built-in functions
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// styling libraries
import { Input, notification } from "antd";

// social login buttons
import SocialLoginButtons from "./SocialLoginButtons";

import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/redux";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const LoginPage: React.FC = () => {
  // this is for rendering different .json file from
  // /public/locales/ either /ko or /en depending on the language option
  const { t } = useTranslation("ClientServices.login");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // in this cause of using useState 'react' hook... would need to customize
  // the data type... would need to declare the data type of token
  // the data type of token which is stored in 'cookie' is cookievaluetypes
  const [token, setToken] = useState<CookieValueTypes | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("token");
    setToken(token);
  }, []);

  // must add withCredentials to be true when sending the
  // axios request... this is to secure the token transfer
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log("Calling /auth/profile");

      const response: any = await instance.post(
        "/auth/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );

      const cookieToken = getCookie("token");
      setToken(cookieToken);

      console.log("DISPATCHING", response);

      dispatch(
        setUser({
          id: response.id,
          username: response.username,
          token: cookieToken,
        })
      );

      notification.success({
        message: t("login_success_message"),
        description: t("login_success_description"),
        placement: "topRight",
      });
      router.push("/");
    } catch (error: any) {
      console.error("login error", error);

      notification.error({
        message: t("login_error_message"),
        description:
          error.response && error.response && error.response.message
            ? error.response.message
            : t("login_error_description_generic"),
        placement: "topRight",
      });
    }
  };

  const handleLogout = async () => {
    deleteCookie("token");
    dispatch(setUser({ id: null, username: null, token: null }));
    notification.info({
      message: t("logout_success_message"),
      description: t("logout_success_description"),
      placement: "topRight",
    });
    router.push("/");
  };

  const handleKeyDown = (enter: React.KeyboardEvent<HTMLInputElement>) => {
    if (enter.key === "Enter" && !token) {
      handleLogin(enter as any);
    }
  };

  return (
    <>
      <LoginStyled className={clsx("login-container")}>
        <div className="input-container">
          {token ? (
            <button className="button-logout" onClick={handleLogout}>
              {t("logout_button")}
            </button>
          ) : (
            <form onSubmit={handleLogin}>
              <Input
                type="text"
                placeholder={t("username_placeholder")}
                className="input-username"
                onChange={(event) => setUsername(event.target.value)}
              />
              <Input.Password
                placeholder={t("password_placeholder")}
                className="input-password"
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button type="submit" className="button-login">
                {t("login_button")}
              </button>
            </form>
          )}

          {!token && (
            <>
              <SocialLoginButtons />
              <div className="recovery-links-container">
                {/* Forgot Username (Left Side) */}
                <Link
                  href="/auth/forgot/username"
                  className="auth-utility-link"
                >
                  {t("forgot_username_link")}
                </Link>
                {/* Forgot Password (Right Side) */}
                <Link
                  href="/auth/forgot/password"
                  className="auth-utility-link"
                >
                  {t("forgot_password_link")}
                </Link>
              </div>
            </>
          )}
        </div>
      </LoginStyled>
    </>
  );
};

export default LoginPage;
