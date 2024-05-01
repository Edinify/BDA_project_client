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
  const [selectedEndDayDate, setSelectedEndDayDate] = useState(null);
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  // const { startDay } = useSelector((state) => state.datepicker);
  // const { endDay } = useSelector((state) => state.datepicker);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleStartDateChange = (date) => {
    if (date) {
      if (
        moment(date).isBefore(endWeek) ||
        moment(date).format("MM YYYY") === moment(endWeek).format(" MM YYYY")
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
      setSelectedStartDayDate(date);
      // if (
      //   moment(date).isBefore(endWeek) ||
      //   moment(date).format("DD") === moment(endWeek).format("DD")
      // ) {
      //   if (endDate) {
      //     if (moment(endDate).isAfter(date)) {
      //       setSelectedStartDayDate(date);
      //     }
      //   } else {
      //     setSelectedStartDayDate(date);
      //   }
      // }
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      if (
        moment(date).isBefore(endWeek) ||
        moment(date).format("MM YYYY") === moment(endWeek).format(" MM YYYY")
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

  const handleEndDayDateChange = (date) => {
    if (date) {
      setSelectedEndDayDate(date);
      // if (
      //   moment(date).isBefore(endWeek) ||
      //   moment(date).format("DD") === moment(endWeek).format("DD")
      // ) {
      //   if (startDate) {
      //     if (moment(startDate).isAfter(date)) {
      //       setSelectedEndDayDate(date);
      //     }
      //   } else {
      //     setSelectedEndDayDate(date);
      //   }
      // }
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
    dispatch({
      type: DATEPICKER_ACTION_TYPE.END_DAY_DATE,
      payload: selectedEndDayDate,
    });
  }, [
    selectedStartDate,
    selectedEndDate,
    selectedStartDayDate,
    selectedEndDayDate,
    dispatch,
  ]);

  return (
    <>
      <div className={`date-container ${deviceType}`}>
        <div className="startdate-container">
          <div className="startdate-day">
            <select
              value={selectedStartDayDate || ""}
              onChange={(e) => handleStartDayDateChange(e.target.value)}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="startdate-month">
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
              showMonthYearPicker
              // dateFormat="MM/yyyy"
              dateFormat="MM/yyyy"
              placeholderText="mm/yyyy"
              // placeholderText="mm/yyyy"
              // value={startDate && moment(startDate).format("MM/ YYYY")}
              value={startDate && moment(startDate).format("MM/ YYYY")}
            />
            <h4>-dan</h4>
          </div>
        </div>

        <div className="startdate-container end">
          <div className="startdate-day">
            <select
              value={selectedEndDayDate || ""}
              onChange={(e) => handleEndDayDateChange(e.target.value)}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="startdate-month">
            <CalendarIcon
              onClick={() => endDateRef.current.setOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <DatePicker
              ref={endDateRef}
              locale="az"
              selected={selectedEndDate}
              onChange={handleEndDateChange}
              showMonthYearPicker
              dateFormat="MM/yyyy"
              placeholderText="mm/yyyy"
              value={endDate && moment(endDate).format("MM/ YYYY")}
              onSelect={() => endDateRef.current.setOpen(false)}
            />
            <h4>-dan</h4>
          </div>
        </div>
      </div>
    </>
  );
};
