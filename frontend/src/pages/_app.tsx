import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "@/redux/store";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { setUser } from "@/redux/redux";
import { PersistGate } from "redux-persist/integration/react";
import { instance } from "@/utils/apis/axios";
import Margins from "@/components/Margins/Margins";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "../i18n";
import { useRouter } from "next/router";

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

  useEffect(() => {
    const token = getCookie("token") as string | undefined;

    if (token) {
      (async () => {
        try {
          const response: any = await instance.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // console.log("Profile response:", response);

          dispatch(
            setUser({
              id: response.id,
              username: response.username,
              token: token,
            })
          );
        } catch (error) {
          console.error("error in _app file app initializer", error);
        }
      })();
    }
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
            <Component {...pageProps} />
          </Margins>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
