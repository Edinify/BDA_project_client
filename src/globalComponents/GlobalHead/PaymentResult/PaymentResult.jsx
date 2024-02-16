import React from "react";
import { ReactComponent as LatePayIcon } from "../../../assets/icons/payment/latePay.svg";
import { ReactComponent as TodayPayIcon } from "../../../assets/icons/payment/todayPay.svg";
import { ReactComponent as OtherPayIcon } from "../../../assets/icons/payment/otherPay.svg";

import "./paymentResult.css";
const PaymentResult = () => {
  const paymentData = [
    { id: 1, name: "Gecikmədə olan", count: 10,img :<LatePayIcon/> },
    { id: 2, name: "Bugün daxil olan", count: 10,img:<TodayPayIcon/> },
    { id: 3, name: "Aylıq daxil olacaq", count: 10,img: <OtherPayIcon/> },
    { id: 4, name: "İllik daxil olacaq", count: 1243,img: <OtherPayIcon/> },
    { id: 5, name: "Aylıq qalıq", count: 10,img: <OtherPayIcon/> },
    { id: 6, name: "İllik qalıq", count: 10,img: <OtherPayIcon/> },
  ];
  return (
    <div className="payment-result-container">
      {paymentData?.map((item) => (
        <div className="payment-res-content" key={item.id}>
          <h2>{item.name}</h2>
          <div className="circle-icon">
            <p className="filter-count">{item.count}AZN</p>
            {item.img}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentResult;
