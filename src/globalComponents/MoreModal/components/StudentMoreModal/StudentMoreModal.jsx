import React from "react";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";

const StudentMoreModal = ({ studentsModalData }) => {
  let courses =
    Array.isArray(studentsModalData?.courses) &&
    studentsModalData?.courses.length > 0
      ? studentsModalData?.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "boş";
  const { whereComingList,whereSendList, discountReasonList, paymentTypeList } =
    useCustomHook();
  const dataList1 = [
    { title: "Ad soyad", value: studentsModalData?.fullName },
    { title: "Fin kod", value: studentsModalData?.fin },
    { title: "Seriya nömrəsi", value: studentsModalData?.seria },
    {
      title: "Doğum günü",
      value: studentsModalData?.birthday
        ? moment(studentsModalData?.birthday)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    { title: "Mobil nömrə", value: studentsModalData?.phone },
    {
      title: "Bizi haradan eşitdiniz?",
      value: whereComingList?.find(
        (item) => item.key === studentsModalData?.whereComing
      )?.name,
    },
    {
      title: "Haradan gəliblər?",
      value: whereSendList?.find(
        (item) => item.key === studentsModalData?.whereSend
      )?.name,
    },
    { title: "İxtisaslar", value: courses },
  ];
  const dataList2 = [
    // { title: "Təhsil dərəcəsi", value: studentsModalData?.degree },
    // {
    //   title: "Müqavilə başlama tarixi",
    //   value: studentsModalData?.contractStartDate
    //     ? moment(studentsModalData?.contractStartDate)
    //         .locale("az")
    //         .format("DD MMMM YYYY")
    //     : "",
    // },
    // {
    //   title: "Müqavilə bitmə tarixi",
    //   value: studentsModalData?.contractEndDate
    //     ? moment(studentsModalData?.contractEndDate)
    //         .locale("az")
    //         .format("DD MMMM YYYY")
    //     : "",
    // },
    // { title: "Ödəniş", value: studentsModalData?.amount },
    // { title: "Yekun məbləğ", value: studentsModalData?.totalAmount },
    // {
    //   title: "Endirim növü",
    //   value: discountReasonList.find(
    //     (item) => item.key === studentsModalData?.discountReason
    //   ).name,
    // },
    // { title: "Endirim %", value: studentsModalData?.discount },
    // {
    //   title: "Ödəniş növü",
    //   value: paymentTypeList.find(
    //     (item) => item.key === studentsModalData?.paymentType
    //   ).name,
    // },
    // { title: "Qrup", value: "" },
    // {
    //   title: "Qoşulma tarixi",
    //   value: studentsModalData?.createdAt
    //     ? moment(studentsModalData?.createdAt)
    //         .locale("az")
    //         .format("DD MMMM YYYY")
    //     : "",
    // },
  ];

  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item.title}: <span>{item.value}</span>
          </h3>
        ))}
      </div>

      {studentsModalData.groups.map((item) => (
        <div key={item.group._id} className="more-modal-work-inform">
          <h2>Qrup adi: {item.group.name}</h2>
          <div className="work-inform-con">
            <h3>
              Yekun məbləğ: <span>{item.totalAmount}</span>
            </h3>
            <h3>
              Ödəniş: <span>{item.amount}</span>
            </h3>
            <h3>
              Ödəmə növü: <span>{item.paymentType} hissəli</span>
            </h3>
            <h3>
              Endirim növü:{" "}
              <span>
                {
                  discountReasonList.find(
                    (data) => data.key === item?.discountReason
                  )?.name
                }
              </span>
            </h3>
            <h3>
              Endirim %: <span>{item.discount}</span>
            </h3>
            <h3>
              Müqavilə başlama tarixi:{" "}
              <span>
                {item?.contractStartDate
                  ? moment(item?.contractStartDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </span>
            </h3>
            <h3>
              Müqavilə bitmə tarixi:{" "}
              <span>
                {item?.contractEndDate
                  ? moment(item?.contractEndDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </span>
            </h3>
            <h3>
              Təhsil dərəcəsi: <span>{item.degree}</span>
            </h3>

            <h3>
              Status: <span>{item.status ? "Davam edir" : "Məzun"}</span>
            </h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default StudentMoreModal;
