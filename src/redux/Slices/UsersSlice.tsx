import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    selectedUserType: 1,
    showAddUser: false,
    showEditUser:false

};
export const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    selectedUsersType: (state, action) => {
      state.selectedUserType = action.payload.type;
    },
    toggleShowAddUser: (state, action) => {
      state.showAddUser = action.payload.visible;
    },
    toggleShowEditUser : (state,action)=>{
      state.showEditUser = action.payload.visible;
    }

  },
});
export const { selectedUsersType,toggleShowAddUser } = UsersSlice.actions;

export default UsersSlice.reducer;
