import { useSelector } from "react-redux";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { MainHeader } from "../../Components/MainHeader/MainHeader";
import { ModuleHeader } from "../../Components/ModuleHeader/ModuleHeader";
import { ActiveUsers } from "../../Components/Users/ActiveUsers";
import { DisableUsers } from "../../Components/Users/DisableUsers";
import { AddUser } from "../../Components/Users/Add/AddUser";
import { EditUser } from "../../Components/Users/Edit/EditUser";
import { StoppedUsers } from "../../Components/Users/StoppedUsers";
import { UserProfile } from "../../Components/Users/UserProfile/UserProfile";
export const UserProfilePage = () => {
    return (
        <div className="flex flex-row " style={{ direction: "rtl" }}>

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
            <div className="flex w-full flex-col p-4 bg-white">
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
                    style={{ backgroundColor: "#FFF" }}>
                    <div className="col-span-12 row-span-1">
                        <MainHeader />



                    </div>
                </div>
                {/* Content Will Be Here */}

                <UserProfile />



            </div>
        </div>
    )
}