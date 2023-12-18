import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createExpensesAction,
  updateExpensesAction,
} from "../../../../../redux/actions/expensesAction";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({
  funcType,
  expensesModalData,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const { expensesModalLoading } = useSelector((state) => state.expensesModal);

  const expensesCreate = () => {
    if (expensesModalData?._id) {
      dispatch(updateExpensesAction(expensesModalData?._id, expensesModalData));
    } else {
      dispatch(createExpensesAction({ ...expensesModalData }));
    }
  };

  return (
    <div>
      {funcType === "update" ? (
        <div className="create-update-modal-btn update ">
          <button onClick={expensesCreate} disabled={expensesModalLoading}>
            {expensesModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>

          <div className="delete-income-modal-btn">
            <DeleteIcon onClick={() => setShowDeleteModal(true)} />
          </div>
          <button
            className="delete-income-modal-btn-mobile"
            onClick={() => setShowDeleteModal(true)}
          >
            Sil
          </button>
        </div>
      ) : (
        <div className="create-update-modal-btn">
          <button onClick={expensesCreate} disabled={expensesModalLoading}>
            {expensesModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
