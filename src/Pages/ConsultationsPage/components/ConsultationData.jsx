import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConsultationCard from "./ConsultationCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const ConsultationData = ({ pageNum, getPageNumber, userData }) => {
  const { totalPages, loading, consultationData } = useSelector(
    (state) => state.consultationPagination
  );
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const tableHead = [
    "Tələbə",
    "Təlimçi",
    "Mobil nömrə",
    "İxtisas",
    "Əlaqə tarixi",
    "Konsultasiya tarixi",
    "Konsultasiya saatı",
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
      {loading ? (
        <Loading />
      ) : (
        <>
          {openMoreModal && (
            <MoreModal
              userData={userData}
              setOpenMoreModal={setOpenMoreModal}
              type="consultation"
            />
          )}

          {openConfirmModal && (
            <ConfirmModal
              setOpenConfirmModal={setOpenConfirmModal}
              type="consultation"
            />
          )}
          <div className="table-con">
            <table className="details-table ">
              <thead>
                <tr>
                  {tableHead.map((head, i) => (
                    <th key={i}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consultationData?.map((student, i) => (
                  <ConsultationCard
                    key={i}
                    data={student}
                    mode="desktop"
                    consultation={userData}
                    setOpenMoreModal={setOpenMoreModal}
                    setOpenConfirmModal={setOpenConfirmModal}
                    cellNumber={i + 1 + (pageNum - 1) * 10}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="details-list-tablet with-more">
            {consultationData?.map((student, i) => (
              <ConsultationCard
                key={i}
                data={student}
                mode="tablet"
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1 + (pageNum - 1) * 10}
                setOpenConfirmModal={setOpenConfirmModal}
                consultation={userData}
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

export default ConsultationData;
