import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { FEEDBACK_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/Delete button.svg";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./components/InputField/InputField";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import StudentLists from "./components/StudentLists/StudentLists";
import { deleteFeedbacksByTeacher } from "../../../redux/actions/feedbacksByTeacherAction";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";

export const FeedbackModal = () => {
  const dispatch = useDispatch();
  const { feedbackModalData } = useSelector((state) => state.feedbackModal);
  const [selectedStudentName, setSelectedStudentName] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  const deleteItem = () => {
    dispatch(deleteFeedbacksByTeacher(feedbackModalData._id));
    dispatch({
      type: FEEDBACK_MODAL_ACTION_TYPE.GET_FEEDBACK_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: FEEDBACK_MODAL_ACTION_TYPE.GET_FEEDBACK_MODAL,
      payload: {
        data: {
          ...feedbackModalData,
          teacher: user._id,
          [keyName]: value,
        },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: FEEDBACK_MODAL_ACTION_TYPE.GET_FEEDBACK_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  useEffect(() => {
    if (feedbackModalData?._id) {
      if (feedbackModalData.student) {
        setSelectedStudentName(feedbackModalData.student);
      }
    }
  }, []);

  //
  return (
    <div className="create-update-modal-con bonus-modal feedback-modal">
      <div className="create-update-modal ">
        <div className="create-update-modal-head">
          <h2>{feedbackModalData?._id ? "Rəyi yenilə" : "Rəy yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="create-update-modal-form">
            <StudentLists
              setSelectedStudentName={setSelectedStudentName}
              selectedStudentName={selectedStudentName}
              updateModalState={updateModalState}
            />
            <InputField
              inputName={"feedback"}
              feedbackModalData={feedbackModalData}
              updateModalState={updateModalState}
            />
          </div>
        </Box>

        {feedbackModalData?._id ? (
          <div className="bonus-update-icons  ">
            <SubmitBtn
              funcType="update"
              feedbackModalData={feedbackModalData}
              closeModal={closeModal}
            />
            <div className="delete-feedback-modal-btn">
              <DeleteIcon onClick={() => setShowDeleteModal(true)} />
            </div>
            <button
              className="delete-feedback-modal-btn-mobile"
              onClick={() => setShowDeleteModal(true)}
            >
              Sil
            </button>
          </div>
        ) : (
          <SubmitBtn
            funcType="create"
            feedbackModalData={feedbackModalData}
            closeModal={closeModal}
          />
        )}
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
