import React from "react";
import "./studentAttendance.css";
import { ReactComponent as InfoCircleIcon } from "../../../../../assets/icons/info-circle.svg";

const StudentAttendence = ({
  changeStudentOwnAttendance,
  lessonData,
  studentOwnStatus,
}) => {
  const handleChange = () => {
    let num = studentOwnStatus !== 2 ? 2 : 0;
    changeStudentOwnAttendance(lessonData[0].students[0]._id, num);
  };

  const changeToPresent = () => {
    changeStudentOwnAttendance(lessonData[0].students[0]._id, 0);
  };
  const changeToAbsent = () => {
    changeStudentOwnAttendance(lessonData[0].students[0]._id, 2);
  };
  return (
    <div className="student-attendance">
      <button
        onClick={changeToPresent}
        className={`student-attendance-btn left ${
          studentOwnStatus !== 2 ? "active" : ""
        }`}
      >
        Iştirak edəcəm
      </button>
      <button
        onClick={changeToAbsent}
        className={`student-attendance-btn right ${
          studentOwnStatus !== 2 ? "" : "active"
        }`}
      >
        Iştirak etməyəcəm
      </button>

      {/*         
      <button
        onClick={handleChange}
        className={`student-attendance-btn ${
          studentOwnStatus !== 2 ? "" : "red"
        }`}
      >
        {studentOwnStatus !== 2 ? "Iştirak etməyəcəm" : "Ləğv et"}
      </button> */}

      <div className="warning-message">
        <div>
          <InfoCircleIcon />
        </div>
        Əgər dərsdə iştirak etmək istəmirsinizsə "Iştirak etməyəcəm" düyməsinə
        klikləyin.
      </div>
    </div>
  );
};

export default StudentAttendence;
