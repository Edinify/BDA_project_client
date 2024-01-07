import React from "react";

const CoursesConfirmModal = ({ coursesModalData }) => {

  const dataList1 = [{ title: "Fənn adı", value: coursesModalData?.name }];
  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item?.title}: <span>{item?.value}</span>
          </h3>
        ))}
        <div className="payment">
          {coursesModalData.payments.map((payment) => (
            <div key={payment._id}>
              <h3>
                Ödəniş növü : <span>{payment.paymentType}</span> hissəli
              </h3>
              <h3>
                Ödəniş : <span> {payment.payment}</span> AZN
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursesConfirmModal;
