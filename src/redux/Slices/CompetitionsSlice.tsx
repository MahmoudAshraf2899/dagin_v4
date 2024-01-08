import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    selectedCompetitonType: 1,
    showCompetitionDetails: false,
    showAddCompetition: false

};
export const CompetitionsSlice = createSlice({
    name: "competitions",
    initialState,
    reducers: {
        handleSelectedCompetitonType: (state, action) => {
            state.selectedCompetitonType = action.payload.type;
        },
        toggleShowCompetitionDetails: (state, action) => {
            state.showCompetitionDetails = action.payload.isVisible;
        },
        toggleShowAddCompetition: (state, action) => {
            state.showAddCompetition = action.payload.isVisible;
        },
    },
});
export const { handleSelectedCompetitonType, toggleShowCompetitionDetails, toggleShowAddCompetition } = CompetitionsSlice.actions;

export default CompetitionsSlice.reducer;
