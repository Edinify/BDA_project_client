import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkerCard from "./WorkerCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";

const WorkersData = ({ pageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { workers, totalPages, loading } = useSelector(
    (state) => state.workersPagination
  );
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const tableHead = [
    "Ad soyad", "Email", "Mobil nömrə", "Pozisiya", "Profil", "", "",
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
            <MoreModal setOpenMoreModal={setOpenMoreModal} type="teacher" />
          )}
          <table className="details-table teacher-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {workers?.map((teacher, i) => (
                <WorkerCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {workers?.map((teacher, i) => (
              <WorkerCard
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

export default WorkersData;
