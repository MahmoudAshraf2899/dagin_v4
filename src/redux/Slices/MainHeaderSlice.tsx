import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "الداشبورد",
};
export const MainHeaderSlice = createSlice({
  name: "MainHeader",
  initialState,
  reducers: {
    setMainHeaderName: (state, action) => {
      state.name = action.payload.mainHeaderName;
    },
  },
});
export const { setMainHeaderName } = MainHeaderSlice.actions;

export default MainHeaderSlice.reducer;
