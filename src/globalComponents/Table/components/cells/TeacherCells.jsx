import { useSelector } from "react-redux";
import "moment/locale/az";
import { ReactComponent as CancelStudentIcon } from "../../../../assets/icons/user-x-01.svg";
import { ReactComponent as LessonStudents } from "../../../../assets/icons/lesson-users.svg";

const TeacherCells = ({
  time,
  week,
  startWeek,
  getLesson,
  index,
  openModal,
  selectedWeekDay,
}) => {
  // const existCancelledStudent =
  //   getLesson.length > 0 &&
  //   getLesson[0].students.filter((student) => student.attendance === 2);
  // const allStudents = getLesson.length > 0 && getLesson[0].students;
  const { tableType } = useSelector((state) => state.tableType);
  // const { dropdownName } = useSelector((state) => state.dropdownName);
  const lessson1 = getLesson.length > 0 && getLesson[0] && getLesson[0];
  const lessson2 = getLesson.length > 0 && getLesson[1] && getLesson[1];
  const lessson3 = getLesson.length > 0 && getLesson[2] && getLesson[2];
  const lessson4 = getLesson.length > 0 && getLesson[3] && getLesson[3];
  const allLessons = [lessson1, lessson2, lessson3, lessson4];
  const allStudents1 = lessson1 && lessson1.students;
  const allStudents2 = lessson2 && lessson2.students;
  const allStudents3 = lessson3 && lessson3.students;
  const allStudents4 = lessson4 && lessson4.students;
  const existCancelledStudent1 =
    lessson1 && lessson1.students.filter((student) => student.attendance === 2);
  const existCancelledStudent2 =
    lessson2 && lessson2.students.filter((student) => student.attendance === 2);
  const existCancelledStudent3 =
    lessson3 && lessson3.students.filter((student) => student.attendance === 2);
  const existCancelledStudent4 =
    lessson4 && lessson4.students.filter((student) => student.attendance === 2);

  // const checkDay = () => {
  //   const todayDate = new Date();
  //   const lessonDate = new Date(startWeek);
  //   todayDate.setHours(0, 0, 0, 0);
  //   lessonDate.setHours(0, 0, 0, 0);

  //   const beforeDay = moment(lessonDate).isBefore(todayDate);
  //   if (beforeDay && getLesson.length === 0 && dropdownName) {
  //     toast.error("Köhnə dərsi yaratmaq olmur.", {
  //       position: "top-right",
  //       toastClassName: "custom-toast",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   } else {
  //     openModal({ time, week, getLesson, startWeek });
  //   }
  // };

  const handleClick = (lesson) => {
    const getLesson = lesson ? [lesson] : [];
    const lessonKeys = {
      time,
      week,
      getLesson,
      startWeek,
      selectedWeekDay,
      allLessons,
    };
    openModal(lessonKeys);
  };


  return (
    // <td
    //   className={`time lesson-name ${
    //     getLesson.length > 0 ? getLesson[0].status : ""
    //   }`}
    //   key={index}
    //   onClick={() => {
    //     const lessonKeys = {
    //       time,
    //       week,
    //       getLesson,
    //       startWeek,
    //       selectedWeekDay,
    //     };
    //     openModal(lessonKeys);
    //   }}
    // >
    //   {existCancelledStudent.length > 0 && tableType === "main page" && (
    //     <div className="icons-con">
    //       <CancelStudentIcon />
    //       <p>{existCancelledStudent.length}</p>
    //     </div>
    //   )}

    //   {allStudents && tableType !== "main page" && (
    //     <div className="icons-con left">
    //       <LessonStudents />
    //       <p>{allStudents ? allStudents.length : 0}</p>
    //     </div>
    //   )}

    //   <h3>{getLesson.length > 0 && getLesson[0].course?.name}</h3>
    //   <p>
    //     {getLesson.length > 0 &&
    //       getLesson[0].status === "unviewed" &&
    //       "Baxılmayıb"}
    //     {getLesson.length > 0 &&
    //       getLesson[0].status === "confirmed" &&
    //       "Təsdiqlənib"}
    //     {getLesson.length > 0 &&
    //       getLesson[0].status === "cancelled" &&
    //       "İmtina edilib"}
    //   </p>
    // </td>

    <td className={`lesson-name teacher-cell`} key={index}>
      <div className="lesson-box-con">
        {/* <div
          onClick={() => handleClick(lessson1)}
          className={`lesson-box ${lessson1 ? lessson1?.status : ""}`}
        >
          {lessson1 ? lessson1.course?.name : ""}
          {allStudents1 && tableType !== "main page" && (
            <div className="icons-con left">
              <LessonStudents />
              <p>{allStudents1 ? allStudents1.length : 0}</p>
            </div>
          )}
          {existCancelledStudent1?.length > 0 && tableType === "main page" && (
            <div className="icons-con">
              <CancelStudentIcon />
              <p>{existCancelledStudent1.length}</p>
            </div>
          )}
        </div> */}
        {/* <div
          onClick={() => handleClick(lessson2)}
          className={`lesson-box ${lessson2 ? lessson2?.status : ""}`}
        >
          {lessson2 ? lessson2.course?.name : ""}
          {allStudents2 && tableType !== "main page" && (
            <div className="icons-con left">
              <LessonStudents />
              <p>{allStudents2 ? allStudents2.length : 0}</p>
            </div>
          )}
          {existCancelledStudent2?.length > 0 && tableType === "main page" && (
            <div className="icons-con">
              <CancelStudentIcon />
              <p>{existCancelledStudent2.length}</p>
            </div>
          )}
        </div> */}
        {/* <div
          onClick={() => handleClick(lessson3)}
          className={`lesson-box ${lessson3 ? lessson3?.status : ""}`}
        >
          {lessson3 ? lessson3.course?.name : ""}
          {allStudents3 && tableType !== "main page" && (
            <div className="icons-con left">
              <LessonStudents />
              <p>{allStudents3 ? allStudents3.length : 0}</p>
            </div>
          )}
          {existCancelledStudent3?.length > 0 && tableType === "main page" && (
            <div className="icons-con">
              <CancelStudentIcon />
              <p>{existCancelledStudent3.length}</p>
            </div>
          )}
        </div> */}
        {/* <div
          onClick={() => handleClick(lessson4)}
          className={`lesson-box ${lessson4 ? lessson4?.status : ""}`}
        >
          {lessson4 ? lessson4.course?.name : ""}
          {allStudents4 && tableType !== "main page" && (
            <div className="icons-con left">
              <LessonStudents />
              <p>{allStudents4 ? allStudents4.length : 0}</p>
            </div>
          )}
          {existCancelledStudent4?.length > 0 && tableType === "main page" && (
            <div className="icons-con">
              <CancelStudentIcon />
              <p>{existCancelledStudent4.length}</p>
            </div>
          )}
        </div> */}
      </div>
    </td>
  );
};

export default TeacherCells;
