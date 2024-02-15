import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TuitionFeeCard from "./TuitionFeeCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const TuitionFeeData = ({ pageNum, getPageNumber }) => {
  const { tuitionFeeData, totalPages } = useSelector(
    (state) => state.tuitionFeePagination
  );
  const { loading } = useSelector((state) => state.tuitionFeePagination);

  const { openConfirmModal } = useSelector((state) => state.tuitionFeeModal);

  const [openMoreModal, setOpenMoreModal] = useState(false);

  const tableHead = [
    "Tələbənin adı",
    "Qrup",
    "Məbləğ",
    "Yekun məbləğ",
    "Yekun qalıq",
    "Endirim",
    "Ödəniş növü",
    "Cari ayın ödənişi",
    "",
  ];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);


  // console.log(totalPages, 'total pages tuiton fee')

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openMoreModal && (
            <MoreModal
              data={tuitionFeeData}
              setOpenMoreModal={setOpenMoreModal}
              type="tuitionFee"
            />
          )}

          {openConfirmModal && <ConfirmModal type="tuitionFee" />}

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
                {tuitionFeeData?.map((data, i) => (
                  <TuitionFeeCard
                    key={i}
                    data={data}
                    mode="desktop"
                    setOpenMoreModal={setOpenMoreModal}
                    cellNumber={i + 1 + (pageNum - 1) * 10}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="details-list-tablet">
            {tuitionFeeData?.map((data, i) => (
              <TuitionFeeCard
                key={i}
                data={data}
                mode="tablet"
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1 + (pageNum - 1) * 10}
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

export default TuitionFeeData;
