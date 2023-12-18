import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../globalComponents/Table/Table";
import { TempMainHead } from './TempMainHead/TempMainHead'
import { clearLessonsFilter } from "../../redux/actions/clearLessonsFilterAction";
import { getMainpageTableLessonsAction } from "../../redux/actions/mainpageTableLessonsAction";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";
// import ScrollableData from "./ScrollDown";

const TemporaryTable = () => {
  const dispatch = useDispatch()
  const { startWeek, endWeek, changeMainPageType, changeTableType } = useCustomHook();
  const { lessonStatus } = useSelector((state) => state.lessonStatus);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { dropdownName } = useSelector((state) => state.dropdownName);

  const getTemporaryPageLessons = () => {
    if (mainpageType === "teacher") {
      dispatch(
        getMainpageTableLessonsAction({
          teacherId: dropdownName._id,
          startDate: startWeek,
          endDate: endWeek,
          status: lessonStatus === "all" ? "" : lessonStatus,
        })
      );
    }
  };

  useEffect(() => {
    changeMainPageType("teacher")
    changeTableType("temporary page")
    dispatch(clearLessonsFilter());
    // return () => {dispatch(clearLessonsFilter())};
  }, []);

  return (
    <div className="main">
      <TempMainHead />
      <Table getTemporaryPageLessons={getTemporaryPageLessons}/>
      {/* <ScrollableData /> */}
    </div>
  );
};

export default TemporaryTable;
