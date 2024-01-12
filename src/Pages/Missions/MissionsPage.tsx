import { EvaluationMissionPopUp } from "../../Components/Missions/EvaluationMission/EvaluationMissionPopUp";
import { FinishedPopUp } from "../../Components/Missions/FinishedMission/FinishedPopUp";
import { DetailsPopUp } from "../../Components/Missions/InProgressMission/DetailsPopUp";
import { LatePopUp } from "../../Components/Missions/LateMissions/LatePopUp";
import { MissionDetails } from "../../Components/Missions/PendingMission/MissionDetails";
import { useSelector } from "react-redux";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { MainHeader } from "../../Components/MainHeader/MainHeader";
import { ModuleHeader } from "../../Components/ModuleHeader/ModuleHeader";
import { AddMission } from "../../Components/Missions/AddMission/AddMission";
import { EditMission } from "../../Components/Missions/EditMission/EditMission";
import { PendingMission } from "../../Components/Missions/PendingMission/PendingMission";
import { InProgressMission } from "../../Components/Missions/InProgressMission/InProgressMission";
import { LateMissions } from "../../Components/Missions/LateMissions/LateMissions";
import { EvaluationMission } from "../../Components/Missions/EvaluationMission/EvaluationMission";
import { FinishedMission } from "../../Components/Missions/FinishedMission/FinishedMission";
import { RefusedMissionPopUp } from "../../Components/Missions/RefusedMission/RefusedMissionPopUp";
import { RefusedMission } from "../../Components/Missions/RefusedMission/RefusedMission";

export const MissionsPage = () => {
  const stateFromMission = useSelector((state: any) => state.missions);
  return (
    <div className="flex flex-row " style={{ direction: "rtl" }}>
      {stateFromMission.selectedMission === 1 ? (
        <>
          {stateFromMission.showDetailsPopUp === false ? null : (
            <MissionDetails />
          )}
        </>
      ) : stateFromMission.selectedMission === 2 ? (
        <>
          {stateFromMission.showDetailsPopUp === false ? null : (
            <DetailsPopUp />
          )}
        </>
      ) : stateFromMission.selectedMission === 3 ? (
        <>
          {stateFromMission.showDetailsPopUp === false ? null : <LatePopUp />}
        </>
      ) : stateFromMission.selectedMission === 4 ? (
        <>
          {stateFromMission.showDetailsPopUp === false ? null : (
            <EvaluationMissionPopUp />
          )}
        </>
      ) : stateFromMission.selectedMission === 5 ? (
        <>
          {stateFromMission.showDetailsPopUp === false ? null : (
            <FinishedPopUp />
          )}
        </>
      ) : stateFromMission.selectedMission === 6 ? (
        <>
          {stateFromMission.showDetailsPopUp === false ? null : (
            <RefusedMissionPopUp />
          )}
        </>) : null}
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        {/* Side bar*/}
        <Sidebar />
      </div>
      <div className="flex w-full flex-col p-4">
        {/* Expand Button */}
        <div className="w-fit">
          <label
            htmlFor="sidebar-mobile-fixed"
            className="btn-primary btn sm:hidden"
          >
            Open Sidebar
          </label>
        </div>
        <div
          className="page-container"
          style={{ backgroundColor: "#FFF" }}
        >
          <div className="col-span-12 row-span-1">
            <MainHeader />
            {/* Second Header */}
            {stateFromMission.showAddMission === true ||
              stateFromMission.showEditMission === true ? null : (
              <>
                <ModuleHeader />
              </>
            )}
          </div>
        </div>
        {/* Content Will Be Here */}
        {stateFromMission.showAddMission === true ? (
          <>
            {" "}
            <AddMission />
          </>
        ) : stateFromMission.showEditMission === true ? (
          <>
            <EditMission />
          </>
        ) : (
          <>
            <div
              className="h-full"
              style={{ backgroundColor: "var(--Greyscale-50, #F8FAFC)" }}
            >
              {stateFromMission.selectedMission === 1 ? (
                <>
                  <PendingMission />
                </>
              ) : stateFromMission.selectedMission === 2 ? (
                <>
                  <InProgressMission />
                </>
              ) : stateFromMission.selectedMission === 3 ? (
                <>
                  <LateMissions />
                </>
              ) : stateFromMission.selectedMission === 4 ? (
                <>
                  <EvaluationMission />
                </>
              ) : stateFromMission.selectedMission === 5 ? (
                <>
                  <FinishedMission />
                </>
              ) : stateFromMission.selectedMission === 6 ? (
                <>
                  <RefusedMission />
                </>
              ) : <>
                <PendingMission />
              </>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
