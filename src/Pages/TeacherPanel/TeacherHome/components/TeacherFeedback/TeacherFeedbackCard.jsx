import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { FEEDBACK_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteFeedbacksByTeacher } from "../../../../../redux/actions/feedbacksByTeacherAction";

const TeacherFeedbackCard = ({ data }) => {
  const dispatch = useDispatch();
  const [showFull, setShowFull] = useState(false);

  const deleteItem = () => {
    dispatch(deleteFeedbacksByTeacher(data._id));
  };
  const updateItem = () => {
    const { teacher, student, _id, feedback } = data;
    dispatch({
      type: FEEDBACK_MODAL_ACTION_TYPE.GET_FEEDBACK_MODAL,
      payload: {
        data: {
          student,
          teacher,
          feedback,
          _id,
        },
        openModal: true,
      },
    });
  };
  return (
    <div className="context-con">
      <div className="top">
        <h2 className="title">{data.student.fullName}</h2>
        <div>
          <UpdateDeleteModal
            updateItem={updateItem}
            deleteItem={deleteItem}
            data={data}
          />
        </div>
      </div>

      <p className="date">
        Tarix: {moment(data.createdAt).format("DD.MM.YYYY")}
      </p>
      <div className="bottom">
        {data.feedback.length > 170 ? (
          <p className="description">
            {showFull
              ? `${data.feedback}...`
              : `${data.feedback.slice(0, 170)}...`}

            <span className="read-more" onClick={() => setShowFull(!showFull)}>
              {showFull ? "Daha az" : "Daha çox"}
            </span>
          </p>
        ) : (
          <p className="description">{data.feedback}</p>
        )}
      </div>
    </div>
  );
};

export default TeacherFeedbackCard;
