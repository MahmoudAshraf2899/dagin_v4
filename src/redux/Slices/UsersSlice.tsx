import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    selectedUserType: 1,
};
export const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    selectedUsersType: (state, action) => {
      state.selectedUserType = action.payload.type;
    },
  },
});
export const { selectedUsersType } = UsersSlice.actions;

export default UsersSlice.reducer;
