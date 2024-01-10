import React, { useEffect, useRef, useState } from "react";
import "./updateDeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import { FUNC_COMPONENT_ACTION_TYPE } from "../../../redux/actions-type";
import { ReactComponent as MoreIcon } from "../../../assets/icons/more.svg";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
const UpdateDeleteModal = ({
  updateItem = () => {},
  deleteItem = () => {},
  state,
  data,
  dataType = "",
  openConfirmModal,
}) => {

  // console.log(state,"admin")
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { funcComp } = useSelector((state) => state.funcComponent);
  const modalRef = useRef(null);

  const handleClickOutside = () => {
    dispatch({
      type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
      payload: false,
    });
  };

  const handleToggleModal = (e) => {
    e.stopPropagation();
    if (funcComp === data._id) {
      dispatch({
        type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
        payload: false,
      });
    } else {
      dispatch({
        type: FUNC_COMPONENT_ACTION_TYPE.GET_FUNC_COMP,
        payload: data._id,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="func-component">
      <MoreIcon className="more-icon" onMouseDown={handleToggleModal} />

      <div
        className={`delete-update-modal ${
          funcComp === data._id ? "active" : ""
        }`}
        ref={modalRef}
      >
        <>
          {dataType !== "feedback" && (
            <h4 onClick={() => updateItem()}>Yenilə</h4>
          )}
          {(state?.role === "super-admin" || state?.power === "all") && (
            <h4 className="confirm" onClick={openConfirmModal}>
              Təsdiqlə
            </h4>
          )}
          {state?.power !== "update" && (
            <h4
              className={`delete-func ${dataType === "branches" ? "only" : ""}`}
              onClick={() => setShowDeleteModal(true)}
            >
              Sil
            </h4>
          )}
        </>
      </div>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
    </div>
  );
};

export default UpdateDeleteModal;
