import React from "react";

const SyllabusConfirmModal = ({ syllabusModalData }) => {
  const dataList1 = [
    { title: "Mövzu", value: syllabusModalData?.name },
    { title: "No", value: syllabusModalData.orderNumber },
  ];

  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item?.title}: <span>{item?.value}</span>
          </h3>
        ))}
      </div>
    </>
  );
};

export default SyllabusConfirmModal;
