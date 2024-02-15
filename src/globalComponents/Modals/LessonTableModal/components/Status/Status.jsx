import React, { useState } from "react";

const Status = ({ updateModalState, modalData }) => {
  const confirmedStatusList = [
    { status: "unviewed", label: "Gözləmədə" },
    { status: "confirmed", label: "Keçirilib" },
    { status: "cancelled", label: "Ləğv edilib" },
  ];

  const handleStatusClick = (status) => {
    updateModalState("status", status);
  };

  // console.log(modalData, "modal data in status");
  return (
    <>
      <div className="modal-select">
        <ul>
          {confirmedStatusList.map((item, i) => (
            <li
              key={i}
              className={item.status === modalData?.status ? "active" : ""}
              onClick={() => handleStatusClick(item.status)}
              id={item.status}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Status;
