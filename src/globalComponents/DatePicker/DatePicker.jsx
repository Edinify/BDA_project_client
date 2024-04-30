import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";
import "./datePicker.css";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { useDispatch, useSelector } from "react-redux";
import { DATEPICKER_ACTION_TYPE } from "../../redux/actions-type";
import moment from "moment";
import { useCustomHook } from "../GlobalFunctions/globalFunctions";

export const DatePick = ({ deviceType = "" }) => {
  registerLocale("az", az);
  const dispatch = useDispatch();
  const { startWeek, endWeek } = useCustomHook();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartDayDate, setSelectedStartDayDate] = useState(null);
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { startDay } = useSelector((state) => state.datepicker);
  console.log(startDay, "startday");
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startDayRef = useRef(null);

  const handleStartDateChange = (date) => {
    if (date) {
      if (
        moment(date).isBefore(endWeek) ||
        moment(date).format("DD MM YYYY") ===
          moment(endWeek).format("DD MM YYYY")
      ) {
        if (endDate) {
          if (moment(endDate).isAfter(date)) {
            setSelectedStartDate(date);
          }
        } else {
          setSelectedStartDate(date);
        }
      }
    }
  };

  const handleStartDayDateChange = (date) => {
    if (date) {
      if (
        moment(date).isBefore(endWeek) ||
        moment(date).format("DD") === moment(endWeek).format("DD")
      ) {
        if (endDate) {
          if (moment(endDate).isAfter(date)) {
            setSelectedStartDayDate(date);
          }
        } else {
          setSelectedStartDayDate(date);
        }
      }
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      if (
        moment(date).isBefore(endWeek) ||
        moment(date).format("DD MM YYYY") ===
          moment(endWeek).format("DD MM YYYY")
      ) {
        if (startDate) {
          if (moment(startDate).isBefore(date)) {
            setSelectedEndDate(date);
          }
        } else {
          setSelectedEndDate(date);
        }
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: DATEPICKER_ACTION_TYPE.START_DATE,
      payload: selectedStartDate,
    });
    dispatch({
      type: DATEPICKER_ACTION_TYPE.END_DATE,
      payload: selectedEndDate,
    });
    dispatch({
      type: DATEPICKER_ACTION_TYPE.START_DAY_DATE,
      payload: selectedStartDayDate,
    });
  }, [selectedStartDate, selectedEndDate, selectedStartDayDate, dispatch]);

  return (
    <>
      <div className={`date-container ${deviceType}`}>
        {/* <div className="date-picker-a from ">
          <CalendarIcon
            onClick={() => startDateRef.current.setOpen(true)}
            style={{ cursor: "pointer" }}
          />

          <DatePicker
            ref={startDayRef}
            locale="az"
            selected={selectedStartDayDate}
            onSelect={() => startDayRef.current.setOpen(false)}
            onChange={handleStartDayDateChange}
            dateFormat="dd"
            showMonthYearPicker={false}
            placeholderText="dd"
            value={startDay && moment(startDay).format("DD")}
          />
          <h4>-dan</h4>
        </div> */}

        <div className="date-picker-a from ">
          <CalendarIcon
            onClick={() => startDateRef.current.setOpen(true)}
            style={{ cursor: "pointer" }}
          />

          <DatePicker
            ref={startDateRef}
            locale="az"
            selected={selectedStartDate}
            onSelect={() => startDateRef.current.setOpen(false)}
            onChange={handleStartDateChange}
            // showMonthYearPicker
            // dateFormat="MM/yyyy"
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            // placeholderText="mm/yyyy"
            // value={startDate && moment(startDate).format("MM/ YYYY")}
            value={startDate && moment(startDate).format("DD/MM/ YYYY")}
          />
          <h4>-dan</h4>
        </div>

        <div className="date-picker-a to">
          <CalendarIcon
            onClick={() => endDateRef.current.setOpen(true)}
            style={{ cursor: "pointer" }}
          />

          <DatePicker
            ref={endDateRef}
            locale="az"
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            value={endDate && moment(endDate).format("DD/ MM/ YYYY")}
            onSelect={() => endDateRef.current.setOpen(false)}
          />
          <h4>-qədər</h4>
        </div>
      </div>
    </>
  );
};
