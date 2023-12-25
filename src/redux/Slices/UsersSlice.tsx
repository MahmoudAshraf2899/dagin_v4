import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedUserType: 1,
  showAddUser: false,
  showEditUser: false,
  levelId: 0,
  levelName: "",
  specialtiesId: 0,
  specialtiesName: "",
  userId: null,
  activeUserData: [],
  isSuspendActive: false
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
    toggleShowEditUser: (state, action) => {
      state.showEditUser = action.payload.visible;
    },
    setSelectedStage: (state, action) => {
      state.levelId = action.payload.levelId;
      state.levelName = action.payload.levelName
    },
    setSelectedSpecialties: (state, action) => {
      state.specialtiesId = action.payload.specialtiesId;
      state.specialtiesName = action.payload.specialtiesName
    },
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
    },
    setActiveUserData: (state, action) => {
      state.activeUserData = action.payload.activeUserData;
    },
    toggleShowSuspendPopUp: (state, action) => {
      state.isSuspendActive = action.payload.isSuspendActive;
    }

  },
});
export const { selectedUsersType, toggleShowAddUser, toggleShowEditUser, setSelectedStage, setSelectedSpecialties, setUserId, setActiveUserData, toggleShowSuspendPopUp } = UsersSlice.actions;

export default UsersSlice.reducer;
