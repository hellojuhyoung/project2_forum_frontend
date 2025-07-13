// frontend/src/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor, RootState } from "@/redux/store";
import { useEffect, useState, useRef, useCallback } from "react";
import { setUser, clearUser } from "@/redux/redux"; // Assuming clearUser is also defined in this file
import { PersistGate } from "redux-persist/integration/react";
import { instance } from "@/utils/apis/axios";
import Margins from "@/components/Margins/Margins";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "../i18n";
import { useRouter } from "next/router";
import Head from "next/head";
import { AxiosError } from "axios";

// REMOVED: The getCookie utility function was removed from here.

// AppInitializer now receives a prop to indicate when Redux Persist is ready
function AppInitializer({
  onReady,
  persistorReady,
}: {
  onReady: () => void;
  persistorReady: boolean;
}) {
  // MODIFIED: Added persistorReady prop
  const dispatch = useDispatch();
  const router = useRouter();

  // Get token and user ID directly from Redux store
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
    // CRITICAL: Only run this effect once Redux Persist has rehydrated and initial check hasn't run
    if (!persistorReady || initialAuthCheckPerformed.current) {
      // MODIFIED: Added !persistorReady condition
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

    const performAuthCheck = async () => {
      // Now we solely rely on the token being present in the Redux store after rehydration
      if (currentTokenFromRedux && loggedInUserIdFromRedux) {
        console.log(
          "Token and User ID present in Redux. Attempting profile fetch/verification."
        );
        try {
          // Make an API call to your backend to validate the token.
          // The browser will automatically send the HttpOnly cookie with this request
          // because 'instance' (Axios) has 'withCredentials: true'.
          // Your backend's /auth/profile endpoint should be protected by middleware
          // that reads the 'token' cookie and populates 'req.user'.
          const profileResponse: any = await instance.get("/auth/profile"); // MODIFIED: Removed Authorization header from here

          console.log("Profile verification successful:", profileResponse.data);

          // Re-hydrate Redux state with user data (even if already there, ensures consistency)
          dispatch(
            setUser({
              id: profileResponse.data?.user?.id, // MODIFIED: Added ?.user?. to access nested user object
              username: profileResponse.data?.user?.username, // MODIFIED: Added ?.user?. to access nested user object
              token: currentTokenFromRedux, // Use the token from Redux, as it was validated by the backend
            })
          );
          memoizedOnReady();
        } catch (error: any) {
          console.error("Error verifying token or fetching profile:", error);
          const axiosError = error as AxiosError;

          // Handle specific authentication errors (401/403)
          if (
            axiosError.response &&
            (axiosError.response.status === 401 ||
              axiosError.response.status === 403)
          ) {
            console.warn(
              "Token invalid/expired during verification (401/403). Clearing user data."
            );
            dispatch(clearUser());
            // Redirect only if not already on a public page
            if (
              !["/auth/login", "/users/signup", "/"].includes(router.pathname)
            ) {
              router.replace("/auth/login");
            }
          } else if (axiosError.request) {
            console.error(
              "Network error: Request made but no response received.",
              axiosError.message
            );
            dispatch(clearUser());
            if (
              !["/auth/login", "/users/signup", "/"].includes(router.pathname)
            ) {
              router.replace("/auth/login?error=network");
            }
          } else {
            console.error(
              "Error setting up request or unexpected error:",
              axiosError.message
            );
            dispatch(clearUser());
            if (
              !["/auth/login", "/users/signup", "/"].includes(router.pathname)
            ) {
              router.replace("/auth/login");
            }
          }
          memoizedOnReady();
        }
      } else {
        console.log("No token found in Redux. User needs to login.");
        dispatch(clearUser()); // Ensure Redux state is clear
        // Redirect only if not already on a public page
        if (!["/auth/login", "/users/signup", "/"].includes(router.pathname)) {
          console.log(
            "Redirecting to login page as no authentication state found."
          );
          router.replace("/auth/login");
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
  ]); // MODIFIED: Added persistorReady to dependencies

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [persistorReady, setPersistorReady] = useState(false); // ADDED: New state to track persistor readiness

  const handleAppReady = useCallback(() => {
    console.log(
      "App Initialization complete: Redux rehydration and auth check done."
    );
    setIsAppInitialized(true);
  }, []);

  // ADDED: Callback from PersistGate when rehydration is complete
  const onBeforeLift = () => {
    console.log("Redux Persist: Rehydration complete.");
    setPersistorReady(true);
  };

  return (
    <Provider store={store}>
      {/* MODIFIED: Added onBeforeLift prop to PersistGate */}
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={onBeforeLift}
      >
        {/* Pass persistorReady to AppInitializer */}
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
