import React, { useState } from "react";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { ReactComponent as DropdownArrowIcon } from "../../../assets/icons/dashboard/arrow-down.svg";
import "./studentLesson.css";

const StudentLessonModal = ({ students, setOpenStudentModal }) => {
  const [openStatus, setOpenStatus] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [changeDrop, setChangeDrop] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStudentClick = (studentId) => {
    setOpenStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: !prevStatus[studentId],
    }));
    setSelectedStudentId(studentId);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setSelectedStatus(newStatus);
  };

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
              onClick={() => handleStudentClick(student._id)}
              className={`student-list ${
                selectedStudentId === student._id ? "selected" : ""
              }`}
              key={student._id}
            >
              <h5
              // className={`student-name ${
              //   selectedStatus === "i/e"
              //     ? "green"
              //     : selectedStatus === "q/b"
              //     ? "red"
              //     : ""
              // }`}
              >
                {student.student.fullName}{" "}
                {student._id === selectedStudentId && status}
              </h5>

              <div
                onClick={() => setChangeDrop(!changeDrop)}
                className="drop-icon"
              >
                <DropdownArrowIcon />
              </div>
              {openStatus[student._id] && (
                <div className="status">
                  <button onClick={() => handleStatusChange("i/e")}>
                    {" "}
                    i/e
                  </button>
                  <button onClick={() => handleStatusChange("q/b")}>
                    {" "}
                    q/b
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentLessonModal;
