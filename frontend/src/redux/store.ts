import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"], // only persist this slice
};

// Define your root reducer by combining all slices
const rootReducer = combineReducers({
  authentication: authenticationReducer, // Your authentication slice
  // Add other reducers here if you have them, e.g., posts: postsReducer
});

// Create the persisted reducer from the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer); // MODIFIED: persistReducer now wraps rootReducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist actions need to be ignored here
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
