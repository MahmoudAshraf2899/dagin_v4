import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    selectedWalletType: 1,
    startDate: null,
    finishDate: null

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
        }
    },
});
export const { selectedWalletType, setFilterDate } = WalletsSlice.actions;

export default WalletsSlice.reducer;
