import "./tablePageModal.css";
import { ReactComponent as CloseImg } from "../../../assets/icons/closeMenu.svg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableModalDropdown from "./components/TableModalDropdown";
import AddStudentsModal from "./components/AddStudents/AddStudentsModal";
import AddStudents from "./components/AddStudents/AddStudents";
import SaveButton from "./components/Buttons/SaveButton";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
import { STUDENTS_ALL_ACTIONS_TYPE } from "../../../redux/actions-type";
import DeleteLesson from "./components/DeleteLesson/DeleteLesson";

const TablePageModal = () => {
  const dispatch = useDispatch();
  const { clearLessonModal } = useCustomHook();
  const { modalLesson } = useSelector((state) => state.modalLesson);
  const { dropdownName } = useSelector((state) => state.dropdownName);
  const { studentsByCourse } = useSelector((state) => state.studentsPagination);
  const { tableType } = useSelector((state) => state.tableType);
  const functionType = modalLesson.getLesson.length > 0 ? "update" : "create";
  const [selectedCourse, setSelectedCourse] = useState(
    functionType === "update" ? modalLesson?.getLesson[0].course : ""
  );
  const lessonData = modalLesson.getLesson;
  const [studentAddModal, setStudentAddModal] = useState(false);
  const [checkedStudents, setCheckedStudents] = useState([]);
  const [updatedResultData, setUpdatedResultData] = useState(null);
  const [updatedPart, setUpdatedPart] = useState();
  const [deletedId, setDeletedId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [weekday, setWeekday] = useState(() => {
    switch (modalLesson.week) {
      case "B.e":
        return 1;
      case "Ç.a":
        return 2;
      case "Ç.":
        return 3;
      case "C.a":
        return 4;
      case "C.":
        return 5;
      case "Ş.":
        return 6;
      case "B.":
        return 7;
      default:
        return "";
    }
  });
  const [classData, setClassData] = useState({
    role: tableType,
    time:
      modalLesson &&
      `${modalLesson.time.first_time}-${modalLesson.time.second_time}`,
    day: modalLesson && weekday,
    teacher: modalLesson && dropdownName._id,
    students: [],
    course: selectedCourse,
  });
  const closeModal = () => {
    clearLessonModal();
    dispatch({
      type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD,
      payload: { students: [] },
    });
  };

  useEffect(() => {
    if (functionType === "update") {
      setCheckedStudents(modalLesson.getLesson[0].students);
      setUpdatedResultData({ ...lessonData[0] });
    }
  }, []);

  // both update and create for students
  useEffect(() => {
    if (functionType === "create" && checkedStudents.length > 0) {
      const checkedStudentIds = checkedStudents.map((item) => {
        return { student: item.student._id, payment: item.student.payment };
      });
      setClassData({ ...classData, students: checkedStudentIds });
    } else if (functionType === "update" && checkedStudents.length > 0) {
      const checkedStudentIds = checkedStudents.map((item) => {
        return {
          ...item,
          student: item.student._id,
          payment: item.payment ? item.payment : item.student.payment,
        };
      });
      setUpdatedResultData({
        ...updatedResultData,
        students: checkedStudentIds,
      });
    }
  }, [checkedStudents]);

  // update
  useEffect(() => {
    if (functionType === "update" && updatedResultData !== null) {
      setUpdatedPart({
        course: updatedResultData.course._id,
        status: updatedResultData.status,
        teacher: updatedResultData.teacher._id,
      });
    }
  }, [updatedResultData]);

  return (
    <div className="table-modal">
      <div className="table-modal-head mobile">
        <h2 className="title">
          {functionType === "update" ? "Dərsi yenilə" : "Dərs yarat"}
        </h2>

        <div className="close-icon" onClick={() => closeModal()}>
          <CloseImg />
        </div>
      </div>

      <div className="table-modal-container">
        <div className="top">
          <div className="close-icon desktop" onClick={() => closeModal()}>
            <CloseImg />
          </div>

          <div className="table-modal-dropdown">
            <TableModalDropdown type="teachers" modalLesson={modalLesson} />
            <TableModalDropdown
              type="courses"
              modalLesson={modalLesson}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              setCheckedStudents={setCheckedStudents}
            />
            <TableModalDropdown type="date" modalLesson={modalLesson} />
            <TableModalDropdown type="time" modalLesson={modalLesson} />
          </div>

          <AddStudents
            checkedStudents={checkedStudents}
            setCheckedStudents={setCheckedStudents}
            setStudentAddModal={setStudentAddModal}
            disabled={modalLesson?.getLesson[0]?.status === "confirmed"}
            selectedCourse={selectedCourse}
            weekday={weekday}
            modalLesson={modalLesson}
          />
        </div>

        {modalLesson?.getLesson[0]?.status !== "confirmed" && (
          <SaveButton
            functionType={functionType}
            lessonData={lessonData}
            classData={classData}
            setShowDeleteModal={setShowDeleteModal}
            setDeletedId={setDeletedId}
            updatedResultData={updatedResultData}
            updatedPart={updatedPart}
            setClassData={setClassData}
            selectedCourse={selectedCourse}
          />
        )}
      </div>

      {showDeleteModal && (
        <DeleteLesson
          setShowDeleteModal={setShowDeleteModal}
          dataId={deletedId}
        />
      )}

      {studentAddModal && studentsByCourse && (
        <AddStudentsModal
          setStudentAddModal={setStudentAddModal}
          setCheckedStudents={setCheckedStudents}
          checkedStudents={checkedStudents}
          modalLesson={modalLesson}
          functionType={functionType}
          selectedCourse={selectedCourse}
          weekday={weekday}
        />
      )}
    </div>
  );
};

export default TablePageModal;
