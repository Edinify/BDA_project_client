import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyllabusCard from "./SyllabusCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";

const SyllabusData = ({ pageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { syllabusData, totalPages, loading } = useSelector(
    (state) => state.syllabusPagination
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
              {syllabusData?.map((teacher, i) => (
                <SyllabusCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {syllabusData?.map((teacher, i) => (
              <SyllabusCard
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

export default SyllabusData;
