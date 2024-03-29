import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TuitionFeeCard from "./TuitionFeeCard";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const TuitionFeeData = ({ getNextTuitionFees }) => {
  const { tuitionFeeData, hasMore } = useSelector(
    (state) => state.tuitionFeePagination
  );
  // const { loading } = useSelector((state) => state.tuitionFeePagination);

  const { openConfirmModal } = useSelector((state) => state.tuitionFeeModal);

  const [openMoreModal, setOpenMoreModal] = useState(false);

  const tableHead = [
    "Tələbənin adı",
    "Mobil nörmə",
    "Qrup",
    "Məbləğ",
    "Yekun məbləğ",
    "Yekun qalıq",
    "Endirim",
    "Ödəniş növü",
    "Ümumi ödəniləcək məbləğ",
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
        <MoreModal
          data={tuitionFeeData}
          setOpenMoreModal={setOpenMoreModal}
          type="tuitionFee"
        />
      )}

      {openConfirmModal && <ConfirmModal type="tuitionFee" />}

      <InfiniteScroll
        dataLength={tuitionFeeData.length}
        next={getNextTuitionFees}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={450}
        scrollThreshold={0.8}
      >
        <div className="table-con">
          <table className="details-table tuition-table  ">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tuitionFeeData?.map((data, i) => (
                <TuitionFeeCard
                  key={i}
                  data={data}
                  mode="desktop"
                  setOpenMoreModal={setOpenMoreModal}
                  cellNumber={i + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>

      <div className="details-list-tablet">
        {tuitionFeeData?.map((data, i) => (
          <TuitionFeeCard
            key={i}
            data={data}
            mode="tablet"
            setOpenMoreModal={setOpenMoreModal}
            cellNumber={i + 1}
          />
        ))}
      </div>
    </>
  );
};

export default TuitionFeeData;
