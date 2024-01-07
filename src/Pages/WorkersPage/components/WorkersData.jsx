import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkerCard from "./WorkerCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const WorkersData = ({ pageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { workers, totalPages, loading } = useSelector(
    (state) => state.workersPagination
  );
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const tableHead = [
    "Ad soyad",
    "Fin kod",
    "Email",
    "Mobil nömrə",
    "Pozisiya",
    "Profil",
    "",
    "",
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openConfirmModal && (
            <ConfirmModal
              setOpenConfirmModal={setOpenConfirmModal}
              type="workers"
            />
          )}
          <table className="details-table">
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
                  setOpenConfirmModal={setOpenConfirmModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {workers?.map((teacher, i) => (
              <WorkerCard
                key={i}
                data={teacher}
                mode="tablet"
                cellNumber={i + 1 + (pageNum - 1) * 10}
                setOpenConfirmModal={setOpenConfirmModal}
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
