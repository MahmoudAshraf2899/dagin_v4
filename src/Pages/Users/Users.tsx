import { useSelector } from "react-redux";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { MainHeader } from "../../Components/MainHeader/MainHeader";
import { ModuleHeader } from "../../Components/ModuleHeader/ModuleHeader";
import { ActiveUsers } from "../../Components/Users/ActiveUsers";
import { DisableUsers } from "../../Components/Users/DisableUsers";
export const Users = ()=>{
  const stateFromUserSlice = useSelector((state: any) => state.users);

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
          <div className="page-container">
            <div className="col-span-12 row-span-1">
              <MainHeader />
              {/* Second Header */}
               
                <>
                  <ModuleHeader />
                </>
              
            </div>
          </div>
          {/* Content Will Be Here */}
           
            <>
              <div
                className="h-full"
                style={{ backgroundColor: "var(--Greyscale-50, #F8FAFC)" }}
              >
                {stateFromUserSlice.selectedUserType === 1 ?<>
                
                  <ActiveUsers />
                </>:<>
                <DisableUsers />
                </>}
              </div>
            </>
           
        </div>
      </div>
    )
}