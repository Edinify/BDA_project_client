import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../globalComponents/Table/Table";
import { MainHead } from './MainHead/MainHead'
import { clearLessonsFilter } from "../../redux/actions/clearLessonsFilterAction";
import { getMainpageTableLessonsAction } from "../../redux/actions/mainpageTableLessonsAction";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const Main = () => {
  const dispatch = useDispatch()
  const { startWeek, endWeek, changeMainPageType, changeTableType } = useCustomHook();
  const { lessonStatus } = useSelector((state) => state.lessonStatus);
  const { studentAttendance } = useSelector((state) => state.studentAttendance);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { dropdownName } = useSelector((state) => state.dropdownName);

  const getMainPageLessons = () => {
      if (mainpageType === "teacher") {
        dispatch(
          getMainpageTableLessonsAction({
            teacherId: dropdownName._id,
            startDate: startWeek,
            endDate: endWeek,
            status: lessonStatus === "all" ? "" : lessonStatus,
          })
        );
      } else if (mainpageType === "student") {
        dispatch(
          getMainpageTableLessonsAction({
            studentId: dropdownName._id,
            startDate: startWeek,
            endDate: endWeek,
            attendance: studentAttendance === "all" ? "" : studentAttendance,
          })
        );
      }
  };

  useEffect(() => {
    changeMainPageType("teacher")
    changeTableType("main page")
    dispatch(clearLessonsFilter());
  }, []);


  return (
    <div className="main">
      <MainHead />
      <Table getMainPageLessons={getMainPageLessons}/>
    </div>
  );
};

export default Main;
