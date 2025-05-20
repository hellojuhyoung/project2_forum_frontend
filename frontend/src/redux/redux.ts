import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CookieValueTypes } from "cookies-next";

interface reduxState {
  id: number | undefined;
  username: string;
  token: CookieValueTypes | undefined;
}

const initialState: reduxState = {
  id: undefined,
  username: "",
  token: undefined,
};

const authenticationSlices = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<reduxState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.id = undefined;
      state.username = "";
      state.token = undefined;
    },
  },
});

export const { setUser, clearUser } = authenticationSlices.actions;
export default authenticationSlices.reducer;
