import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkerCard from "./WorkerCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const WorkersData = ({ userData, pageNum, getPageNumber }) => {
  const { workers, totalPages, loading } = useSelector(
    (state) => state.workersPagination
  );
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openMoreModal, setOpenMoreModal] = useState(false);

  const tableHead = [
    "Ad soyad",
    "Fin kod",
    "Email",
    "Mobil nömrə",
    "Pozisiya",
    "Doğum günü",
    "Profillər",
    "",
  ];

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
              type="worker"
            />
          )}
          {openConfirmModal && (
            <ConfirmModal
              setOpenConfirmModal={setOpenConfirmModal}
              type="workers"
            />
          )}
           <InfiniteScroll
            style={{ overflowX: "none" }}
            dataLength={workers.length}
            // next={getNextStudents}
            // hasMore={totalLength > workers.length || loading}
            hasMore={workers.length || loading}
            loader={<SmallLoading />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            height={550}
            scrollThreshold={0.7}
          >
          <table
            className={`details-table  teacher-table ${
              userData.power === "only-show" ? "only-show" : "update"
            } `}
          >
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
                  worker={userData}
                  mode="desktop"
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                  setOpenConfirmModal={setOpenConfirmModal}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>
          </InfiniteScroll>

          <div className="details-list-tablet">
            {workers?.map((teacher, i) => (
              <WorkerCard
                key={i}
                data={teacher}
                worker={userData}
                mode="tablet"
                cellNumber={i + 1 + (pageNum - 1) * 10}
                setOpenMoreModal={setOpenMoreModal}
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
