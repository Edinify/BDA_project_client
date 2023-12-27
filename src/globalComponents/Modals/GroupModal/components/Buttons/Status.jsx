import React from "react";

const Status = ({ modalData, updateModalState }) => {
  const getStatus = (status) => {
    updateModalState("completed", status);
  };
  return (
    <ul className="modal-status">
      <li
        className={`${modalData.completed ? "active" : ""}`}
        onClick={() => getStatus(true)}
      >
        Mövcud
      </li>
      <li
        className={`${modalData.completed ? "" : "active"}`}
        onClick={() => getStatus(false)}
      >
        Yığılan
      </li>
    </ul>
  );
};

export default Status;
