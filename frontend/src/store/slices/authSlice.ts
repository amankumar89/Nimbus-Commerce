import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: AuthUser }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthChecked = true;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    authCheckComplete: (state) => {
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthChecked = true;
    },
  },
});

export const {
  setCredentials,
  setAccessToken,
  authCheckComplete,
  logout
} = authSlice.actions;

export default authSlice.reducer;