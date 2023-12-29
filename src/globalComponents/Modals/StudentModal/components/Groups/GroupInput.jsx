import React, { useEffect, useState } from "react";
import { ReactComponent as MinusIcon } from "../../../../../assets/icons/minus-cirlce.svg";
import PaymentType from "../Groups/components/PaymentType";
import Payments from "./components/Payments/Payments";
import InputField from "./components/Inputs/InputField";
import DiscountReason from "./components/DiscountReason/DiscountReason";
import Status from "./components/Status/Status";

const GroupInput = ({
  data,
  index,
  deleteItem,
  modalData,
  updateModalState,
  formik,
  setInputValue,
}) => {
  const groupData = modalData.groups;
  const foundIndex = groupData.findIndex(
    (item) => item.group._id === data.group._id
  );

  const addPaymentType = (item) => {
    const paymentType = item.paymentType
    const amount = item.payment
    const onePartPayment = amount / paymentType
    // const paymentArr = Array(paymentType).fill({
    //   payment: "",
    //   paymentDate: "",
    // });
    const paymentArr = Array(paymentType).fill({
      payment: onePartPayment.toFixed(2),
      paymentDate: "",
    });
    groupData[foundIndex] = {
      ...groupData[foundIndex],
      paymentType: paymentType,
      payments: paymentArr,
      amount: amount
    };
    updateModalState("groups", groupData);
  };

  const addPayments = (key, value, index) => {
    groupData[foundIndex].payments[index] = {
      ...groupData[foundIndex].payments[index],
      [key]: value,
    };
    console.log(groupData);
    updateModalState("groups", groupData);
  };

  const addGroupData = (key, value) => {
    groupData[foundIndex] = {
      ...groupData[foundIndex],
      [key]: value,
    };
    console.log(key, value);
    updateModalState("groups", groupData);
  };

  return (
    <li className="group-li">
      <div className="top">
        {index + 1}. {data?.group?.name}, {data?.group?.course.name}
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
      {data?.payments?.map((item, index) => (
        <Payments
          key={index}
          index={index}
          setInputValue={setInputValue}
          data={item}
          addPayments={addPayments}
          formik={formik}
        />
      ))}
      <div className="input-couples">
        <InputField
          inputName={"contractStartDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"contractEndDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"amount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"totalAmount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />

        <DiscountReason
          data={data}
          addGroupData={addGroupData}
          formik={formik}
        />
        <InputField
          inputName={"discount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
      </div>

      <InputField
        inputName={"degree"}
        formik={formik}
        setInputValue={setInputValue}
        data={data}
        addGroupData={addGroupData}
      />

      <Status
        formik={formik}
        setInputValue={setInputValue}
        data={data}
        addGroupData={addGroupData}
      />
    </li>
  );
};

export default GroupInput;
