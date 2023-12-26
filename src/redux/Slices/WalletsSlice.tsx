import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    selectedWalletType: 1,
};
export const WalletsSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        selectedWalletType: (state, action) => {
            state.selectedWalletType = action.payload.type;
        },
    },
});
export const { selectedWalletType } = WalletsSlice.actions;

export default WalletsSlice.reducer;
