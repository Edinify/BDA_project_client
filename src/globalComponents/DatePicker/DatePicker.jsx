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

  console.log(az, "aze");
  const dispatch = useDispatch();
  // const { startWeek, endWeek } = useCustomHook();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // const handleStartDateChange = (date) => {
  //   if (date) {
  //     if (
  //       moment(date).isBefore(endWeek) ||
  //       moment(date).format("MM YYYY") === moment(endWeek).format(" MM YYYY")
  //     ) {
  //       if (endDate) {
  //         if (moment(endDate).isAfter(date)) {
  //           setSelectedStartDate(date);
  //         }
  //       } else {
  //         setSelectedStartDate(date);
  //       }
  //     }
  //   }
  // };

  // const handleStartDayDateChange = (date) => {
  //   if (date) {
  //     setSelectedStartDayDate(date);

  //   }
  // };

  // const handleEndDateChange = (date) => {
  //   if (date) {
  //     if (
  //       moment(date).isBefore(endWeek) ||
  //       moment(date).format("MM YYYY") === moment(endWeek).format(" MM YYYY")
  //     ) {
  //       if (startDate) {
  //         if (moment(startDate).isBefore(date)) {
  //           setSelectedEndDate(date);
  //         }
  //       } else {
  //         setSelectedEndDate(date);
  //       }
  //     }
  //   }
  // };

  // const handleEndDayDateChange = (date) => {
  //   if (date) {
  //     setSelectedEndDayDate(date);

  //   }
  // };

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
          {/* <div className="startdate-day">
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
          </div> */}
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

            {/* <DatePicker
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
            /> */}
            <h4>-dan</h4>
          </div>
        </div>

        <div className="startdate-container end">
          {/* <div className="startdate-day">
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
          </div> */}
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
            {/* <DatePicker
              ref={endDateRef}
              locale="az"
              selected={selectedEndDate}
              onChange={handleEndDateChange}
              showMonthYearPicker
              dateFormat="MM/yyyy"
              placeholderText="mm/yyyy"
              value={endDate && moment(endDate).format("MM/ YYYY")}
              onSelect={() => endDateRef.current.setOpen(false)}
            /> */}
            <h4>-dan</h4>
          </div>
        </div>
      </div>
    </>
  );
};
