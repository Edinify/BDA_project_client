import { useSelector } from "react-redux";
import { ReactComponent as CloseIcon } from "../../assets/icons/more-modal/x-close.svg";
import "moment/locale/az";
import StudentConfirmModal from "./components/StudentConfirmModal/StudentConfirmModal";
import TeacherConfirmModal from "./components/TeacherConfirmModal/TeacherConfirmModal";
import ConsultationConfirmModal from "./components/ConsultationConfirmModal.jsx/ConsultationConfirmModal";
import LessonTableConfirmModal from "./components/LessonTableConfirmModal/LessonTableConfirmModal";
import CoursesConfirmModal from "./components/CoursesConfirmModal/CoursesConfirmModal";
import SyllabusConfirmModal from "./components/SyllabusConfirmModal/SyllabusConfirmModal";
import WorkersConfirmModal from "./components/WorkersConfirmModal/WorkersConfirmModal";
import GroupsConfirmModal from "./components/GroupsConfirmModal/GroupsConfirmModal";
const ConfirmModal = ({ setOpenConfirmModal, type }) => {
  const { teachersModalData } = useSelector((state) => state.teachersModal);
  const { studentsModalData } = useSelector((state) => state.studentsModal);
  const { coursesModalData } = useSelector((state) => state.coursesModal);
  // const { tuitionFeeModalData } = useSelector((state) => state.tuitionFeeModal);
  const { consultationModalData } = useSelector(
    (state) => state.consultationModal
  );
  const { lessonTableModalData } = useSelector(
    (state) => state.lessonTableModal
  );
  const { syllabusModalData } = useSelector((state) => state.syllabusModal);
  const { workerModalData } = useSelector((state) => state.workerModal);
  const { groupModalData } = useSelector((state) => state.groupModal);

  const getTypeHeader = (type) => {
    switch (type) {
      case "teacher":
      case "student":
      case "consultation":
        return "Şəxsi məlumatlar";
      case "lesson-table":
        return "Qrup məlumatları";
      case "courses":
        return "Fənn məlumatları";
      case "syllabus":
        return "Sillabus məlumatları";
      case "workers":
        return "Əməkdaş məlumatları";
      case "groups":
        return "Qrup məlumatları";
      default:
        return "";
    }
  };

  return (
    <div className="more-modal">
      <div className="more-modal-con">
        <div className="more-modal-header">
         <h2>{getTypeHeader(type)}</h2>
          <div className="more-modal-header-icons">
            <div className="header-icon-close">
              <CloseIcon onClick={() => setOpenConfirmModal(false)} />
            </div>
          </div>
        </div>

        {type === "student" && (
          <StudentConfirmModal studentsModalData={studentsModalData} />
        )}
        {type === "teacher" && (
          <TeacherConfirmModal teachersModalData={teachersModalData} />
        )}
        {type === "consultation" && (
          <ConsultationConfirmModal
            consultationModalData={consultationModalData}
          />
        )}
        {type === "lesson-table" && (
          <LessonTableConfirmModal
            lessonTableModalData={lessonTableModalData}
          />
        )}
        {type === "courses" && (
          <CoursesConfirmModal coursesModalData={coursesModalData} />
        )}
        {type === "syllabus" && (
          <SyllabusConfirmModal syllabusModalData={syllabusModalData} />
        )}
        {type === "workers" && (
          <WorkersConfirmModal workerModalData={workerModalData} />
        )}
        {type === "groups" && (
          <GroupsConfirmModal groupModalData={groupModalData} />
        )}

        {/* {type === "tuitionFee" && (
          <TuitionFeeMoreModal tuitionFeeModalData={tuitionFeeModalData} />
        )}
       
        )}  */}
        <div className="confirm-btns">
          <button className="cancel">Ləğv et</button>
          <button className="confirm">Təsdiqlə</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
