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

  return (
    <div className="more-modal">
      <div className="more-modal-con">
        <div className="more-modal-header">
          {type === "teacher" ||
          type === "student" ||
          type === "consultation" ? (
            <h2>Şəxsi məlumatlar</h2>
          ) : type === "lesson-table" ? (
            <h2>Qrup məlumatları</h2>
          ) : type === "courses" ? (
            <h2>Fənn məlumatları</h2>
          ) : type === "syllabus" ? (
            <h2>Sillabus məlumatları</h2>
          ) : type === "workers" ? (
            <h2>Əməkdaş məlumatları</h2>
          ) : type === "groups" ? (
            <h2>Qrup məlumatları</h2>
          ) : (
            ""
          )}
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
