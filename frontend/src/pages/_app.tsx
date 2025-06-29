// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import { store, persistor, RootState } from "@/redux/store";
// import { getCookie } from "cookies-next";
// import { useEffect, useState } from "react";
// import { setUser } from "@/redux/redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { instance } from "@/utils/apis/axios";
// import Margins from "@/components/Margins/Margins";
// import { ThemeProvider } from "styled-components";
// import { theme } from "@/styles/theme";
// import "../i18n";
// import { useRouter } from "next/router";
// import Head from "next/head";

// // no need to add the i18n tag in the rendering section
// // the file itself i18n.ts hooks i18next into React's
// // context system when the i18n.init() method is called

// function AppInitializer() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   // const authentication = useSelector(
//   //   (state: RootState) => state.authentication
//   // );
//   // const id = authentication.id;
//   // const username = authentication.username;

//   const token = useSelector((state: RootState) => state.authentication.token);

//   useEffect(() => {
//     console.log("AppInitializer mounted");

//     // const token = getCookie("token") as string | undefined;

//     //   console.log("Token from cookie on refresh:", token);

//     //   if (token) {
//     //     (async () => {
//     //       try {
//     //         const response: any = await instance.get("/auth/profile", {
//     //           headers: {
//     //             Authorization: `Bearer ${token}`,
//     //           },
//     //         });

//     //         console.log("Profile response:", response);

//     //         dispatch(
//     //           setUser({
//     //             id: response.id,
//     //             username: response.username,
//     //             token: token,
//     //           })
//     //         );
//     //       } catch (error) {
//     //         console.error("error in _app file app initializer", error);
//     //       }
//     //     })();
//     //   }
//     // }, [dispatch, router]);

//     (async () => {
//       try {
//         // 1. Login again using stored creds
//         // const loginResponse: any = await instance.post(
//         //   "/auth/login",
//         //   { username, password },
//         //   { withCredentials: true }
//         // );

//         // const token = loginResponse.token;

//         // 2. Use token to fetch profile
//         const profileResponse: any = await instance.get("/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Profile response:", profileResponse);

//         // 3. Dispatch to Redux
//         dispatch(
//           setUser({
//             id: profileResponse.user.id,
//             username: profileResponse.user.username,
//             token: profileResponse.token,
//           })
//         );
//       } catch (error) {
//         console.error("Error in AppInitializer:", error);
//       }
//     })();
//   }, [dispatch, router]);

//   return null;
// }

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <AppInitializer />
//         <ThemeProvider theme={theme}>
//           <Margins>
//             <Head>
//               <title>JL Forum</title>
//             </Head>
//             <Component {...pageProps} />
//           </Margins>
//         </ThemeProvider>
//       </PersistGate>
//     </Provider>
//   );
// }
//
//
//
//
// updated _app.tsx due to infinite loop upon updating the profile

// pages/_app.tsx
// pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor, RootState } from "@/redux/store";
import { useEffect, useState, useRef, useCallback } from "react";
import { setUser } from "@/redux/redux";
import { PersistGate } from "redux-persist/integration/react";
import { instance } from "@/utils/apis/axios";
import Margins from "@/components/Margins/Margins";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "../i18n";
import { useRouter } from "next/router";
import Head from "next/head";
import { AxiosError } from "axios";

function AppInitializer({ onReady }: { onReady: () => void }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentToken = useSelector(
    (state: RootState) => state.authentication.token
  );
  const loggedInUserId = useSelector(
    (state: RootState) => state.authentication.id
  );

  const initialAuthCheckPerformed = useRef(false);

  const memoizedOnReady = useCallback(() => {
    if (!initialAuthCheckPerformed.current) {
      initialAuthCheckPerformed.current = true;
      onReady();
    }
  }, [onReady]);

  useEffect(() => {
    if (initialAuthCheckPerformed.current) {
      return;
    }

    console.log("AppInitializer useEffect triggered.");
    console.log("Token from Redux store in AppInitializer:", currentToken);
    console.log("User ID from Redux store in AppInitializer:", loggedInUserId);

    const performAuthCheck = async () => {
      try {
        if (currentToken && loggedInUserId) {
          console.log(
            "Token and User ID present in Redux. Attempting profile fetch/verification."
          );
          try {
            const profileResponse: any = await instance.get("/auth/profile", {
              headers: { Authorization: `Bearer ${currentToken}` },
              withCredentials: true,
            });
            console.log(
              "Profile verification successful:",
              profileResponse.data
            );

            dispatch(
              setUser({
                id: profileResponse.data?.id,
                username: profileResponse.data?.username,
                token: currentToken,
              })
            );
            memoizedOnReady();
          } catch (error: any) {
            console.error("Error verifying token or fetching profile:", error);
            const axiosError = error as AxiosError;

            if (axiosError.response) {
              console.warn(
                "Axios error response status during profile verification:",
                axiosError.response.status
              );
              if (
                axiosError.response.status === 401 ||
                axiosError.response.status === 403
              ) {
                console.warn(
                  "Token invalid/expired during verification (401/403). Clearing user data and redirecting."
                );
                dispatch(setUser({ id: null, username: null, token: null }));
                // CORRECTED: Redirect to your actual login page
                if (
                  router.pathname !== "/auth/login" &&
                  router.pathname !== "/users/signup" &&
                  router.pathname !== "/"
                ) {
                  router.replace("/auth/login");
                }
              } else {
                console.error(
                  "Non-authentication related HTTP error during profile fetch:",
                  axiosError.response.status
                );
                dispatch(setUser({ id: null, username: null, token: null }));
                // CORRECTED: Redirect to your actual login page
                if (
                  router.pathname !== "/auth/login" &&
                  router.pathname !== "/users/signup" &&
                  router.pathname !== "/"
                ) {
                  router.replace("/auth/login");
                }
              }
            } else if (axiosError.request) {
              console.error(
                "Network error: Request made but no response received.",
                axiosError.message
              );
              dispatch(setUser({ id: null, username: null, token: null }));
              // CORRECTED: Redirect to your actual login page, with network error flag
              if (
                router.pathname !== "/auth/login" &&
                router.pathname !== "/users/signup" &&
                router.pathname !== "/"
              ) {
                router.replace("/auth/login?error=network");
              }
            } else {
              console.error("Error setting up request:", axiosError.message);
              dispatch(setUser({ id: null, username: null, token: null }));
              // CORRECTED: Redirect to your actual login page
              router.replace("/auth/login");
            }
            memoizedOnReady();
          }
        } else {
          console.log("No token in Redux. User needs to login.");
          // CORRECTED: Check against your actual public pages
          if (
            router.pathname !== "/auth/login" &&
            router.pathname !== "/users/signup" &&
            router.pathname !== "/"
          ) {
            console.log(
              "Redirecting to login page as no authentication state found."
            );
            dispatch(setUser({ id: null, username: null, token: null }));
            router.replace("/auth/login");
          }
          memoizedOnReady();
        }
      } catch (overallError) {
        console.error(
          "Critical unexpected error in AppInitializer:",
          overallError
        );
        dispatch(setUser({ id: null, username: null, token: null }));
        // CORRECTED: Redirect to your actual login page
        router.replace("/auth/login");
        memoizedOnReady();
      }
    };

    performAuthCheck();
  }, [dispatch, router, currentToken, loggedInUserId, memoizedOnReady]);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const handleAppReady = useCallback(() => {
    console.log(
      "App Initialization complete: Redux rehydration and auth check done."
    );
    setIsAppInitialized(true);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer onReady={handleAppReady} />

        {isAppInitialized ? (
          <ThemeProvider theme={theme}>
            <Margins>
              <Head>
                <title>JL Forum</title>
              </Head>
              <Component {...pageProps} />
            </Margins>
          </ThemeProvider>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <p>Loading application...</p>
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3498db",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <style jsx>{`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </div>
        )}
      </PersistGate>
    </Provider>
  );
}
