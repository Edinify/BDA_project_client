import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LessonTableCard from "./LessonTableCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import StudentLessonModal from "./StudentLessonModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const LessonTableData = ({ pageNum, getPageNumber }) => {
  const { lessonTableData, totalPages, loading } = useSelector(
    (state) => state.lessonTablePagination
  );
  const { openStudentModal } = useSelector((state) => state.lessonTableModal);

  console.log(openStudentModal);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [students, setStudents] = useState({ data: [], lessonId: "" });
  const [updatedResultData, setUpdatedResultData] = useState("");

  const tableHead = [
    "Dərs günü",
    "Dərs saatı",
    "Mövzu",
    "Müəllim",
    "Mentor",
    "Status",
    "Tələbələr",
    "",
    "",
  ];

  console.log(students, "students-----------------");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openStudentModal && (
            <StudentLessonModal
              students={students}
              setStudents={setStudents}
              setUpdatedResultData={setUpdatedResultData}
              updatedResultData={updatedResultData}
            />
          )}

          {openConfirmModal && (
            <ConfirmModal
              setOpenConfirmModal={setOpenConfirmModal}
              type="lesson-table"
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
              {lessonTableData?.map((lesson, i) => (
                <LessonTableCard
                  key={i}
                  data={lesson}
                  mode="desktop"
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                  setStudents={setStudents}
                  setOpenConfirmModal={setOpenConfirmModal}
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
                setStudents={setStudents}
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

export default LessonTableData;
