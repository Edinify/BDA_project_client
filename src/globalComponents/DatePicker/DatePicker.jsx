import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";
import "./datePicker.css";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { useDispatch } from "react-redux";
import { DATEPICKER_ACTION_TYPE } from "../../redux/actions-type";
import "react-datepicker/dist/react-datepicker.css";

export const DatePick = ({ deviceType = "" }) => {
  registerLocale("az", az);
  const dispatch = useDispatch();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);




  useEffect(() => {
    dispatch({
      type: DATEPICKER_ACTION_TYPE.START_DATE,
      payload: selectedStartDate,
    });
    dispatch({
      type: DATEPICKER_ACTION_TYPE.END_DATE,
      payload: selectedEndDate,
    });
  }, [selectedStartDate, selectedEndDate, dispatch]);

  return (
    <>
      <div className={`date-container ${deviceType}`}>
        <div className="startdate-container">
          <div className="startdate-month">
            <CalendarIcon
              onClick={() => startDateRef.current.setOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <DatePicker
              selected={selectedStartDate}
              onChange={(date) => setSelectedStartDate(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              locale="az"
            />

            <h4>-dan</h4>
          </div>
        </div>

        <div className="startdate-container end">
          <div className="startdate-month">
            <CalendarIcon
              onClick={() => endDateRef.current.setOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <DatePicker
              selected={selectedEndDate}
              onChange={(date) => setSelectedEndDate(date)}
              peekNextMonth
              showMonthDropdown
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              dropdownMode="select"
              locale="az"
            />
            <h4>-dan</h4>
          </div>
        </div>
      </div>
    </>
  );
};
