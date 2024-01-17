import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyllabusCard from "./SyllabusCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
const SyllabusData = ({ pageNum, getPageNumber, userData }) => {
  const dispatch = useDispatch();
  const { syllabusData, totalPages, loading } = useSelector(
    (state) => state.syllabusPagination
  );
  const { openConfirmModal } = useSelector((state) => state.syllabusModal);

  const tableHead = ["No", "Mövzü", ""];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openConfirmModal && <ConfirmModal type="syllabus" />}

          <table className="details-table syllabus-table">
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
                  syllabus={userData}
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet syllabus-tablet">
            {syllabusData?.map((teacher, i) => (
              <SyllabusCard
                key={i}
                data={teacher}
                syllabus={userData}
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
