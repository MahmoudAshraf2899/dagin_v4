import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BonusDatePicker.scss";
import { setBonusDate } from "../../../../redux/Slices/MissionSlice";
type BonusDatePickerProps = {
  activation: boolean;
};
export const BonusDatePicker = (props: BonusDatePickerProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [changed, setChanged] = useState(false);
  const dispatch = useDispatch();
  const handleChangeDate = (date: any) => {
    setStartDate(date);
    setChanged(true);
    let BonusDate = date;
    let isBonusDateChanged = true;
    dispatch(setBonusDate({ BonusDate, isBonusDateChanged }));
  };
  return (
    <div className="BonusDatePicker">
      <DatePicker
        selected={startDate}
        onChange={(event) => handleChangeDate(event)}
        className="date-picker-input"
        disabled={props.activation}
        minDate={new Date()}
      />
    </div>
  );
};
