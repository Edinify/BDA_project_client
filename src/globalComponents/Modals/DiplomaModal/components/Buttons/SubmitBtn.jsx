import { useDispatch, useSelector } from "react-redux";
// import {updateDemoAction,createDemoAction} from "../../../../../redux/actions/demoActions"
import { updateDiplomaAction } from "../../../../../redux/actions/diplomaActions";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType, closeModal }) => {
  const dispatch = useDispatch();
  const { diplomaModalLoading } = useSelector((state) => state.diplomaModal);

  const diplomaUpdate = () => {
    if (modalData?._id) {
      dispatch(updateDiplomaAction(modalData?._id, modalData));
    }
  };

  return (
    <div className="create-update-modal-btn demo-btn ">
      <button disabled={diplomaModalLoading} onClick={diplomaUpdate}>
        {diplomaModalLoading ? <LoadingBtn /> : "Yenilə"}
      </button>
    </div>
  );
};

export default SubmitBtn;
