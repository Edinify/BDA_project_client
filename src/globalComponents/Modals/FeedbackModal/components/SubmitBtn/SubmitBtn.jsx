import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeedbacksByTeacher, createFeedbacksByTeacher } from "../../../../../redux/actions/feedbacksByTeacherAction";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({ funcType, feedbackModalData, closeModal }) {
  const {feedbackModalLoading } = useSelector((state) => state.feedbackModal);

  const dispatch = useDispatch();
  const feedbackCreate = () => {
    if (feedbackModalData?._id) {
      dispatch(updateFeedbacksByTeacher(feedbackModalData?._id, feedbackModalData));
    } else {
      dispatch(createFeedbacksByTeacher({ ...feedbackModalData }));
    }
    // closeModal();
  };

  return (
    <div className="create-update-modal-btn">
      <button onClick={feedbackCreate}>
      {feedbackModalLoading ? (
          <LoadingBtn />
        ) : funcType === "update" ? (
          "Yenilə"
        ) : (
          "Yarat"
        )}
      </button>
    </div>
  );
}
