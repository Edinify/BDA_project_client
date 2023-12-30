import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LessonTableCard from "./LessonTableCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";

const LessonTableData = ({ pageNum, getPageNumber }) => {
  const { lessonTableData, totalPages, loading } = useSelector(
    (state) => state.lessonTablePagination
  );
  const tableHead = [
    "Qrup",
    "İxtisas",
    "Mövzu",
    "Müəllim",
    "Tələbələr",
    "Dərs günü",
    "Dərs saatı",
    "Status",
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
              {lessonTableData?.map((teacher, i) => (
                <LessonTableCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {lessonTableData?.map((teacher, i) => (
              <LessonTableCard
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

export default LessonTableData;
