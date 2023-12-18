import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as TrashIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createCurrentLessonsDataAction,
  updateCurrentLessonsDataAction,
} from "../../../../../redux/actions/currentLessonsDataAction";
import moment from "moment";
import { MODAL_LESSON_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { STUDENTS_ALL_ACTIONS_TYPE } from "../../../../../redux/actions-type";

const SaveButton = ({
  functionType,
  lessonData,
  classData,
  setModal,
  setDeletedId,
  updatedResultData,
  updatedPart,
  setClassData,
  selectedCourse,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { createLessonModal } = useCustomHook();
  const { modalLesson, lessonModalLoading } = useSelector(
    (state) => state.modalLesson
  );
  const lessonDate = modalLesson?.selectedWeekDay
    ? modalLesson?.selectedWeekDay
    : modalLesson?.startWeek;
  const [createLessonErrMessage, setCreateLessonErrMessage] = useState(false);
  const createLesson = () => {
    dispatch({
      type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD,
      payload: {students: []},
    });
    if (classData.course) {
      if (location.pathname === "/temporary-table") {
        dispatch(
          createCurrentLessonsDataAction({
            ...classData,
            date: moment(lessonDate).locale("az").format("YYYY-MM-DD"),
          })
        );
      }
    } else {
      setCreateLessonErrMessage(true);
    }
  };

  const updateLesson = () => {
    dispatch({
      type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD,
      payload: {students: []},
    });
    if (location.pathname === "/temporary-table") {
      dispatch(
        updateCurrentLessonsDataAction({ ...updatedResultData, ...updatedPart })
      );
    }
  };
  const deleteClass = () => {
    setModal(true);
    setDeletedId(lessonData[0]._id);
  };

  // create
  useEffect(() => {
    setClassData({ ...classData, course: selectedCourse });
    setCreateLessonErrMessage(false);
  }, [selectedCourse]);

  return (
    <>
      {createLessonErrMessage && (
        <p className="create-class-err-message">Fənn əlavə edin</p>
      )}

      <div className="tablemodal-save-btn">
        <button
          className={`delete-btn-desktop ${
            functionType === "update"
              ? lessonData[0].status !== "confirmed" && "active"
              : ""
          }`}
          onClick={() => deleteClass()}
        >
          <TrashIcon />
        </button>
        {
          <button
            className="save-btn"
            onClick={() => functionType === "create" ? createLesson() : updateLesson()}
            disabled={lessonModalLoading}
          >
            {lessonModalLoading ? <LoadingBtn /> : "Yadda saxla"}
          </button>
        }
        <button
          className={`delete-btn-mobile ${
            functionType === "update"
              ? lessonData[0].status !== "confirmed" && "active"
              : ""
          }`}
          onClick={() => deleteClass()}
        >
          Sil
        </button>
      </div>
    </>
  );
};

export default SaveButton;
