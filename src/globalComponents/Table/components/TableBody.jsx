import React from "react";
import { useSelector } from "react-redux";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
import { TableColumns } from "./TableColumns";

const TableBody = () => {
    const { createLessonModal, changeDropdownNameErr, lessonHours } = useCustomHook();
    const { dropdownName } = useSelector((state) => state.dropdownName);
    const { user } = useSelector((state) => state.user);
    const { tableType } = useSelector((state) => state.tableType);

    const openModal = (lessonKeys) => {
        const time = lessonKeys?.time
        const week = lessonKeys?.week
        const getLesson = lessonKeys?.getLesson
        const startWeek = lessonKeys?.startWeek
        const selectedWeekDay =  lessonKeys?.selectedWeekDay
        const allLessons = lessonKeys?.allLessons
        if (dropdownName || user?.role === "super-admin" || user?.role === "teacher") {
          switch(tableType) {
            case  'main':
              createLessonModal({modalLesson: {time,week,getLesson, allLessons}, openModal: true})
              break;
            case 'temporary page':
              createLessonModal({modalLesson: {time,week,getLesson, startWeek, selectedWeekDay, allLessons}, openModal: true})
              break;
            case 'current':
              createLessonModal({modalLesson: {time,week,getLesson, startWeek, allLessons}, openModal: true})
              break;
            case 'main page':
              getLesson.length > 0 && createLessonModal({modalLesson: {time,week,getLesson, startWeek}, openModal: true})
              break;
            default:
          }
        } else {
          changeDropdownNameErr(true)
        }
      };

  return (
    <tbody>
      {lessonHours.map((time, index) => (
        <TableColumns key={index} time={time} openModal={openModal} />
      ))}
    </tbody>
  );
};

export default TableBody;
