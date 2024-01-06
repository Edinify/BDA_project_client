import React, { useState } from "react";

const Status = () => {
  const confirmedStatusList = [
    { status: "unviewed", label: "Baxılmayıb" },
    { status: "confirmed", label: "Təsdiqlənib" },
    { status: "cancelled", label: "İmtina edilib" },
  ];

  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  return (
    <>
      <div className="modal-select">
        <ul>
          {confirmedStatusList.map((item, i) => (
            <li
              key={i}
              className={item.status === selectedStatus ? "active" : ""}
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
