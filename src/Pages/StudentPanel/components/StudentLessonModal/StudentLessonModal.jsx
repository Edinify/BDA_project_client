import React from "react";
import "./studentLessonModal.css";
import { useSelector } from "react-redux";

const StudentLessonModal = ({openLessonModal}) => {
  const user = useSelector((state) => state.user);

  return (
    <div className={`student-lesson-modal ${openLessonModal ? "active" : ""}`}>
      <div className="student-lesson-modal-con">
        <div className="student-lesson-modal-content">
          <h2>Dərs xatırlatıcı</h2>
          <div>
            {user?.user?.courses?.map((course, i) => (
              <ul key={i}>
                <li>
                  <p>
                    Dərs: <span>{course.course?.name} </span>{" "}
                  </p>
                  <p>
                    Dərs sayı: <span>{course.lessonAmount} </span>
                  </p>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLessonModal;
