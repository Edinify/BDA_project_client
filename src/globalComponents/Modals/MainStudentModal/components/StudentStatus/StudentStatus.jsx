import React from "react";

const StudentStatus = ({ lessonData }) => {
  return (
    <div className="content-con student-status">
      <p className="content-type">Status: </p>
      <p className={`content-text 
          ${lessonData[0]?.students[0]?.attendance === 0 && "purple"}
          ${lessonData[0]?.students[0]?.attendance === 1 && "green"}
          ${lessonData[0]?.students[0]?.attendance === -1 && "red"}
          ${lessonData[0]?.students[0]?.attendance === 2 && "orange"}
      `}>
        {lessonData[0]?.students[0]?.attendance === 0 && "Yoxlanılmayıb"}
        {lessonData[0]?.students[0]?.attendance === 1 && "İştirak edilib"}
        {lessonData[0]?.students[0]?.attendance === -1 && "İştirak edilməyib"}
        {lessonData[0]?.students[0]?.attendance === 2 && "İştirak edilməyəcək"}
      </p>
    </div>
  );
};

export default StudentStatus;
