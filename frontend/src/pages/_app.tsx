import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor, RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/redux";
import { PersistGate } from "redux-persist/integration/react";
import { instance } from "@/utils/apis/axios";
import Margins from "@/components/Margins/Margins";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "../i18n";
import { useRouter } from "next/router";
import Head from "next/head";

// no need to add the i18n tag in the rendering section
// the file itself i18n.ts hooks i18next into React's
// context system when the i18n.init() method is called

function AppInitializer() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const authentication = useSelector(
  //   (state: RootState) => state.authentication
  // );
  // const id = authentication.id;
  // const username = authentication.username;

  const token = useSelector((state: RootState) => state.authentication.token);

  useEffect(() => {
    console.log("AppInitializer mounted");

    // const token = getCookie("token") as string | undefined;

    //   console.log("Token from cookie on refresh:", token);

    //   if (token) {
    //     (async () => {
    //       try {
    //         const response: any = await instance.get("/auth/profile", {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });

    //         console.log("Profile response:", response);

    //         dispatch(
    //           setUser({
    //             id: response.id,
    //             username: response.username,
    //             token: token,
    //           })
    //         );
    //       } catch (error) {
    //         console.error("error in _app file app initializer", error);
    //       }
    //     })();
    //   }
    // }, [dispatch, router]);

    (async () => {
      try {
        // 1. Login again using stored creds
        // const loginResponse: any = await instance.post(
        //   "/auth/login",
        //   { username, password },
        //   { withCredentials: true }
        // );

        // const token = loginResponse.token;

        // 2. Use token to fetch profile
        const profileResponse: any = await instance.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile response:", profileResponse);

        // 3. Dispatch to Redux
        dispatch(
          setUser({
            id: profileResponse.user.id,
            username: profileResponse.user.username,
            token: profileResponse.token,
          })
        );
      } catch (error) {
        console.error("Error in AppInitializer:", error);
      }
    })();
  }, [dispatch, router]);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer />
        <ThemeProvider theme={theme}>
          <Margins>
            <Head>
              <title>JL Forum</title>
            </Head>
            <Component {...pageProps} />
          </Margins>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
