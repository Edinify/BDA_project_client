import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import StudentCells from "./cells/StudentCells";
import TeacherCells from "./cells/TeacherCells";
import TimeCells from "./cells/TimeCells";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
import moment from "moment";
import 'moment/locale/az';

export const TableColumns = ({ time, openModal}) => {
  const location = useLocation();
  const { weeksArr } = useCustomHook();
  const {user} = useSelector(state=>state.user);
  const {mainLessonsData} = useSelector(state => state.mainLessonsData)
  const {currentLessonsData} = useSelector(state => state.currentLessonsData)
  const {mainpageLessonData} = useSelector(state=>state.currentLessonsData);
  const {mainpageType} = useSelector(state=>state.mainpageType);
  const {dropdownName} = useSelector(state=>state.dropdownName)
  const {tableType} = useSelector(state=>state.tableType);
  const {weeksBetweenSelectedDates} = useSelector(state=>state.weeksBetweenSelectedDates);
  const {pageNumber} = useSelector(state=>state.pageNumber);
  const [lessonsData, setLessonsData] = useState('')
  
  useEffect(() => {
    setLessonsData('')
  }, [])

  useEffect(() => {
    if(dropdownName) {
      if(location.pathname === '/table' && tableType === 'current') {
        setLessonsData(currentLessonsData)
      } else if(location.pathname === '/table' && tableType === 'main') {
        setLessonsData(mainLessonsData)
      } else if(location.pathname === '/' || location.pathname === '/student' ) {
        setLessonsData(mainpageLessonData)
      } else if(tableType === 'temporary page') {
        /* temporary table */
        setLessonsData(mainpageLessonData)
      }
    } else {
      setLessonsData('')
    }
  },[dropdownName,currentLessonsData,location.pathname,mainLessonsData,mainpageLessonData,tableType])

  useEffect(() => {
    if(mainpageLessonData && tableType === 'main page') {
      setLessonsData(mainpageLessonData)
    } else if(mainpageLessonData && tableType === 'temporary page') {
      /* temporary table */
      setLessonsData(mainpageLessonData)
    }
  }, [mainpageLessonData, tableType])

  useEffect(() => {
    if(mainLessonsData && tableType === 'main') {
      setLessonsData(mainLessonsData)
    }
  }, [mainLessonsData, tableType])

  useEffect(() => {
    if(currentLessonsData && tableType === 'current') {
      setLessonsData(currentLessonsData)
    }
  }, [currentLessonsData, tableType])

  useEffect(() => {
    if(user?.role === 'teacher' || user?.role === 'student') {
      setLessonsData(mainpageLessonData)
    }
  }, [location, user, mainpageLessonData])



    return (
      <tr>
        {weeksArr.map((week, index) => {
          const {first_time, second_time} = time
          const startWeek = new Date();
          startWeek.setDate(startWeek.getDate() - (startWeek.getDay() === 0 ? 7 : startWeek.getDay()) + 1)
          let weekday = '';
          let selectedWeekDay;
          if(weeksBetweenSelectedDates.length > 0 && pageNumber > 0 ) {
            switch(week) {
              case "B.e": 
                weekday = 1;
                selectedWeekDay = weeksBetweenSelectedDates[pageNumber - 1]?.allWeekDays?.monday              
                break;
              case "Ç.a": 
                weekday = 2;
                selectedWeekDay = weeksBetweenSelectedDates[pageNumber - 1]?.allWeekDays?.tuesday                 
                break;
              case "Ç.": 
                weekday = 3;
                selectedWeekDay = weeksBetweenSelectedDates[pageNumber - 1]?.allWeekDays?.wednesday
                break;
              case "C.a": 
                weekday = 4;
                selectedWeekDay = weeksBetweenSelectedDates[pageNumber - 1]?.allWeekDays?.thursday
                break;
              case "C.": 
                weekday = 5;
                selectedWeekDay = weeksBetweenSelectedDates[pageNumber - 1]?.allWeekDays?.friday
                break;
              case "Ş.": 
                weekday = 6;
                selectedWeekDay = weeksBetweenSelectedDates[pageNumber - 1]?.allWeekDays?.saturday
                break;
              case "B.": 
                weekday = 7;
                selectedWeekDay = weeksBetweenSelectedDates[pageNumber - 1]?.allWeekDays?.sunday
                break;
              default: 
                weekday = '';
            }
          } else {
            switch(week) {
              case "B.e": 
                weekday = 1;
                startWeek.setDate(startWeek.getDate() + 0)              
                break;
              case "Ç.a": 
                weekday = 2;
                startWeek.setDate(startWeek.getDate() + 1)                 
                break;
              case "Ç.": 
                weekday = 3;
                startWeek.setDate(startWeek.getDate() + 2)
                break;
              case "C.a": 
                weekday = 4;
                startWeek.setDate(startWeek.getDate() + 3)
                break;
              case "C.": 
                weekday = 5;
                startWeek.setDate(startWeek.getDate() + 4)
                break;
              case "Ş.": 
                weekday = 6;
                startWeek.setDate(startWeek.getDate() + 5)
                break;
              case "B.": 
                weekday = 7;
                startWeek.setDate(startWeek.getDate() + 6)
                break;
              default: 
                weekday = '';
            }
          }

          const getLesson = lessonsData ?
            lessonsData.filter((lesson) => {
              const checkTime = lesson.time === `${first_time}-${second_time}`
              const checkWeekDay = lesson.day === weekday
              const lessonDate = lesson.date ? moment.utc(new Date(lesson.date)).format( "YYYY-MM-DD") : ''
              const selectedDate = selectedWeekDay ? moment(new Date(selectedWeekDay)).format( "YYYY-MM-DD") : ''
              const currentWeekDate = startWeek ? moment(startWeek).format( "YYYY-MM-DD") : ''
              if(tableType === 'main') {
                if(checkTime && checkWeekDay) {
                  return true
                } else {
                  return false
                }
              } else {
                if(selectedWeekDay) {
                  if(checkTime && checkWeekDay && lessonDate ===  selectedDate) {
                    return true
                  } else {
                    return false
                  }
                } else if(!selectedWeekDay) {
                  if(checkTime && checkWeekDay && lessonDate ===  currentWeekDate) {
                    return true
                  } else {
                    return false
                  }
                }
              }
            })
            : []
          
          if (index===0){
            return (
              <TimeCells 
                key={index} 
                index={index} 
                first_time={first_time} 
                second_time={second_time} 
              />
            )
          } else if(mainpageType === 'teacher') {
            return (
              <TeacherCells 
                key={index}
                time={time} 
                week={week}
                startWeek={startWeek}
                selectedWeekDay={selectedWeekDay}
                getLesson={getLesson} 
                index={index}
                openModal={openModal}
              />
            )
          } else if(mainpageType === 'student') {
            return (
              <StudentCells 
                key={index}
                time={time} 
                week={week}
                startWeek={startWeek}
                getLesson={getLesson} 
                index={index}
                openModal={openModal}
              />
            )
          }
        })}
      </tr>
    )
  };