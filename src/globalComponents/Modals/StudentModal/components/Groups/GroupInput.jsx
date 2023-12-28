import React, { useState } from "react";
import { ReactComponent as MinusIcon } from "../../../../../assets/icons/minus-cirlce.svg";
import PaymentType from "../Groups/components/PaymentType";

const GroupInput = ({
  data,
  index,
  deleteItem,
  modalData,
  updateModalState,
  formik,
}) => {

  const addPaymentType = (paymentType) => {
    const groupData = modalData.groups;
    const foundIndex = groupData.findIndex(
      (item) => item.group._id === data.group._id
    );
    groupData[foundIndex] = { ...groupData[foundIndex], paymentType: paymentType };
    updateModalState("groups", groupData);
  };

  return (
    <li>
      <div className="top">
        {`${index + 1}. ${data?.group?.name}`}
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteItem(data.group._id)}
          />
        </div>
      </div>
      <PaymentType
        data={data}
        addPaymentType={addPaymentType}
        formik={formik}
      />
    </li>
  );
};

export default GroupInput;
