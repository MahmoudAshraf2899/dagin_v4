import React from "react";

import { useSelector } from "react-redux";

import { Login } from "./Components/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MissionsPage } from "./Pages/Missions/MissionsPage";
import { MainPage } from "./Pages/MainPage/MainPage";
import { Users } from "./Pages/Users/Users";
import { Wallets } from "./Pages/Wallets/Wallets";
import { Competitions } from "./Pages/Competitions/Competitions";
import './App.css'
import { FarmsPage } from "./Pages/Farms/FarmsPage";
import { Views } from "./app-layout/Views";
function App() {
  const stateFromSidebar = useSelector((state: any) => state.sideBar);
  const token = localStorage.getItem("token");

  return (
    <div>
      {/* <Loading /> */}
      {token != null ? (
        <>
          <Views />
          <ToastContainer rtl />
        </>
      ) : (
        <>
          <Login />
          <ToastContainer rtl />
        </>
      )}
    </div>
  );
}

export default App;
