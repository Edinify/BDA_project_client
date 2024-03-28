import { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routing } from "./routing";
import TeacherModal from "./globalComponents/Modals/TeacherModal/TeacherModal";
import { CourseModal } from "./globalComponents/Modals/CourseModal/CourseModal";
import { LeadModal } from "./globalComponents/Modals/LeadModal/LeadModal";
import { StudentModal } from "./globalComponents/Modals/StudentModal/StudentModal";
import { TuitionFeeModal } from "./globalComponents/Modals/TuitionFeeModal/TuitionFeeModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupModal from "./globalComponents/Modals/GroupModal/GroupModal";
import WorkerModal from "./globalComponents/Modals/WorkerModal/WorkerModal";
import CareerModal from "./globalComponents/Modals/CareerModal/CareerModal";
import SyllabusModal from "./globalComponents/Modals/SyllabusModal/SyllabusModal";
import ConsultationModal from "./globalComponents/Modals/ConsultationModal/ConsultationModal";
import LessonTableModal from "./globalComponents/Modals/LessonTableModal/LessonTableModal";
import LessonModal from "./globalComponents/Modals/LessonModal/LessonModal";
import { userAction } from "./redux/actions/userAction";
import { EventModal } from "./globalComponents/Modals/EventModal/EventModal";

//
function App() {
  const { coursesOpenModal } = useSelector((state) => state.coursesModal);
  const { eventsOpenModal } = useSelector((state) => state.eventModal);
  const { studentsOpenModal } = useSelector((state) => state.studentsModal);
  const { tuitionFeeOpenModal } = useSelector((state) => state.tuitionFeeModal);
  const { consultationOpenModal } = useSelector(
    (state) => state.consultationModal
  );
  const { teachersOpenModal } = useSelector((state) => state.teachersModal);
  const { workerOpenModal } = useSelector((state) => state.workerModal);
  const { groupOpenModal } = useSelector((state) => state.groupModal);
  const { lessonTableOpenModal } = useSelector(
    (state) => state.lessonTableModal
  );
  const { syllabusOpenModal } = useSelector((state) => state.syllabusModal);
  const { careerOpenModal } = useSelector((state) => state.careerModal);
  const { leadOpenModal } = useSelector((state) => state.leadModal);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(userAction());
  }, []);

  // // console.log(leadOpenModal, "lead open modal");
  return (
    <div className="App">
      <Routing />
      {coursesOpenModal && <CourseModal />}
      {eventsOpenModal && <EventModal />}
      {studentsOpenModal && <StudentModal />}
      {tuitionFeeOpenModal && <TuitionFeeModal />}
      {consultationOpenModal && <ConsultationModal />}
      {teachersOpenModal && <TeacherModal />}
      {workerOpenModal && <WorkerModal />}
      {syllabusOpenModal && <SyllabusModal />}
      {careerOpenModal && <CareerModal />}
      {lessonTableOpenModal && <LessonTableModal />}
      {groupOpenModal && <GroupModal />}
      {leadOpenModal && <LeadModal />}
      {/* <LessonModal /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
