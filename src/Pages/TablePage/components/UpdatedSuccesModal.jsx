import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_LESSONS_DATA_ACTION_TYPE } from "../../../redux/actions-type";
import CheckIcon from "../../../assets/images/check-update.gif";

const UpdatedSuccesModal = () => {
  const dispatch = useDispatch();

  return (
    <div className="tablepage-update-modal">
      <div className="tablepage-update-modal-content">
        <div className="tablepage-update-modal-container">
          <div className="tablepage-update-modal-data">
            <img src={CheckIcon} alt="check" />
            <p>Cari cədvəl yeniləndi.</p>
            <button
              onClick={() =>
                dispatch({
                  type: CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_OPEN_MODAL,
                  payload: false,
                })
              }
              className="update-close-btn"
            >
              Çıx
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatedSuccesModal;
