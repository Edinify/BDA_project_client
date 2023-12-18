import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../globalComponents/Table/Table";
import {
  CURRENT_LESSONS_DATA_ACTION_TYPE,
  MAIN_LESSONS_DATA_ACTION_TYPE,
} from "../../redux/actions-type";
import { clearFilterStudent } from "../../redux/actions/clearFilterStudent";
import { getMainpageTableLessonsAction } from "../../redux/actions/mainpageTableLessonsAction";
import { PAGINATION_PAGE_NUMBER_ACTION_TYPE } from "../../redux/actions-type";
import { WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE } from "../../redux/actions-type";
import StudentFilterList from "./components/StudentFilterList/StudentFilterList";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const StudentTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getWeeksBetweenDates, startWeek, endWeek, changeMainPageType, changeTableType } = useCustomHook();
  const { user } = useSelector((state) => state.user);
  const { studentAttendance } = useSelector((state) => state.studentAttendance);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { tableType } = useSelector((state) => state.tableType);
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { weeksBetweenSelectedDates } = useSelector((state) => state.weeksBetweenSelectedDates);
  const { pageNumber } = useSelector((state) => state.pageNumber);

  const getStudentLessons = () => {
    dispatch(
      getMainpageTableLessonsAction({
        startDate: startWeek,
        endDate: endWeek,
        attendance: "all",
      })
    );
  };
  const getFilteredLessons = () => {
    if (weeksBetweenSelectedDates.length > 0 && pageNumber === 0) {
      dispatch({
        type: PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,
        payload: 1,
      });
    }

    if (tableType === "main page") {
      if (mainpageType === "student" && user) {
        dispatch(
          getMainpageTableLessonsAction({
            startDate:
              weeksBetweenSelectedDates.length > 0
                ? weeksBetweenSelectedDates[pageNumber > 0 ? pageNumber - 1 : 0]
                    .startWeek
                : startDate
                ? startDate
                : startWeek,
            endDate:
              weeksBetweenSelectedDates.length > 0
                ? weeksBetweenSelectedDates[pageNumber > 0 ? pageNumber - 1 : 0]
                    .endWeek
                : endDate
                ? endDate
                : endWeek,
            attendance: studentAttendance === "all" ? "" : studentAttendance,
          })
        );
      }
    }
  };
  const clearAll = () => {
    dispatch(clearFilterStudent());

    dispatch(
      getMainpageTableLessonsAction({
        startDate: startWeek,
        endDate: endWeek,
        attendance: "all",
      })
    );
  };

  useEffect(() => {
    if (mainpageType === "student" && user) {
      dispatch(
        getMainpageTableLessonsAction({
          startDate: startDate ? startDate : startWeek,
          endDate: endDate ? endDate : endWeek,
          attendance: studentAttendance === "all" ? "" : studentAttendance,
        })
      );
    }
  }, [studentAttendance]);

  useEffect(() => {
    if (location.pathname.substring(0, 14) === "/student-panel") {
      if (startDate && endDate) {
        // endDate.setHours(23, 59, 59, 999);
        getWeeksBetweenDates(startDate, endDate);
      } else if (endDate) {
        // endDate.setHours(23, 59, 59, 999);
      }
    }
  }, [endDate]);

  useEffect(() => {
    if (location.pathname.substring(0, 14) === "/student-panel") {
      if (startDate && endDate) {
        // endDate.setHours(23, 59, 59, 999);
        getWeeksBetweenDates(startDate, endDate);
      }
    }
  }, [startDate]);

  useEffect(() => {
    if (weeksBetweenSelectedDates) {
      dispatch({
        type: PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,
        payload: 0,
      });
    }
  }, [weeksBetweenSelectedDates]);

  useEffect(() => {
    changeMainPageType("student")
    changeTableType("main page")
    dispatch({type:MAIN_LESSONS_DATA_ACTION_TYPE.GET_MAIN_LESSONS_DATA,payload:[]});
    dispatch({type:CURRENT_LESSONS_DATA_ACTION_TYPE.GET_CURRENT_LESSONS_DATA,payload:[]})
  }, []);


  return (
    <div className="student-panel-page">
      <StudentFilterList
        clearAll={clearAll}
        getFilteredLessons={getFilteredLessons}
      />

      <Table getStudentLessons={getStudentLessons} />
    </div>
  );
};

export default StudentTable;
