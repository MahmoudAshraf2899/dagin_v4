import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogged: false,
};
export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.isLogged = action.payload.isLogged;
    },
  },
});
export const { handleLogin } = LoginSlice.actions;

export default LoginSlice.reducer;
