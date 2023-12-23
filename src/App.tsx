import React from "react";
import logo from "./logo.svg";
import { MainHeader } from "./Components/MainHeader/MainHeader";
import { ModuleHeader } from "./Components/ModuleHeader/ModuleHeader";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { PendingMission } from "./Components/Missions/PendingMission/PendingMission";
import { MissionDetails } from "./Components/Missions/PendingMission/MissionDetails";
import { useSelector } from "react-redux";
import { InProgressMission } from "./Components/Missions/InProgressMission/InProgressMission";
import { DetailsPopUp } from "./Components/Missions/InProgressMission/DetailsPopUp";
import { LateMissions } from "./Components/Missions/LateMissions/LateMissions";
import { LatePopUp } from "./Components/Missions/LateMissions/LatePopUp";
import { EvaluationMissionPopUp } from "./Components/Missions/EvaluationMission/EvaluationMissionPopUp";
import { EvaluationMission } from "./Components/Missions/EvaluationMission/EvaluationMission";
import { FinishedMission } from "./Components/Missions/FinishedMission/FinishedMission";
import { FinishedPopUp } from "./Components/Missions/FinishedMission/FinishedPopUp";
import { AddMission } from "./Components/Missions/AddMission/AddMission";
import { Login } from "./Components/Login/Login";
import { Loading } from "./Components/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditMission } from "./Components/Missions/EditMission/EditMission";
import { MissionsPage } from "./Pages/Missions/MissionsPage";
import { MainPage } from "./Pages/MainPage/MainPage";
function App() {
  const stateFromMission = useSelector((state: any) => state.missions);
  const stateFromSidebar = useSelector((state: any) => state.sideBar);
  const token = localStorage.getItem("token");

  return (
    <div>
      {/* <Loading /> */}
      {token != null ? (
        <>
          {stateFromSidebar.currentActiveModule === 1 ? (
            <MissionsPage />
          ) : (
            <MainPage />
          )}
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
