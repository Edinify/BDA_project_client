import React, { useState } from "react";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import "./studentLesson.css";

const StudentLessonModal = ({
  setOpenStudentModal,
  setToggleIcon,
  togggleIcon,
  
}) => {

  const [openStatus, setOpenStatus] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [statuses, setStatuses] = useState({});

  const handleStudentClick = (studentId) => {
    setSelectedStudentId(studentId);
    setOpenStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: !prevStatus[studentId],
    }));
  };

  const handleStatusChange = (newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [selectedStudentId]: newStatus,
    }));
  };

  const students = [
    { id: 1, fullName: "Kamran" },
    { id: 2, fullName: "Mahmud" },
    { id: 3, fullName: "Kəmalə" },
  ];

  return (
    <div className="create-update-modal-con">
      <div className="student-lesson-modal">
        <div className="create-update-modal-head">
          <h2>Tələbələr</h2>
          <CloseBtn onClick={() => setOpenStudentModal(false)} />
        </div>
        <div className="students-list">
          {students?.map((student) => (
            <div
              onClick={() =>
                setToggleIcon(togggleIcon === student.id ? "" : student.id)
              }
              // onClick={() => handleStudentClick(student.id)}
              className={`student-list ${
                selectedStudentId === student.id ? "selected" : ""
              }`}
              key={student.id}
            >
              <h5>
                {student.fullName}{" "}
                {statuses[student.id] && (
                  <span className={`status-indicator ${statuses[student.id]}`}>
                    {statuses[student.id]}
                  </span>
                )}
              </h5>

              <div
                onClick={() => {
                  setSelectedStudentId(
                    selectedStudentId === student.id ? "" : student.id
                  );
                  setOpenStatus((prevStatus) => ({
                    ...prevStatus,
                    [student.id]: !prevStatus[student.id],
                  }));
                }}
                className="drop-icon"
              >
                <div className="dropdown-icon">
                  <svg
                    className={togggleIcon === student.id ? "up" : "down"}
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
              {openStatus[student.id] && (
                <div className="status">
                  <button onClick={() => handleStatusChange("i/e")}>i/e</button>
                  <button onClick={() => handleStatusChange("q/b")}>q/b</button>
                </div>
              )}
            </div>
          ))}
        
        </div>
       <div className="confirm-btn">
        <button  onClick={()=>setOpenStudentModal(false)}  >Təsdiqlə</button>
       </div>
      </div>
    </div>
  );
};

export default StudentLessonModal;
