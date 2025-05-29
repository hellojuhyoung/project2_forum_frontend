import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CookieValueTypes } from "cookies-next";

interface reduxState {
  id: number | null | undefined;
  username: string | null;
  token: CookieValueTypes | null | undefined;
}

const initialState: reduxState = {
  id: undefined,
  username: null,
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
      state.id = null;
      state.username = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = authenticationSlices.actions;
export default authenticationSlices.reducer;
