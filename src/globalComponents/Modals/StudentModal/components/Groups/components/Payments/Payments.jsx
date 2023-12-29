import React from "react";
import Payment from "./Payment";

const Payments = ({ formik, setInputValue, data, addPayments, index }) => {
  return (
    <div className="input-couples">
      <Payment
        inputName={"payment"}
        formik={formik}
        setInputValue={setInputValue}
        data={data}
        addPayments={addPayments}
        index={index}
      />
      <Payment
        inputName={"paymentDate"}
        formik={formik}
        setInputValue={setInputValue}
        data={data}
        addPayments={addPayments}
        index={index}
      />
    </div>
  );
};

export default Payments;
