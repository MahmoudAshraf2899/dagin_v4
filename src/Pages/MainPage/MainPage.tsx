import { MainHeader } from "../../Components/MainHeader/MainHeader";
import { ModuleHeader } from "../../Components/ModuleHeader/ModuleHeader";
import { Sidebar } from "../../Components/Sidebar/Sidebar";

export const MainPage = () => {
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
        <div
          className="page-container"
          style={{ backgroundColor: "#FFF" }}
        >
          <div className="col-span-12 row-span-1">
            <MainHeader />
          </div>
        </div>
        {/* Content Will Be Here */}

        <>
          <div
            className="h-full"
            style={{ backgroundColor: "var(--Greyscale-50, #F8FAFC)" }}
          ></div>
        </>
      </div>
    </div>
  );
};
