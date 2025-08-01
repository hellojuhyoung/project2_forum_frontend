// frontend/src/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor, RootState } from "@/redux/store";
import { useEffect, useState, useRef, useCallback } from "react";
import { setUser, clearUser } from "@/redux/redux";
import { PersistGate } from "redux-persist/integration/react";
import { instance } from "@/utils/apis/axios";
import Margins from "@/components/Margins/Margins";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "../i18n";
import { useRouter } from "next/router";
import Head from "next/head";
import { AxiosError } from "axios";

function AppInitializer({
  onReady,
  persistorReady,
}: {
  onReady: () => void;
  persistorReady: boolean;
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentTokenFromRedux = useSelector(
    (state: RootState) => state.authentication.token
  );
  const loggedInUserIdFromRedux = useSelector(
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
    if (!persistorReady || initialAuthCheckPerformed.current) {
      console.log(
        `AppInitializer useEffect skipped. persistorReady: ${persistorReady}, initialAuthCheckPerformed: ${initialAuthCheckPerformed.current}`
      );
      return;
    }

    console.log("AppInitializer useEffect triggered after persistorReady.");
    console.log(
      "Token from Redux store (after persist):",
      currentTokenFromRedux
    );
    console.log(
      "User ID from Redux store (after persist):",
      loggedInUserIdFromRedux
    );

    // --- IMPORTANT: Define public paths here ---
    const publicPaths = [
      "/auth/login",
      "/users/signup", // Note: Your code uses '/users/signup', ensure this is correct
      "/auth/forgot/password",
      "/auth/reset/password", // <--- THIS IS THE CRUCIAL ADDITION!
      "/", // Assuming your homepage might be public as well
    ];

    const isPublicPath = publicPaths.includes(router.pathname);

    const performAuthCheck = async () => {
      if (currentTokenFromRedux && loggedInUserIdFromRedux) {
        console.log(
          "Token and User ID present in Redux. Attempting profile fetch/verification."
        );
        try {
          const profileResponse: any = await instance.get("/auth/profile");

          console.log(
            "Full profileResponse object (custom instance):",
            profileResponse
          );
          console.log(
            "profileResponse.status (custom instance):",
            profileResponse.status
          );
          console.log(
            "profileResponse.headers (custom instance):",
            profileResponse.headers
          );
          console.log(
            "Profile verification successful (profileResponse.data, custom instance):",
            profileResponse.data
          );

          const id = profileResponse?.user?.id;
          const username = profileResponse?.user?.username;
          const token = profileResponse?.token;

          console.log("Dispatching setUser with:");
          console.log("  id:", id);
          console.log("  username:", username);
          console.log(
            "  token:",
            token
              ? "Token present (not null/undefined)"
              : "Token missing (null/undefined)"
          );

          dispatch(
            setUser({
              id: id,
              username: username,
              token: token,
            })
          );
          memoizedOnReady();
        } catch (error: any) {
          console.error("Error verifying token or fetching profile:", error);
          const axiosError = error as AxiosError;

          if (
            axiosError.response &&
            (axiosError.response.status === 401 ||
              axiosError.response.status === 403)
          ) {
            console.warn(
              "Token invalid/expired during verification (401/403). Clearing user data."
            );
            dispatch(clearUser());
            // Only redirect if current path is NOT public
            if (!isPublicPath) {
              // <--- Use the isPublicPath variable here
              router.replace("/auth/login");
            }
          } else if (axiosError.request) {
            console.error(
              "Network error: Request made but no response received.",
              axiosError.message
            );
            dispatch(clearUser());
            if (!isPublicPath) {
              // <--- Use the isPublicPath variable here
              router.replace("/auth/login?error=network");
            }
          } else {
            console.error(
              "Error setting up request or unexpected error:",
              axiosError.message
            );
            dispatch(clearUser());
            if (!isPublicPath) {
              // <--- Use the isPublicPath variable here
              router.replace("/auth/login");
            }
          }
          memoizedOnReady();
        }
      } else {
        // No token found in Redux. This is the path taken for unauthenticated users.
        console.log("No token found in Redux.");
        dispatch(clearUser()); // Ensure Redux state is clear

        // --- CRITICAL: Only redirect if the current path is NOT a public path ---
        if (!isPublicPath) {
          console.log("User needs to login. Redirecting to login page.");
          router.replace("/auth/login");
        } else {
          console.log(
            "Current path is public. No redirect needed for unauthenticated user."
          );
        }
        memoizedOnReady();
      }
    };

    performAuthCheck();
  }, [
    dispatch,
    router,
    persistorReady,
    currentTokenFromRedux,
    loggedInUserIdFromRedux,
    memoizedOnReady,
  ]);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [persistorReady, setPersistorReady] = useState(false);

  const handleAppReady = useCallback(() => {
    console.log(
      "App Initialization complete: Redux rehydration and auth check done."
    );
    setIsAppInitialized(true);
  }, []);

  const onBeforeLift = () => {
    console.log("Redux Persist: Rehydration complete.");
    setPersistorReady(true);
  };

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={onBeforeLift}
      >
        <AppInitializer
          onReady={handleAppReady}
          persistorReady={persistorReady}
        />

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
