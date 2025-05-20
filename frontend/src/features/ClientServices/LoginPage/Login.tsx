import { LoginStyled } from "./styled";
import clsx from "clsx";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

// react and next built-in functions
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// styling libraries
import { Input, notification } from "antd";

import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/redux";

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
  const handleLogin = async () => {
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
        message: "you are logged in",
      });
      router.push("/");
    } catch (error) {
      console.error("login error", error);
    }
  };

  const handleLogout = async () => {
    const token = deleteCookie("token");
    router.push("/");
    return token;
  };

  const handleKeyDown = (enter: any) => {
    if (enter.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      <LoginStyled className={clsx("login-container")}>
        <div className="input-container">
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
            // if the client presses the 'enter' key login is activated
            onKeyDown={(keydown) => handleKeyDown(keydown)}
          />
          {token ? (
            <button className="button-logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="button-login" onClick={handleLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </LoginStyled>
    </>
  );
}
