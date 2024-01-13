import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const CoursesConfirmModal = ({  }) => {
  const { coursesModalData } = useSelector((state) => state.coursesModal);
  console.log(coursesModalData)
  const dataList1 = [{ title: "Fənn adı", value: coursesModalData?.name }];
  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item?.title}: <span >{item?.value}</span>
          </h3>
        ))}
        <div className="payment">
          {coursesModalData.payments.map((payment) => (
            <div key={payment._id}>
              <h3 style={{color:"black",fontWeight:600}} >
                Ödəniş növü : {payment.paymentType} hissəli
              </h3>
              <h3 style={{paddingLeft:"15px"}}>
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
