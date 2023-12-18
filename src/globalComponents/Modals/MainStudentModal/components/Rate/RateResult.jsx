import React from "react";
import { ReactComponent as StarIcon } from "../../../../../assets/icons/star-rate.svg";

export default function RateResult({ lessonData, className }) {
  const stars = Array(lessonData.length > 0 ? lessonData[0].students[0].ratingByStudent : 0).fill(null);

  return (
    <div className="student-rate">
      <div className={className}>
        <p className="content-type">Tələbə qeydi: </p>
        <p className="content-text">
          {lessonData.length > 0 ? lessonData[0].students[0].feedback : ""}
        </p>
      </div>

      <div className={className}>
        <p className="content-type">Tələbə qiymətləndirməsi: </p>
        <p className="content-text stars">
          {stars?.length} <StarIcon />
        </p>
      </div>
    </div>
  );
}
