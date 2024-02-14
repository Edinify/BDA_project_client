import React, { useState } from "react";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import "./studentLesson.css";
import { useDispatch } from "react-redux";
import { updateLessonTableAction } from "../../../redux/actions/lessonTableActions";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";

const StudentLessonModal = ({ students, setStudents }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [togggleIcon, setToggleIcon] = useState("");
  const dispatch = useDispatch();

  const handleStudentClick = (studentId) => {
    setSelectedStudentId(studentId);
  };

  const updateLessonStudents = () => {
    dispatch(
      updateLessonTableAction(students.lessonId, {
        students: students.data.map((item) => ({
          ...item,
          student: item.student._id,
        })),
      })
    );
  };


  const getBackgroundColor = (item) => {
    if (item.attendance === 1) {
      return "#D4FFBF";
    } else if (item.attendance === -1) {
      return "#FFCED1";
    } else {
      return "";
    }
  };

  const handleStatusChange = (newItem) => {
    const newStudentsList = students.data.map((item) =>
      item._id == newItem._id ? newItem : item
    );
    setStudents({ ...students, data: newStudentsList });
  };

  // console.log(students, "students kljjlkjkk");
  return (
    <div className="create-update-modal-con">
      <div className="student-lesson-modal">
        <div className="create-update-modal-head">
          <p className="content-type" >Tələbələr</p>
          <CloseBtn
            onClick={() =>
              dispatch({
                type: LESSON_TABLE_MODAL_ACTION_TYPE.STUDENT_MODAL,
                payload: false,
              })
            }
          />
        </div>
        <div className="students-list">
          {students.data?.map((item) => (
            <div
              style={{backgroundColor:getBackgroundColor(item)}}
              onClick={() =>
                setToggleIcon(
                  togggleIcon == item.student._id ? "" : item.student._id
                )
              }
              // onClick={() => handleStudentClick(student.id)}
              className={`student-list ${
                selectedStudentId === item.student._id ? "selected" : ""
              }`}
              key={item.student._id}
            >
              <div className="student-name" >{item.student.fullName}</div>

              <div
                onClick={() => {
                  setSelectedStudentId(
                    selectedStudentId === item.student._id
                      ? ""
                      : item.student._id
                  );
                }}
                className="drop-icon"
              >
                <div className="dropdown-icon">
                  <svg
                    className={togggleIcon === item.student._id ? "up" : "down"}
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9465 5.95337L7.79316 5.95337L4.05317 5.95337C3.41317 5.95337 3.09317 6.7267 3.5465 7.18004L6.99983 10.6334C7.55317 11.1867 8.45317 11.1867 9.0065 10.6334L10.3198 9.32003L12.4598 7.18003C12.9065 6.7267 12.5865 5.95337 11.9465 5.95337Z"
                      fill="#717171"
                    />
                  </svg>
                </div>
              </div>
              {togggleIcon == item.student._id && (
                <div
                className={`status ${
                  togggleIcon === item.student._id ? "active" : ""
                }`}
              >
                  <p
                    onClick={() =>
                      handleStatusChange({ ...item, attendance: 1 })
                    }
                  >
                    i/e
                  </p>
                  <p
                    onClick={() =>
                      handleStatusChange({ ...item, attendance: -1 })
                    }
                  >
                    q/b
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="confirm-btn">
          <button onClick={updateLessonStudents}>Təsdiqlə</button>
        </div>
      </div>
    </div>
  );
};

export default StudentLessonModal;
