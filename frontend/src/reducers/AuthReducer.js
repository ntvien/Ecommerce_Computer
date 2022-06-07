import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    profile: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.profile = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.profile = null;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;
