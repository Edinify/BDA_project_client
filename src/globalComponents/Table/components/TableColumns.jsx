import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import StudentCells from "./cells/StudentCells";
import TeacherCells from "./cells/TeacherCells";
import TimeCells from "./cells/TimeCells";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
import moment from "moment";
import "moment/locale/az";

export const TableColumns = ({ time }) => {
  const { weeksArr } = useCustomHook();

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
            />
          );
        }
      })}
    </tr>
  );
};
