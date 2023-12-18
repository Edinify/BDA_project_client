import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import TeacherFineCard from "./TeacherFineCard";


const TeacherFineData = () => {
  const {teacherBonus,teacherFine} = useSelector(state=>state.teacherBonus);
  const dataFine = [
    {
      comment: "lorem consectetur adipiscing",
      fineType: "Verbal warning",
      createdAt: "23.08.2023",
    },
    {
      comment: "lorem consectetur adipiscing",
      fineType: "Verbal warning",
      createdAt: "13.08.2023",
    },
    {
      comment: "lorem consectetur adipiscing",
      fineType: "Verbal warning",
      createdAt: "23.08.2023",
    },
    {
      comment: "lorem consectetur adipiscing",
      fineType: "Verbal warning",
      createdAt: "04.08.2023",
    },
  ];

  return (
    <div className="bonus-fine-data">
      {teacherFine.map((fine, index) => (
        <TeacherFineCard key={index} fine={fine} />
      ))}
    </div>
  );
};

export default TeacherFineData;
