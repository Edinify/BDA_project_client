import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routing } from "./routing";
import TeacherModal from "./globalComponents/Modals/TeacherModal/TeacherModal";
import { CourseModal } from "./globalComponents/Modals/CourseModal/CourseModal";
import { StudentModal } from "./globalComponents/Modals/StudentModal/StudentModal";
import { TuitionFeeModal } from "./globalComponents/Modals/TuitionFeeModal/TuitionFeeModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConsultationModal } from "./globalComponents/Modals/ConsultationModal/ConsultationModal";
import { GroupModal } from "./globalComponents/Modals/GroupModal/GroupModal";
import WorkerModal from "./globalComponents/Modals/WorkerModal/WorkerModal";
import CareerModal from "./globalComponents/Modals/CareerModal/CareerModal";

//
function App() {
  const { coursesOpenModal } = useSelector((state) => state.coursesModal);
  const { studentsOpenModal } = useSelector((state) => state.studentsModal);
  const { tuitionFeeOpenModal } = useSelector((state) => state.tuitionFeeModal);
  const { groupOpenModal } = useSelector((state) => state.groupModal);
  const { consultationOpenModal } = useSelector(
    (state) => state.consultationModal
  );
  const { teachersOpenModal } = useSelector((state) => state.teachersModal);
  const { workerOpenModal } = useSelector((state) => state.workerModal);
  const { careerOpenModal } = useSelector((state) => state.careerModal);

  useEffect(() => {
    if (coursesOpenModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [coursesOpenModal]);

  useEffect(() => {
    if (studentsOpenModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [studentsOpenModal]);

  useEffect(() => {
    if (teachersOpenModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [teachersOpenModal]);

  return (
    <div className="App">
      <Routing />
      {coursesOpenModal && <CourseModal />}
      {studentsOpenModal && <StudentModal />}
      {tuitionFeeOpenModal && <TuitionFeeModal />}
      {consultationOpenModal && <ConsultationModal />}
      {teachersOpenModal && <TeacherModal />}
      {groupOpenModal && <GroupModal />}
      {workerOpenModal && <WorkerModal />}
      {careerOpenModal && <CareerModal />}
      <ToastContainer />
    </div>
  );
}

export default App;
