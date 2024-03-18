import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConsultationCard from "./ConsultationCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const ConsultationData = ({  getNextConsultation, userData }) => {
  const { hasMore, consultationData } = useSelector(
    (state) => state.consultationPagination
  );
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.consultationModal);
    // console.log(consultationData)
  const tableHead = [
    "Tələbə",
    "Təlimçi",
    "Mobil nömrə",
    "İxtisas",
    "Persona",
    "Sahə biliyi",
    "Əlaqə tarixi",
    "Konsultasiya tarixi",
    "Konsultasiya saatı",
    "Ləğv səbəbi",
    "Əlavə məlumat",
    "Bizi haradan eşitdiniz",
    "Status",
    "",
  ];

  // console.log(consultationData, "consultation data");

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
        <>
          {openMoreModal && (
            <MoreModal
              userData={userData}
              setOpenMoreModal={setOpenMoreModal}
              type="consultation"
            />
          )}

          {openConfirmModal && <ConfirmModal type="consultation" />}
          

          <div className="table-con">
          <InfiniteScroll
            style={{ overflowX: "none" }}
            dataLength={consultationData.length}
            next={getNextConsultation}
            hasMore={hasMore}
            loader={<SmallLoading />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            height={550}
            scrollThreshold={0.7}
          >
            <table className="details-table consultation-page ">
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
                    cellNumber={i + 1}
                  />
                ))}
              </tbody>
            </table>
            </InfiniteScroll>
          </div>

          {/* <div className="details-list-tablet with-more">
            {consultationData?.map((student, i) => (
              <ConsultationCard
                key={i}
                data={student}
                mode="tablet"
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1}
                consultation={userData}
              />
            ))}
          </div> */}
        </>
    </>
  );
};

export default ConsultationData;
