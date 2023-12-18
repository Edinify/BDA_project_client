import { useDispatch, useSelector } from "react-redux";
import { deleteMainLessonsDataAction } from "../../../../../redux/actions/mainLessonsDataAction";
import { deleteCurrentLessonsDataAction } from "../../../../../redux/actions/currentLessonsDataAction";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
const DeleteLesson = ({ setShowDeleteModal, dataId }) => {
  const dispatch = useDispatch();
  const { clearLessonModal } = useCustomHook();
  const { tableType } = useSelector((state) => state.tableType);

  const deleteItem = (_id) => {
    if (tableType === "current") {
      dispatch(deleteCurrentLessonsDataAction(_id));
    } else if (tableType === "main") {
      dispatch(deleteMainLessonsDataAction(_id));
    } else if (tableType === "temporary page") {
      /* temporary table */
      dispatch(deleteCurrentLessonsDataAction(_id));
    }
    setShowDeleteModal(false);
    clearLessonModal();
  };

  return (
    <div className="delete-modal">
      <div className="delete-container">
        <p>Silmək istədiyinizə əminsiniz?</p>
        <div className="modal-btn">
          <button
            className="cancel-btn"
            onClick={() => setShowDeleteModal(false)}
          >
            Ləğv et
          </button>
          <button className="delete-btn" onClick={() => deleteItem(dataId)}>
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLesson;
