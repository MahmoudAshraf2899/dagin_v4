import "./DatePicker.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDueDateValue } from "../../../../../redux/Slices/MissionSlice";
type DatePickerComponentProps = {
  activation: boolean;
  isEdit: boolean;
  due_date?: Date;
};
export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  activation,
  isEdit,
  due_date = new Date(),
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [changed, setChanged] = useState(false);
  const dispatch = useDispatch();

  const handleChangeDate = (date: any) => {
    setStartDate(date);
    setChanged(true);
    let dueDate = date;
    let isDateChanged = true;
    dispatch(setDueDateValue({ dueDate, isDateChanged }));
  };
  return (
    <div>
      <DatePicker
        selected={isEdit === true ? due_date : startDate}
        onChange={(event) => handleChangeDate(event)}
        className="date-picker-input"
        disabled={activation}
        minDate={new Date()}
      />
    </div>
  );
};
