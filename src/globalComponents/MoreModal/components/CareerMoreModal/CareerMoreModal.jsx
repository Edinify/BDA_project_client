import React from "react";
import moment from "moment";
import "moment/locale/az";

const CareerMoreModal = ({ careerModalData }) => {
  const dataList1 = [
    { title: "Ad soyad", value: careerModalData?.fullName },
    { title: "Fin kod", value: careerModalData?.fin },
    { title: "Seriya nömrəsi", value: careerModalData?.seria },
    {
      title: "Doğum günü",
      value: careerModalData?.birthday
        ? moment(careerModalData?.birthday).locale("az").format("DD MMMM YYYY")
        : "",
    },
    { title: "Mobil nömrə", value: careerModalData?.phone },
    { title: "Qrup", value: careerModalData?.group?.name },
    { title: "İxtisas", value: careerModalData?.group?.course?.name },
    { title: "Portfolio linki", value: careerModalData?.portfolioLink },
    { title: "CV linki", value: careerModalData?.cvLink },
    { title: "Dərsə başlama tarixi", value: careerModalData?.group
    ? moment(careerModalData?.group.startDate).locale("az").format("DD MMMM YYYY")
    : ""},
    { title: "Bitmə tarixi", value: careerModalData?.group
    ? moment(careerModalData?.group.endDate).locale("az").format("DD MMMM YYYY")
    : "" },
    {
      title: "Bizi haradan eşitdiniz ? ",
      value: careerModalData?.whereComing,
    },
    {
      title: "Haradan gəliblər ? ",
      value: careerModalData?.whereSend,
    },
  ];
  return (
    <div className="more-modal-header-inform">
      {dataList1.map((item, index) => (
        <h3 key={index}>
          {item.title}: <span>{item.value}</span>
        </h3>
      ))}
    </div>
  );
};

export default CareerMoreModal;
