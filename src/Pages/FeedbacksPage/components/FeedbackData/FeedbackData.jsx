import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TeacherFeedbackData from "./TeacherFeedback/TeacherFeedbackData";
import { StudentFeedbackData } from "./StudentFeedback/StudentFeedbackData";

const FeedbackData = ({ feedbackPageNum, getPageNumberTeacher, getPageNumberStudent }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/feedback/teacher" ? (
        <TeacherFeedbackData
          feedbackPageNum={feedbackPageNum}
          getPageNumber={getPageNumberTeacher}
        />
      ) : (
        <StudentFeedbackData
          feedbackPageNum={feedbackPageNum}
          getPageNumber={getPageNumberStudent}
        />
      )}
    </>
  );
};

export default FeedbackData;
