import { configureStore } from "@reduxjs/toolkit";
import MissionSlice from "../Slices/MissionSlice";
import LoginSlice from "../Slices/LoginSlice";
import MainHeaderSlice from "../Slices/MainHeaderSlice";
import SidebarSlice from "../Slices/SidebarSlice";
import UsersSlice from "../Slices/UsersSlice";
import WalletsSlice from "../Slices/WalletsSlice";
import CompetitionsSlice from "../Slices/CompetitionsSlice";
const store = configureStore({
  reducer: {
    missions: MissionSlice,
    login: LoginSlice,
    mainHeader: MainHeaderSlice,
    sideBar: SidebarSlice,
    users: UsersSlice,
    wallets: WalletsSlice,
    competitions: CompetitionsSlice
  },
});
export default store;
