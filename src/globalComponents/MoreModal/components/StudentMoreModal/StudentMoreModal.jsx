import React from "react";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";

const StudentMoreModal = ({ studentsModalData }) => {
  let courses =
    Array.isArray(studentsModalData.courses) &&
    studentsModalData.courses.length > 0
      ? studentsModalData.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "boş";
  const { whereComingList, discountReasonList, paymentTypeList } =
    useCustomHook();
  const dataList1 = [
    { title: "Ad soyad", value: studentsModalData?.fullName },
    { title: "Fin kod", value: studentsModalData?.fin },
    { title: "Seriya nömrəsi", value: studentsModalData?.seria },
    {
      title: "Doğum günü",
      value: studentsModalData?.birthday
        ? moment(studentsModalData.birthday).locale("az").format("DD MMMM YYYY")
        : "",
    },
    { title: "Mobil nömrə", value: studentsModalData?.phone },
    {
      title: "Bizi haradan eşitdiniz?",
      value: whereComingList.find(
        (item) => item.key === studentsModalData?.whereComing
      ).name,
    },
  ];
  const dataList2 = [
    { title: "İxtisaslar", value: courses },
    { title: "Təhsil dərəcəsi", value: studentsModalData?.degree },
    {
      title: "Müqavilə başlama tarixi",
      value: studentsModalData?.contractStartDate
        ? moment(studentsModalData.contractStartDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    {
      title: "Müqavilə bitmə tarixi",
      value: studentsModalData?.contractEndDate
        ? moment(studentsModalData.contractEndDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    { title: "Ödəniş", value: studentsModalData?.amount },
    { title: "Yekun məbləğ", value: studentsModalData?.totalAmount },
    {
      title: "Endirim növü",
      value: discountReasonList.find(
        (item) => item.key === studentsModalData?.discountReason
      ).name,
    },
    { title: "Endirim %", value: studentsModalData?.discount },
    {
      title: "Ödəniş növü",
      value: paymentTypeList.find(
        (item) => item.key === studentsModalData?.paymentType
      ).name,
    },
    { title: "Qrup", value: "" },
    {
      title: "Qoşulma tarixi",
      value: studentsModalData?.createdAt
        ? moment(studentsModalData.createdAt)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
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

      <div className="more-modal-work-inform">
        <h2>Təhsil məlumatları</h2>
        <div className="work-inform-con">
          {dataList2.map((item, index) => (
            <h3 key={index}>
              {item.title}: <span>{item.value}</span>
            </h3>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentMoreModal;
