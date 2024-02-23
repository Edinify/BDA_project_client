import { useSelector } from "react-redux";
import "moment/locale/az";
import { ReactComponent as CancelStudentIcon } from "../../../../assets/icons/user-x-01.svg";
import { ReactComponent as LessonStudents } from "../../../../assets/icons/lesson-users.svg";

const TeacherCells = ({
  time,
  week,
  startWeek,
  groups,
  index,
  openModal,
  selectedWeekDay,
}) => {
  console.log(groups)
  const handleClick = (lesson) => {
    const getLesson = lesson ? [lesson] : [];
    const lessonKeys = {
      time,
      week,
      getLesson,
      startWeek,
      selectedWeekDay,
    };
    openModal(lessonKeys);
  };

  console.log(groups)
  return (
    <td className={`lesson-name teacher-cell`} key={index}>
      <div className="lesson-box-con">
        <ul>
          {groups.map((data) =>{
            const {name, lessonDate } = data

            let date 
            date = lessonDate.find((lesson) => lesson.day ==  index + 1 && lesson.day)
            return(
              <li> { !date && name} </li>
            )
          })}
        </ul>
      </div>
    </td>
  );
};

export default TeacherCells;
