import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as PlusIcon } from "../../../../../assets/icons/bluePlus.svg";
import { ReactComponent as DeleteCheckedClassImg } from "../../../../../assets/icons/X.svg";
import { getstudentsByCourseIdAction } from "../../../../../redux/actions/studentsActions";

const AddStudents = ({
  checkedStudents,
  setCheckedStudents,
  setStudentAddModal,
  disabled,
  selectedCourse,
  weekday,
  modalLesson,
}) => {
  const dispatch = useDispatch();
  const [addErrMessage, setAddErrMessage] = useState(false);
  const lessonDate = modalLesson?.selectedWeekDay
    ? modalLesson?.selectedWeekDay
    : modalLesson?.startWeek;

  const deleteCheckedStudent = (deletedStudentId) => {
    const removeUnchecked =
      Array.isArray(checkedStudents) &&
      checkedStudents.filter(
        (checkedStudent) => checkedStudent.student._id !== deletedStudentId
      );
    setCheckedStudents(removeUnchecked);
  };
  const openStudentModal = () => {
    if (selectedCourse) {
      setAddErrMessage(false);
      setStudentAddModal(true);

      dispatch(
        getstudentsByCourseIdAction({
          courseId: selectedCourse._id,
          day: weekday,
          time: `${modalLesson?.time.first_time}-${modalLesson?.time.second_time}`,
          role: "current",
          date: lessonDate,
          studentsCount: 0,
          searchQuery: "",
        })
      );
    } else {
      setAddErrMessage(true);
    }
  };

  return (
    <div className="table-modal-students">
      <h4>Tələbə:</h4>
      <div className="checked-students">
        {checkedStudents.length > 0 &&
          checkedStudents.map((checkedStudent) => (
            <div key={checkedStudent.student._id} className="checked-student">
              <h5>{checkedStudent.student.fullName}</h5>
              {!disabled && (
                <div
                  onClick={() =>
                    deleteCheckedStudent(checkedStudent.student._id)
                  }
                >
                  <DeleteCheckedClassImg />
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="table-add-student-con">
        {addErrMessage && (
          <small className="err-message">Dərs seçilməlidir.</small>
        )}
        {!disabled && (
          <button onClick={openStudentModal} className="table-add-student">
            <PlusIcon />
            Əlavə et
          </button>
        )}
      </div>
    </div>
  );
};

export default AddStudents;
