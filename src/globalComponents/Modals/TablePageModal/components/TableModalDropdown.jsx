import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/Checkbox.svg";
import { ReactComponent as ArrowIcon } from "../../../../assets/icons/table-modal-arrow-down.svg";
import moment from "moment";
import "moment/locale/az";
import { STUDENTS_ALL_ACTIONS_TYPE } from "../../../../redux/actions-type";

const TableModalDropdown = ({
  type,
  modalLesson,
  selectedCourse = [],
  setSelectedCourse,
  setCheckedStudents,
}) => {
  const dispatch = useDispatch();
  const functionType = modalLesson.getLesson.length > 0 ? "update" : "create";
  const { dropdownName } = useSelector((state) => state.dropdownName);
  const { tableType } = useSelector((state) => state.tableType);
  const [openDropdown, setOpenDropdown] = useState(false);
  const lessonDate = modalLesson.startWeek
  const hours = `${modalLesson?.time.first_time} - ${modalLesson?.time.second_time}`;
  const teacherName =
    dropdownName &&
    `
  ${dropdownName?.fullName.split(" ")[0]} ${
      dropdownName?.fullName.split(" ")[1] &&
      dropdownName?.fullName.split(" ")[1].substring(0, 1) + "."
    }`;
  const [disable, setDisable] = useState(() => {
    if (functionType === "create" && type !== "courses") {
      return true;
    } else if (functionType === "update") {
      return true;
    }
  });
  const allLessonsCourseIds = modalLesson?.allLessons
    ? modalLesson.allLessons.map((lesson) => {
        return lesson?.course?._id;
      })
    : [];

  const getstudentsByCourse = (item) => {
    setSelectedCourse(item);
    setOpenDropdown(false);
    setCheckedStudents([]);
    dispatch({
      type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD,
      payload: { students: [] },
    });
  };

  return (
    <div className={`modal-dropdown ${disable ? "disabled" : ""}`}>
      <div
        className="dropdown-head"
        onClick={(e) => setOpenDropdown(!openDropdown)}
      >
        <div className="drop-content">
          <h4>
            {type === "teachers" && "Müəllim adı"}
            {type === "courses" && "Fənn"}
            {type === "date" && "Tarix"}
            {type === "time" && "Vaxt"}
          </h4>
          {type === "teachers" && <p>{teacherName}</p>}
          {type === "courses" && <p>{selectedCourse?.name}</p>}
          {type === "time" && <p>{hours}</p>}
          {type === "date" && modalLesson && (
            <p>
              {modalLesson?.week}
              {tableType === "current" &&
                ` - ${moment(lessonDate)
                    .locale("az")
                    .format("DD MMM. YYYY")}`}
            </p>
          )}
        </div>

        {type === "courses" && (
          <div className={`dropdown-icon-con ${openDropdown ? "up" : "down"}`}>
            <ArrowIcon />
          </div>
        )}
      </div>

      {type === "courses" && (
        <ul className={`dropdown-body ${openDropdown ? "active" : ""}`}>
          {dropdownName &&
            dropdownName.courses
              .filter((course) => allLessonsCourseIds.indexOf(course._id) < 0)
              .map((item) => (
                <li onClick={() => getstudentsByCourse(item)} key={item._id}>
                  {item?._id === selectedCourse?._id && <CheckIcon />}
                  {item.name}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};

export default TableModalDropdown;
