import React from "react";

const ModalStudents = ({
  futureLesson,
  updatedResultData,
  setToggleIcon,
  toggleIcon,
  changeAttendance,
}) => {
  return (
    <div className="modal-students content-con">
      <p className="content-type">Tələbə: </p>
      <div className={`students ${futureLesson ? "disabled" : ""} `}>
        {updatedResultData.course &&
          updatedResultData.students.map((child, i) => (
            <div key={i} className="student-dropdown">
              <div
                className={`student ${
                  child.attendance === -1
                    ? "red"
                    : child.attendance === 1
                    ? "green"
                    : child.attendance === 2
                    ? "orange"
                    : ""
                }`}
                onClick={() =>
                  setToggleIcon(
                    toggleIcon === child.student._id ? "" : child.student._id
                  )
                }
              >
                <div className="student-name">{child.student?.fullName}</div>

                <div className="dropdown-icon">
                  <svg
                    className={toggleIcon === child.student._id ? "up" : "down"}
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
              <div
                className={`child-status ${
                  toggleIcon === child.student._id ? "active" : ""
                }`}
              >
                <p onClick={() => changeAttendance(child._id, -1)}>q/b</p>
                <p onClick={() => changeAttendance(child._id, 1)}>i/e</p>
                <p onClick={() => changeAttendance(child._id, 2)}>ü/q</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ModalStudents;
