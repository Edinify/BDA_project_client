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
  const tableHead = [
    "Ad soyad",
    "Email",
    "Mobil nömrə",
    "Pozisiya",
    "Profil",
    "",
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
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
