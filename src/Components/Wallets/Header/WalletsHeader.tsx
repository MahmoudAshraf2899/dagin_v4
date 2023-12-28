import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectedWalletType, setFilterDate } from "../../../redux/Slices/WalletsSlice";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import './WalletsHeader.scss'
export const WalletsHeader = () => {
    const dispatch = useDispatch();
    const stateFromWalletsSlice = useSelector((state: any) => state.wallets);

    const [values, setValues] = useState([new DateObject(), new DateObject()]);

    const [activeElement, setActiveElement] = useState(1);
    const handleActiveElement = (id: number) => {
        setActiveElement(id);
        let type = id;
        dispatch(selectedWalletType({ type }));
    };
    const handleDateChange = (newValues: any) => {
        // Handle newValues as needed
        setValues(newValues);
        let fromDate = newValues[0];
        let toDate = newValues[1];
        if (toDate !== undefined) {
            dispatch(setFilterDate({ fromDate, toDate }))
        }
    };

    return (
        <div className="grid grid-cols-2 xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4  WalletsHeader">

            <div className="col-start-1 flex  sm:col-start-1">
                <div
                    onClick={() => handleActiveElement(1)}
                    className={
                        stateFromWalletsSlice.selectedWalletType === 1 ? "main-element-active" : "main-element"
                    }
                >
                    كل الحركات
                </div>
                <div
                    onClick={() => handleActiveElement(2)}
                    className={
                        stateFromWalletsSlice.selectedWalletType === 2 ? "main-element-active" : "main-element"
                    }
                >
                    الحركات المدينة فقط
                </div>

                <div
                    onClick={() => handleActiveElement(3)}
                    className={
                        stateFromWalletsSlice.selectedWalletType === 3 ? "main-element-active" : "main-element"
                    }
                >
                    الحركات الدائنة فقط
                </div>
                <div
                    onClick={() => handleActiveElement(4)}
                    className={
                        stateFromWalletsSlice.selectedWalletType === 4 ? "main-element-active" : "main-element"
                    }
                >
                    الأرصدة الدئنة فقط
                </div>
            </div>
            <div className="col-start-2  flex justify-end">
                {stateFromWalletsSlice.selectedWalletType === 4 ? null : <>
                    <div className="flex">
                        <DatePicker
                            inputClass="filterWallet"
                            value={values}
                            dateSeparator="الي"
                            onChange={handleDateChange}
                            range
                            // rangeHover
                            format="YYYY-MM-DD"
                        />
                    </div>
                </>}
            </div>

        </div>
    )
}