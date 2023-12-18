import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMainpageTableLessonsAction } from "../../../redux/actions/mainpageTableLessonsAction";
import { PAGINATION_PAGE_NUMBER_ACTION_TYPE } from "../../../redux/actions-type";
import { clearLessonsFilter } from "../../../redux/actions/clearLessonsFilterAction";
import "moment/locale/az";
import FilterList from "./components/FilterList/FilterList";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";

export const TempMainHead = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getWeeksBetweenDates, startWeek, endWeek } = useCustomHook();
  const { dropdownName } = useSelector((state) => state.dropdownName);
  const { lessonStatus } = useSelector((state) => state.lessonStatus);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { weeksBetweenSelectedDates } = useSelector((state) => state.weeksBetweenSelectedDates);
  const { pageNumber } = useSelector((state) => state.pageNumber);

  const changePageNum = (number) => {
    dispatch({
      type: PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,
      payload: number,
    });
  };
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
  const getFilteredLessons = () => {
    if (weeksBetweenSelectedDates.length > 0 && pageNumber === 0) {
      changePageNum(1);
    }

    if (dropdownName) {
      if (mainpageType === "teacher") {
        getTeacherLessons();
      }
    }
  };
  const clearAll = () => {
    dispatch(clearLessonsFilter());
  };

  useEffect(() => {
    if (location.pathname === "/temporary-table") {
      if (startDate && endDate) {
        // endDate.setHours(23, 59, 59, 999);
        getWeeksBetweenDates(startDate, endDate);
      } else if (endDate) {
        // endDate.setHours(23, 59, 59, 999);
      }
    }
  }, [endDate]);

  useEffect(() => {
    if (location.pathname === "/temporary-table") {
      if (startDate && endDate) {
        // endDate.setHours(23, 59, 59, 999);
        getWeeksBetweenDates(startDate, endDate);
      }
    }
  }, [startDate]);

  useEffect(() => {
    if (weeksBetweenSelectedDates) {
      changePageNum(0);
    }
  }, [weeksBetweenSelectedDates]);

  return (
    <div className="main-card-layout">
      <FilterList clearAll={clearAll} getFilteredLessons={getFilteredLessons} />
    </div>
  );
};
