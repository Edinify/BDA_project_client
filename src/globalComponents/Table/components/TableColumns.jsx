import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import StudentCells from "./cells/StudentCells";
import TeacherCells from "./cells/TeacherCells";
import TimeCells from "./cells/TimeCells";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
import moment from "moment";
import "moment/locale/az";

export const TableColumns = ({ time, openModal }) => {
  const location = useLocation();
  const { weeksArr } = useCustomHook();
  const { user } = useSelector((state) => state.user);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { tableType } = useSelector((state) => state.tableType);
  const { weeksBetweenSelectedDates } = useSelector(
    (state) => state.weeksBetweenSelectedDates
  );
  const { pageNumber } = useSelector((state) => state.pageNumber);
  const [lessonsData, setLessonsData] = useState("");

  useEffect(() => {
    setLessonsData("");
  }, []);
  console.log(time.groups);

  return (
    <tr>
      {weeksArr.map((week, index) => {
        if (index === 0) {
          return <TimeCells key={index} index={index} time={time.time} />;
        } else {
          return (
            <TeacherCells
              key={index}
              time={time}
              week={week}
              groups={time.groups}
              index={index}
              openModal={openModal}
            />
          );
        }
      })}
    </tr>
  );
};
