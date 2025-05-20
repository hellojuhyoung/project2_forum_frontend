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

function AppInitializer() {
  const dispatch = useDispatch();
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

          console.log("Profile response:", response);

          dispatch(
            setUser({
              id: response.id,
              username: response.username,
              token,
            })
          );
        } catch (error) {
          console.error("error in _app file app initializer", error);
        }
      })();
    }
  }, [dispatch]);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer />
        <Margins>
          <Component {...pageProps} />
        </Margins>
      </PersistGate>
    </Provider>
  );
}
