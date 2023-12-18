import { useLocation } from "react-router-dom";
import "./components/mainHead.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MAIN_PAGE_TYPE_ACTION_TYPE } from "../../../redux/actions-type";
import { getMainpageTableLessonsAction } from "../../../redux/actions/mainpageTableLessonsAction";
import { PAGINATION_PAGE_NUMBER_ACTION_TYPE } from "../../../redux/actions-type";
import { clearLessonsFilter } from "../../../redux/actions/clearLessonsFilterAction";
import "moment/locale/az";
import TableTabs from "./components/TableTabs/TableTabs";
import FilterList from "./components/FilterList/FilterList";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions"

export const MainHead = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getWeeksBetweenDates, startWeek, endWeek, changeMainPageType } = useCustomHook();
  const { dropdownName } = useSelector((state) => state.dropdownName);
  const { lessonStatus } = useSelector((state) => state.lessonStatus);
  const { studentAttendance } = useSelector((state) => state.studentAttendance);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { tableType } = useSelector((state) => state.tableType);
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { weeksBetweenSelectedDates } = useSelector((state) => state.weeksBetweenSelectedDates);
  const { pageNumber } = useSelector((state) => state.pageNumber);
  
  const changePageNum = (number) => {
    dispatch({
      type: PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,
      payload: number,
    });
  }
  const getTeacherLessons = () => {
    dispatch(
      getMainpageTableLessonsAction({
        teacherId: dropdownName._id,
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
  };
  const getStudentLessons = () => {
    dispatch(
      getMainpageTableLessonsAction({
        studentId: dropdownName._id,
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
  };

  const getFilteredLessons = () => {
    if (weeksBetweenSelectedDates.length > 0 && pageNumber === 0) {
      changePageNum(1)
    }

    if (dropdownName) {
      if (tableType === "main page") {
        if (mainpageType === "teacher") {
          getTeacherLessons();
        } else if (mainpageType === "student") {
          getStudentLessons();
        }
      }
    }
  };
  const clearAll = () => {
    dispatch(clearLessonsFilter());
  };
  const changeType = (type) => {
    clearAll()
    changeMainPageType(type)
  };

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/student") {
      if (startDate && endDate) {
        // endDate.setHours(23, 59, 59, 999);
        getWeeksBetweenDates(startDate, endDate);
      } else if (endDate) {
        // endDate.setHours(23, 59, 59, 999);
      }
    }
  }, [endDate]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/student") {
      if (startDate && endDate) {
        // endDate.setHours(23, 59, 59, 999);
        getWeeksBetweenDates(startDate, endDate);
      }
    }
  }, [startDate]);

  useEffect(() => {
    if (weeksBetweenSelectedDates) {
      changePageNum(0)
    }
  }, [weeksBetweenSelectedDates]);


  return (
    <div className="main-card-layout">
      <TableTabs
        changeMainPageType={changeType}
        mainpageType={mainpageType}
      />

      <FilterList clearAll={clearAll} getFilteredLessons={getFilteredLessons} />
    </div>
  );
};
