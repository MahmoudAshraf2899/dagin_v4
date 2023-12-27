import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectedWalletType, setFilterDate } from "../../../redux/Slices/WalletsSlice";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import './WalletsHeader.scss'
export const WalletsHeader = () => {
    const dispatch = useDispatch();
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
                        activeElement === 1 ? "main-element-active" : "main-element"
                    }
                >
                    كل الحركات
                </div>
                <div
                    onClick={() => handleActiveElement(2)}
                    className={
                        activeElement === 2 ? "main-element-active" : "main-element"
                    }
                >
                    الحركات المدينه فقط
                </div>

                <div
                    onClick={() => handleActiveElement(3)}
                    className={
                        activeElement === 3 ? "main-element-active" : "main-element"
                    }
                >
                    الحركات الدائنه فقط
                </div>
                <div
                    onClick={() => handleActiveElement(4)}
                    className={
                        activeElement === 4 ? "main-element-active" : "main-element"
                    }
                >
                    الأرصدة الدائنه فقط
                </div>
            </div>
            <div className="col-start-2  flex justify-end">
                <div className="flex">
                    <DatePicker
                        inputClass="filterWallet"
                        value={values}
                        dateSeparator="الي"
                        onChange={handleDateChange}
                        range
                        rangeHover
                        format="YYYY-MM-DD"
                    // animations={[opacity(), transition({ from: 35, duration: 800 })]}
                    />
                </div>
            </div>

        </div>
    )
}