import { useEffect, useState } from "react";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLessonsDataInMainPanelAction } from "../../../redux/actions/currentLessonsDataAction";
import moment from "moment";
import "moment/locale/az";
import Rate from "./components/Rate/Rate";
import RateResult from "./components/Rate/RateResult";
import ContentCon from "./components/ContentCon/ContentCon";
import StudentStatus from "./components/StudentStatus/StudentStatus";
import StudentAttendence from "./components/StudentAttendence/StudentAttendence";
import SaveButton from "./components/Buttons/SaveButton";
import ModalStudents from "./components/ModalStudents/ModalStudents";

const MainStudentModal = ({ showModal, handleClose }) => {
  const dispatch = useDispatch();
  const { modalLesson } = useSelector((state) => state.modalLesson);
  const { tableType } = useSelector((state) => state.tableType);
  const { user } = useSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const lessonData = modalLesson.getLesson;
  const todayDate = new Date();
  const lessonDate = new Date(lessonData[0].date);
  todayDate.setHours(0, 0, 0, 0);
  lessonDate.setHours(0, 0, 0, 0);
  const tomorrowLesson =
    moment(lessonDate).format("DD MM YYYY") ===
    moment().add(1, "day").startOf("day").format("DD MM YYYY");
  const tonightTen = moment().clone().set({ hour: 22, minute: 0, second: 0 });
  const futureLesson = moment(lessonDate).isAfter(todayDate);
  const todayLesson =
    moment(lessonDate).format("DD MM YYYY") ===
    moment(todayDate).format("DD MM YYYY");
  const [toggleIcon, setToggleIcon] = useState(true);
  const showHideClassName = showModal
    ? "main-table-modal display-block"
    : "main-table-modal display-none";
  const [updatedResultData, setUpdatedResultData] = useState("");
  const [updatedPart, setUpdatedPart] = useState();
  const [studentOwnStatus, setStudentOwnStatus] = useState(
    lessonData[0]?.students[0]?.attendance
  );
  const [showRating, setShowRating] = useState(() => {
    if(lessonData[0].status !== 'cancelled') {
      if(studentOwnStatus === 1) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  })
  const [showSaveButton, setShowSaveButton] = useState(() => {
    if(user?.role === "student") {
      if(showRating) {
        return true
      } else if(futureLesson && !tomorrowLesson) {
        return true
      } else if(tomorrowLesson && !moment().isAfter(tonightTen)) {
        return true
      } else {
        return false
      }
    } else if(!futureLesson) {
      return true
    } else {
      return false
    }
  })
  const changeAttendance = (id, value) => {
    setStudentOwnStatus(value);
    const changedStudents = updatedResultData.students.map((item) =>
      item._id === id ? { ...item, attendance: value } : item
    );
    setUpdatedResultData({
      ...updatedResultData,
      students: changedStudents,
    });
    setToggleIcon("");
  };
  const changeStudentOwnAttendance = (id, value) => {
    setStudentOwnStatus(value);
    const changedStudents = updatedResultData.students.map((item) =>
      item._id === id ? { ...item, attendance: value } : item
    );
    setUpdatedResultData({
      ...updatedResultData,
      students: changedStudents,
    });
  };
  const closeModal = () => {
    handleClose();
    setToggleIcon("");
  };

  useEffect(() => {
    setUpdatedResultData({ ...lessonData[0] });
  }, [lessonData]);

  useEffect(() => {
    if (updatedResultData) {
      setUpdatedPart({
        course: updatedResultData.course?._id,
        status: updatedResultData.status,
        teacher: updatedResultData.teacher?._id,
        students: updatedResultData.students.map((item) => {
          return { ...item, student: item.student._id };
        }),
      });
    }
  }, [updatedResultData]);


  return (
    <div className={showHideClassName}>
      <section className="main-table-modal-con">
        <div>
          <button className="close-btn" onClick={closeModal}>
            <CloseBtn />
          </button>

          <div className="table-modal-content">
            <div className="modal-header">
              <ContentCon lessonData={lessonData} name={"Müəllim"} />
              <ContentCon lessonData={lessonData} name={"Fənn"} />
              <ContentCon lessonData={lessonData} name={"Tarix"} />
              <ContentCon lessonData={lessonData} name={"Vaxt"} />
              <ContentCon lessonData={lessonData} name={"Tapşırıqlar"} />
            </div>

            {user?.role === "student" ? (
              <>
                {!futureLesson && <StudentStatus lessonData={lessonData} />}
                {futureLesson && !tomorrowLesson && (
                  <StudentAttendence
                    changeStudentOwnAttendance={changeStudentOwnAttendance}
                    lessonData={lessonData}
                    studentOwnStatus={studentOwnStatus}
                  />
                )}

                {tomorrowLesson && !moment().isAfter(tonightTen) && (
                  <StudentAttendence
                    changeStudentOwnAttendance={changeStudentOwnAttendance}
                    lessonData={lessonData}
                    studentOwnStatus={studentOwnStatus}
                  />
                )}

                {showRating && (
                  <Rate
                    setUpdatedResultData={setUpdatedResultData}
                    updatedResultData={updatedResultData}
                    data={lessonData[0]?.students[0]}
                    studentObjectId={lessonData[0]?.students[0]?._id}
                  />
                )}
              </>
            ) : (
              <>
                {showRating && (
                  <RateResult className="content-con" lessonData={lessonData} />
                )}

                <ModalStudents
                  futureLesson={futureLesson}
                  updatedResultData={updatedResultData}
                  setToggleIcon={setToggleIcon}
                  toggleIcon={toggleIcon}
                  changeAttendance={changeAttendance}
                />
              </>
            )}

            {/* save buttons */}
            {showSaveButton && <SaveButton updatedResultData={updatedResultData} updatedPart={updatedPart} mode={"desktop"} />}
          </div>
        </div>

        {/* save buttons */}
        {showSaveButton && <SaveButton updatedResultData={updatedResultData} updatedPart={updatedPart} mode={"mobile"} />}
      </section>
    </div>
  );
};

export default MainStudentModal;
