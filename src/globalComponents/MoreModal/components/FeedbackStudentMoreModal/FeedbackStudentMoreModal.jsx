import React from "react";
import moment from "moment";
import "moment/locale/az";

const FeedbackStudentMoreModal = ({ data }) => {
  return (
    <>
      <div className="more-modal-header-inform">
        <h2>{data?.student.fullName}</h2>
        <h3>
          Kim haqqında:{" "}
          <span>{data.teacher.fullName ? data.teacher.fullName : ""}</span>
        </h3>
        <h3>
          Tarix:{" "}
          <span>
            {data?.createdAt
              ? moment(data.createdAt).format("YYYY-MM-DD")
              : "boş"}
          </span>
        </h3>
        <h3>
          Komment: <span>{data?.feedback ? data.feedback : ""}</span>
        </h3>
      </div>
    </>
  );
};

export default FeedbackStudentMoreModal;
