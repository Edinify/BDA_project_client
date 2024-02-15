import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CareerCard from "./CareerCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";

const CareerData = ({ pageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { careerData, totalPages, loading } = useSelector(
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

  // console.log(careerData, "career data");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openMoreModal && (
            <MoreModal setOpenMoreModal={setOpenMoreModal} type="teacher" />
          )}
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
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {careerData?.map((teacher, i) => (
              <CareerCard
                key={i}
                data={teacher}
                mode="tablet"
                cellNumber={i + 1 + (pageNum - 1) * 10}
                setOpenMoreModal={setOpenMoreModal}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={pageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CareerData;
