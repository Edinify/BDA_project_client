import TeacherCells from "./cells/TeacherCells";
import TimeCells from "./cells/TimeCells";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
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
