import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import TeacherBonusCard from "./TeacherBonusCard";

const TeacherBonusData = () => {
  const {teacherBonus,teacherFine} = useSelector(state=>state.teacherBonus);

  return (
    <div className="bonus-fine-data">
      {teacherBonus.map((bonus, index) => (
        <TeacherBonusCard key={index} bonus={bonus} />
      ))}
    </div>
  );
};

export default TeacherBonusData;
