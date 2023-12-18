import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as TrashIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createCurrentLessonsDataAction,
  updateCurrentLessonsDataAction,
} from "../../../../../redux/actions/currentLessonsDataAction";
import {
  createMainLessonsDataAction,
  updateMainLessonsDataAction,
} from "../../../../../redux/actions/mainLessonsDataAction";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { STUDENTS_ALL_ACTIONS_TYPE } from "../../../../../redux/actions-type";

const SaveButton = ({
  functionType,
  lessonData,
  classData,
  setShowDeleteModal,
  setDeletedId,
  updatedResultData,
  updatedPart,
  setClassData,
  selectedCourse,
}) => {
  const dispatch = useDispatch();
  const { tableType } = useSelector((state) => state.tableType);
  const { modalLesson, lessonModalLoading } = useSelector(
    (state) => state.modalLesson
  );
  const [createLessonErrMessage, setCreateLessonErrMessage] = useState(false);
  const createLesson = () => {
    dispatch({
      type: STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD,
      payload: {students: []},
    });
    if (classData.course) {
      if (tableType === "current") {
        dispatch(
          createCurrentLessonsDataAction({
            ...classData,
            date: modalLesson.startWeek,
          })
        );
      } else {
        dispatch(createMainLessonsDataAction(classData));
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
    if (tableType === "current") {
      dispatch(
        updateCurrentLessonsDataAction({ ...updatedResultData, ...updatedPart })
      );
    } else {
      dispatch(
        updateMainLessonsDataAction({ ...updatedResultData, ...updatedPart })
      );
    }
  };
  const deleteClass = () => {
    setShowDeleteModal(true);
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
        <button
          className="save-btn"
          onClick={() =>
            functionType === "create" ? createLesson() : updateLesson()
          }
          disabled={lessonModalLoading}
        >
          {lessonModalLoading ? <LoadingBtn /> : "Yadda saxla"}
        </button>

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
