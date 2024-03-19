import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CareerCard from "./CareerCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const CareerData = ({ getNextCareers }) => {
  const { careerData, hasMore } = useSelector(
    (state) => state.careerPagination
  );
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const tableHead = [
    "Tələbənin adı",
    "Qrup",
    "İxtisas",
    "Portfolio linki",
    "CV linki",
    "Mobil Nömrə",
    "Fin kod",
    "Seriya nömrəsi",
    "Doğum günü",
    "Dərsə başlama tarixi",
    "Bitmə tarixi",
    "Bizi haradan eşitdiniz",
    "Haradan göndərilib",
    "Əvvəlki iş yeri",
    "Əvvəlki iş vəzifəsi",
    "Cari iş yeri",
    "Cari iş vəzifəsi",
    "İşə başlama tarixi:",
    "İş Statusu",
    "Status",
    "",
  ];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
      {openMoreModal && (
        <MoreModal setOpenMoreModal={setOpenMoreModal} type="career" />
      )}
      <div className="career-table-container">
        <InfiniteScroll
          dataLength={careerData?.length}
          next={getNextCareers}
          hasMore={hasMore}
          loader={<SmallLoading />}
          endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
          height={550}
          scrollThreshold={0.7}
        >
          <table className="details-table career-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {careerData?.map((career, i) => (
                <CareerCard
                  key={i}
                  data={career}
                  mode="desktop"
                  cellNumber={i + 1}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>

      <div className="details-list-tablet">
        {careerData?.map((teacher, i) => (
          <CareerCard
            key={i}
            data={teacher}
            mode="tablet"
            cellNumber={i + 1}
            setOpenMoreModal={setOpenMoreModal}
          />
        ))}
      </div>
    </>
  );
};

export default CareerData;
