import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentActiveModule: 0,
};
export const SidebarSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setActiveModule: (state, action) => {
      state.currentActiveModule = action.payload.currentActiveModule;
    },
  },
});
export const { setActiveModule } = SidebarSlice.actions;

export default SidebarSlice.reducer;
