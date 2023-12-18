import React from "react";

const PaymentMethod = ({
  incomesModalData,
  updateModalState,
  formik,
  setInputValue,
}) => {
  return (
    <div className="payment-method">
      <label className="radio-sector-title">Ödəmə üsulu</label>
      <div className="radio-sector-con">
        <div className="input-box">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              checked={incomesModalData?.paymentMethod === "card"}
              onChange={(e) => {
                updateModalState("paymentMethod", "card");
                setInputValue("paymentMethod", "card");
              }}
              onBlur={() => formik.setFieldTouched("paymentMethod", true)}
            />
            Kart
          </label>
        </div>
        <div className="input-box">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              checked={incomesModalData?.paymentMethod === "cash"}
              onChange={(e) => {
                updateModalState("paymentMethod", "cash");
                setInputValue("paymentMethod", "cash");
              }}
              onBlur={() => formik.setFieldTouched("paymentMethod", true)}
            />
            Nəğd
          </label>
        </div>
      </div>

      {formik.errors.paymentMethod && (
        <small className="validation-err-message">
          {formik.errors.paymentMethod}
        </small>
      )}
    </div>
  );
};

export default PaymentMethod;
