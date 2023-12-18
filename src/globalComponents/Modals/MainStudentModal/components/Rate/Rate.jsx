import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";


const Rate = ({
  setUpdatedResultData,
  updatedResultData,
  studentObjectId,
  data
}) => {

  const [rating, setRating] = useState(data?.ratingByStudent ? data.ratingByStudent : null);
  const [studentNote, setStudentNote] = useState(data?.feedback ? data.feedback : '');
  const [hover, setHover] = useState(null);

  const changeRating = (rate) => {
    if(updatedResultData && updatedResultData.students) {
      const changedStudents = updatedResultData.students.map((item) =>
        item._id === studentObjectId ? { ...item, ratingByStudent: rate } : item
      );
      setUpdatedResultData({
        ...updatedResultData,
        students: changedStudents,
      });
    }
  };
  const changeNote = (note) => {
    if(updatedResultData && updatedResultData.students) {
      const changedStudents = updatedResultData.students.map((item) =>
        item._id === studentObjectId ? { ...item, feedback: note } : item
      );
      setUpdatedResultData({
        ...updatedResultData,
        students: changedStudents,
      });
    }
  };

  useEffect(() =>{
      changeRating(rating)
  }, [rating])
  useEffect(() =>{
      changeNote(studentNote)
  }, [studentNote])


  return (
    <div className="rate-container">
      <textarea
        name="student-msg"
        id="student"
        cols="10"
        rows="10"
        value={studentNote ? studentNote : ""}
        onChange={(e) => setStudentNote(e.target.value)}
      ></textarea>

      <div className="rate-comp">
        {[...Array(5)].map((star, i) => {
          const currentRating = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />
              <FaStar
                className="star"
                size={30}
                color={
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Rate;
