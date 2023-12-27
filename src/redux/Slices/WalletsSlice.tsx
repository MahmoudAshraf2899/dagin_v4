import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    selectedWalletType: 1,
    startDate: null,
    finishDate: null,
    showSettlements: false,
    userId: null

};
export const WalletsSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        selectedWalletType: (state, action) => {
            state.selectedWalletType = action.payload.type;
        },
        setFilterDate: (state, action) => {
            state.startDate = action.payload.fromDate;
            state.finishDate = action.payload.toDate;
        },
        toggleShowSettlementsComponent: (state, action) => {
            state.showSettlements = action.payload.isVisible;
        },
        setUserId: (state, action) => {
            state.userId = action.payload.userId
        }
    },
});
export const { selectedWalletType, setFilterDate, toggleShowSettlementsComponent, setUserId } = WalletsSlice.actions;

export default WalletsSlice.reducer;
