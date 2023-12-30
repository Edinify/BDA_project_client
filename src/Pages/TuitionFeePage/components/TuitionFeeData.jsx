import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TuitionFeeCard from "./TuitionFeeCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";

const TuitionFeeData = ({ pageNum, getPageNumber }) => {
  const { tuitionFeeData, totalPages } = useSelector(
    (state) => state.tuitionFeePagination
  );
  const { loading } = useSelector((state) => state.tuitionFeePagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const tableHead = [
    "Tələbənin adı",
    "Mobil Nömrə",
    "Status",
    "Qrup",
    "Məbləğ",
    "Yekun Məbləğ",
    "Ödəmə növü",
    "Endirim %",
    "Endirim növü",
    "Ödənişlər",
    "Müqavilə başlama tarixi",
    "Müqavilə bitmə tarixi",
    // "",
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
          {/* {openMoreModal && (
            <MoreModal
              data={tuitionFeeData}
              setOpenMoreModal={setOpenMoreModal}
              type="tuitionFee"
            />
          )} */}
          <div className="table-con">
            <table className="details-table  student-table">
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
