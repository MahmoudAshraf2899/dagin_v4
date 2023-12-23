import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedMission: 1,
  missionId: 0,
  showAddMission: false,
  selecteTypeId: 0,
  selectedTypeName: "",
  workAreasIds: [],
  workAreasTitle: "",
  assignedIds: [],
  assignedType: "",
  assignedText: "",
  dueDate: new Date(),
  isDateChanged: false,
  showDetailsPopUp: false,
  showEditMission: false,
  BonusDate: new Date(),
  isBonusDateChanged: false,
  markAfterEdit: false,
};
export const MissionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    selectedMissionType: (state, action) => {
      state.selectedMission = action.payload.type;
    },
    toggleShowAddMission: (state, action) => {
      state.showAddMission = action.payload.visible;
    },
    toggleShowEditMission: (state, action) => {
      state.showEditMission = action.payload.editIsVisible;
      state.markAfterEdit = action.payload.markAfterEdit;
    },
    setSelectedMissionType: (state, action) => {
      state.selecteTypeId = action.payload.typeId;
      state.selectedTypeName = action.payload.typeName;
    },
    setSelectedWorkAreas: (state, action) => {
      state.workAreasIds = action.payload.rangeIds;
      state.workAreasTitle = action.payload.rangeTitle;
    },
    setSelectedAssignTo: (state, action) => {
      state.assignedIds = action.payload.assignedIds;
      state.assignedType = action.payload.assignedType;
      state.assignedText = action.payload.assignedText;
    },
    setDueDateValue: (state, action) => {
      state.dueDate = action.payload.dueDate;
      state.isDateChanged = action.payload.isDateChanged;
    },
    setBonusDate: (state, action) => {
      state.BonusDate = action.payload.bonusDate;
      state.isBonusDateChanged = action.payload.isBonusDateChanged;
    },
    sendMissionIdToPopUp: (state, action) => {
      state.missionId = action.payload.missionId;
    },
    showDetailsPopUp: (state, action) => {
      state.showDetailsPopUp = action.payload.isDetailsActive;
    },
  },
});
export const {
  selectedMissionType,
  toggleShowAddMission,
  setSelectedMissionType,
  setSelectedWorkAreas,
  setSelectedAssignTo,
  setDueDateValue,
  sendMissionIdToPopUp,
  showDetailsPopUp,
  toggleShowEditMission,
  setBonusDate,
} = MissionSlice.actions;

export default MissionSlice.reducer;
