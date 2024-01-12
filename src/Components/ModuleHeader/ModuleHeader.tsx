import { useState } from "react";
import "./ModuleHeader.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedMissionType,
  toggleShowAddMission,
} from "../../redux/Slices/MissionSlice";
import { Header } from "../Users/Header/Header";
import { WalletsHeader } from "../Wallets/Header/WalletsHeader";
import { CompetitionsHeader } from "../Competitions/Header/CompetitionsHeader";
import { FarmsHeader } from "../Farms/Header/FarmsHeader";
import { MissionsHeader } from "../Missions/MissionsHeader/MissionsHeader";

export const ModuleHeader = () => {
  const dispatch = useDispatch();
  const stateFromSidebarSlice = useSelector((state: any) => state.sideBar);


  const [activeElement, setActiveElement] = useState(1);
  const handleActiveElement = (id: number) => {
    setActiveElement(id);
    let type = id;
    dispatch(selectedMissionType({ type }));
  };
  const showAddMission = () => {
    let isVisible = true;
    dispatch(toggleShowAddMission({ isVisible }));
  };
  return (
    <div className="ModuleHeader" >

      {/* ادارة المستخدمين */}
      {stateFromSidebarSlice.currentActiveModule === 5 ?
        <Header />
        : stateFromSidebarSlice.currentActiveModule === 6 ?
          <WalletsHeader /> :
          stateFromSidebarSlice.currentActiveModule === 3 ? <>
            <CompetitionsHeader />
          </> : stateFromSidebarSlice.currentActiveModule === 10 ? <><FarmsHeader /></> :
            <>
              {/* Missions Header */}
              <MissionsHeader />
            </>}

    </div>
  );
};
