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

export default function LoginPage() {
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

      dispatch(
        setUser({
          id: response.id,
          username: response.username,
          token: cookieToken,
        })
      );

      notification.success({
        message: "Login Successful",
        description: "You have been successfully authenticated.",
        placement: "topRight",
      });
      router.push("/");
    } catch (error) {
      console.error("login error", error);
    }
  };

  const handleLogout = async () => {
    deleteCookie("token");
    dispatch(setUser({ id: null, username: null, token: null }));
    notification.info({
      message: "Logout Successful",
      description: "You have been successfully logged out.",
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
              Logout
            </button>
          ) : (
            <form onSubmit={handleLogin}>
              <Input
                type="text"
                placeholder="username"
                className="input-username"
                onChange={(event) => setUsername(event.target.value)}
              />
              <Input.Password
                placeholder="password"
                className="input-password"
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button type="submit" className="button-login">
                Login
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
                  Forgot Username?
                </Link>
                {/* Forgot Password (Right Side) */}
                <Link
                  href="/auth/forgot/password"
                  className="auth-utility-link"
                >
                  Forgot password?
                </Link>
              </div>
            </>
          )}
        </div>
      </LoginStyled>
    </>
  );
}
