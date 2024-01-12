import { useSelector } from "react-redux"
import { CompetitionsHeader } from "../../Components/Competitions/Header/CompetitionsHeader"
import { MainHeader } from "../../Components/MainHeader/MainHeader"
import { ModuleHeader } from "../../Components/ModuleHeader/ModuleHeader"
import { Sidebar } from "../../Components/Sidebar/Sidebar"
import { AvailableCompetitions } from "../../Components/Competitions/Available/AvailableCompetitions"
import { FinishedCompetition } from "../../Components/Competitions/Finished/FinishedCompetition"
import { Details } from "../../Components/Competitions/Details/Details"
import { AddCompetitions } from "../../Components/Competitions/AddCompetitions/AddCompetitions"

export const Competitions = () => {
    const stateFromCompetitionsSlice = useSelector((state: any) => state.competitions);

    return (
        <div className="flex flex-row " style={{ direction: "rtl" }}>
            {/* {stateFromCompetitionsSlice.selectedCompetitonType === 1 ? (
                <>
                    {stateFromCompetitionsSlice.showCompetitionDetails === false ? null : (
                        <Details />
                    )}
                </>
            ) : null} */}
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

                        {/* Second Header */}
                        <MainHeader />
                        {stateFromCompetitionsSlice.showCompetitionDetails === true ||
                            stateFromCompetitionsSlice.showAddCompetition === true ? null : (
                            <>
                                <ModuleHeader />
                            </>
                        )}
                    </div>
                </div>
                {/* Content Will Be Here */}
                {stateFromCompetitionsSlice.showCompetitionDetails === true ? (
                    <>

                        <Details />
                    </>
                ) : stateFromCompetitionsSlice.showAddCompetition === true ? (
                    <>
                        <AddCompetitions />
                    </>) : (
                    <>
                        <div
                            className="h-full"
                            style={{ backgroundColor: "var(--Greyscale-50, #F8FAFC)" }}
                        >
                            {stateFromCompetitionsSlice.selectedCompetitonType === 1 ?

                                <AvailableCompetitions /> : <FinishedCompetition />}

                        </div>
                    </>)}

            </div>
        </div>
    )
}