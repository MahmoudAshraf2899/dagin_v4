import { MainHeader } from "../../Components/MainHeader/MainHeader"
import { ModuleHeader } from "../../Components/ModuleHeader/ModuleHeader"
import { Sidebar } from "../../Components/Sidebar/Sidebar"
import { useSelector } from "react-redux";
import { AllTransactions } from "../../Components/Wallets/All-Transactions/AllTransactions";
import { CreditTransactions } from "../../Components/Wallets/Credit-transactions/CreditTransactions";
import { DepitTransactions } from "../../Components/Wallets/Depit-Transactions/DepitTransactions";
import { CreditBalanceOnly } from "../../Components/Wallets/Credit-Balance-Only/CreditBalanceOnly";

export const Wallets = () => {
    const stateFromWalletsSlice = useSelector((state: any) => state.wallets);

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


                        <ModuleHeader />


                    </div>
                </div>
                {/* Content Will Be Here */}

                <>
                    <div
                        className="h-full"
                        style={{ backgroundColor: "var(--Greyscale-50, #F8FAFC)" }}
                    >
                        <>
                            {stateFromWalletsSlice.selectedWalletType === 1 ? <>

                                <AllTransactions />
                            </> : stateFromWalletsSlice.selectedWalletType === 2 ?
                                <DepitTransactions />
                                : stateFromWalletsSlice.selectedWalletType === 3 ?
                                    <CreditTransactions /> :
                                    <CreditBalanceOnly />}
                        </>
                    </div>
                </>

            </div>
        </div>

    )
}