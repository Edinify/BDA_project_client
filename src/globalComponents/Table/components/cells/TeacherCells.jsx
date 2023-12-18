import { useSelector } from "react-redux";
import "moment/locale/az";
import { ReactComponent as CancelStudentIcon } from "../../../../assets/icons/user-x-01.svg";
import { ReactComponent as LessonStudents } from "../../../../assets/icons/lesson-users.svg";
import moment from "moment";
import { toast } from "react-toastify";

const TeacherCells = ({
  time,
  week,
  startWeek,
  getLesson,
  index,
  openModal,
  selectedWeekDay,
}) => {
  const existCancelledStudent =
    getLesson.length > 0 &&
    getLesson[0].students.filter((student) => student.attendance === 2);
  const allStudents = getLesson.length > 0 && getLesson[0].students;
  const { tableType } = useSelector((state) => state.tableType);
  const { dropdownName } = useSelector((state) => state.dropdownName);



  const checkDay = () => {
    const todayDate = new Date();
    const lessonDate = new Date(startWeek);
    todayDate.setHours(0, 0, 0, 0);
    lessonDate.setHours(0, 0, 0, 0);

    const beforeDay = moment(lessonDate).isBefore(todayDate);
    if (beforeDay && getLesson.length === 0 && dropdownName) {
      toast.error("Köhnə dərsi yaratmaq olmur.", {
        position: "top-right",
        toastClassName: "custom-toast",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      openModal({ time, week, getLesson, startWeek });
    }
  };


  return (
    <td
      className={`time lesson-name ${
        getLesson.length > 0 ? getLesson[0].status : ""
      }`}
      key={index}
      onClick={() => {
        const lessonKeys = {
          time,
          week,
          getLesson,
          startWeek,
          selectedWeekDay,
        };
        openModal(lessonKeys);
      }}
    >
      {existCancelledStudent.length > 0 && tableType === "main page" && (
        <div className="icons-con">
          <CancelStudentIcon />
          <p>{existCancelledStudent.length}</p>
        </div>
      )}

      {allStudents && tableType !== "main page" && (
        <div className="icons-con left">
          <LessonStudents />
          <p>{allStudents ? allStudents.length : 0}</p>
        </div>
      )}

      <h3>{getLesson.length > 0 && getLesson[0].course?.name}</h3>
      <p>
        {getLesson.length > 0 &&
          getLesson[0].status === "unviewed" &&
          "Baxılmayıb"}
        {getLesson.length > 0 &&
          getLesson[0].status === "confirmed" &&
          "Təsdiqlənib"}
        {getLesson.length > 0 &&
          getLesson[0].status === "cancelled" &&
          "İmtina edilib"}
      </p>
    </td>

  );
};

export default TeacherCells;
