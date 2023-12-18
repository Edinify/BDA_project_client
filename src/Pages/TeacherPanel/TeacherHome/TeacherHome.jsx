import React, { useEffect } from 'react'
import './teacherHome.css'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import TeacherLessonsAmounts from './components/TeacherLessonAmounts/TeacherLessonAmounts';
import TeacherLessonStatistics from './components/TeacherLessonStatistics/TeacherLessonStatistics'
import TeacherBonus from './components/TeacherBonus/TeacherBonus';
import TeacherSalary from './components/TeacherSalary/TeacherSalary';
import TeacherFeedback from './components/TeacherFeedback/TeacherFeedback';
import { useCustomHook } from '../../../globalComponents/GlobalFunctions/globalFunctions';

const TeacherHome = () => {
  const dispatch = useDispatch()
  const location = useLocation();

  return (
    <div className="teacher-home">
      <div className="container">
        <div className="top">
        <TeacherLessonsAmounts />
        <TeacherLessonStatistics mode='desktop' />
        </div>

        <div className="bottom">
          <TeacherBonus />
          <TeacherSalary />
          <TeacherFeedback />
        </div>
      </div>
    </div>
  )
}

export default TeacherHome