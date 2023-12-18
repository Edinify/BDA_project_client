import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./teacherTable.css";
import { Table } from "../../../globalComponents/Table/Table";
import {
  CURRENT_LESSONS_DATA_ACTION_TYPE,
  MAIN_LESSONS_DATA_ACTION_TYPE,
  LESSON_STATUS_ACTION_TYPE,
  MAINPAGE_LESSONS_ACTION_TYPE,
  PAGINATION_PAGE_NUMBER_ACTION_TYPE,
} from "../../../redux/actions-type";
import { clearFilterTeacher } from "../../../redux/actions/clearFilterTeacher";
import { getMainpageTableLessonsAction } from "../../../redux/actions/mainpageTableLessonsAction";
import TeacherFilterList from "./components/TeacherFilterList/TeacherFilterList";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";

const TeacherTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getWeeksBetweenDates, startWeek, endWeek, changeMainPageType, changeTableType } = useCustomHook();
  const { user } = useSelector((state) => state.user);
  const { lessonStatus } = useSelector((state) => state.lessonStatus);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { tableType } = useSelector((state) => state.tableType);
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { pageNumber } = useSelector((state) => state.pageNumber);
  const { weeksBetweenSelectedDates } = useSelector((state) => state.weeksBetweenSelectedDates);

  const getTeacherLessons = () => {
    dispatch(
      getMainpageTableLessonsAction({
        startDate: startWeek,
        endDate: endWeek,
        status: "all",
      })
    );
  };
  const clearAll = () => {
    dispatch(clearFilterTeacher());
    dispatch({
      type: LESSON_STATUS_ACTION_TYPE.UPDATE_LESSON_STATUS,
      payload: '',
    });
    dispatch(
      getMainpageTableLessonsAction({
        startDate: startWeek,
        endDate: endWeek,
        status: "all",
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
      if (mainpageType === "teacher" && user) {
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
            status: lessonStatus === "all" ? "" : lessonStatus,
          })
        );
      }
    }
  };


  useEffect(() => {
    if (location.pathname.substring(0, 14) === "/teacher-panel") {
      if (startDate && endDate) {
        endDate?.setHours(23, 59, 59, 999);
        getWeeksBetweenDates(startDate, endDate);
      } else if (endDate) {
        endDate?.setHours(23, 59, 59, 999);
      }
    }
  }, [endDate]);

  useEffect(() => {
    if (location.pathname.substring(0, 14) === "/teacher-panel") {
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
    if (tableType === "main page") {
      if (mainpageType === "teacher") {
        dispatch(
          getMainpageTableLessonsAction({
            startDate: startDate ? startDate : startWeek,
            endDate: endDate ? endDate : endWeek,
            status: lessonStatus === "all" ? "" : lessonStatus,
          })
        );
      }
    }
  }, [lessonStatus])

  useEffect(() => {
    changeMainPageType("teacher")
    changeTableType("main page")
    dispatch({type:MAIN_LESSONS_DATA_ACTION_TYPE.GET_MAIN_LESSONS_DATA,payload:[]});
    dispatch({type:CURRENT_LESSONS_DATA_ACTION_TYPE.GET_CURRENT_LESSONS_DATA,payload:[]})
    dispatch({type:MAINPAGE_LESSONS_ACTION_TYPE.GET_MAINPAGE_LESSONS,payload:[]});
  }, []);


  
  return (
    <div className="teacher-panel-page">
      <TeacherFilterList
        clearAll={clearAll}
        getFilteredLessons={getFilteredLessons}
      />

      <Table getTeacherLessons={getTeacherLessons} />
    </div>
  );
};

export default TeacherTable;
