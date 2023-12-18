import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLessonsDataInMainPanelAction } from "../../../../../redux/actions/currentLessonsDataAction";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";



const SaveButton = ({mode, updatedResultData, updatedPart}) => {
  const dispatch = useDispatch();
  const {tableType} = useSelector(state=>state.tableType);
  const { lessonModalLoading } = useSelector((state) => state.modalLesson);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const updateLesson = () => {
    if (tableType === "main page") {
      if (userData?.role !== "student") {
        dispatch(
          updateCurrentLessonsDataInMainPanelAction({
            lessonData: {
              ...updatedResultData,
              ...updatedPart,
            },
            studentTab: 'student'
          })
        );
      } else {
        dispatch(
          updateCurrentLessonsDataInMainPanelAction({
            lessonData: {
              ...updatedResultData,
              ...updatedPart,
            },
          })
        );
      }
    } else if(tableType === "temporay table") {
      /* temporary table */
      if (userData?.role !== "student") {
        dispatch(
          updateCurrentLessonsDataInMainPanelAction({
            lessonData: {
              ...updatedResultData,
              ...updatedPart,
            },
            studentTab: 'student'
          })
        );
      } 
    }
  };
  return (
    <div className={`student-modal-save-btn ${mode}`}>
      <button onClick={() => updateLesson()} className="save-btn" disabled={lessonModalLoading}>
        {lessonModalLoading ? <LoadingBtn /> : 'Yadda saxla'}
      </button>
    </div>
  )
}

export default SaveButton