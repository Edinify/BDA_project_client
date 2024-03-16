import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LessonTableCard from "./LessonTableCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import StudentLessonModal from "./StudentLessonModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const LessonTableData = ({ pageNum, getPageNumber, userData }) => {
  const { lessonTableData, totalPages, loading } = useSelector(
    (state) => state.lessonTablePagination
  );
  const { openStudentModal } = useSelector((state) => state.lessonTableModal);

  const { openConfirmModal } = useSelector((state) => state.lessonTableModal);
  const [students, setStudents] = useState({ data: [], lessonId: "" });
  const [updatedResultData, setUpdatedResultData] = useState("");

  const tableHead =
    userData?.power === "only-show"
      ? ["Dərs günü", "Dərs saatı", "Mövzu", "Müəllim", "Status", "Tələbələr"]
      : [
          "Dərs günü",
          "Dərs saatı",
          "Mövzu",
          "Müəllim",
          "Mentor",
          "Tələbələr",
          "Status",
          "",
        ];

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

          {openConfirmModal && <ConfirmModal type="lesson-table" />}
          <InfiniteScroll
            dataLength={lessonTableData.length}
            // next={getNextTeachers}
            // hasMore={totalLength > teachers.length || loading}
            hasMore={lessonTableData.length || loading}
            loader={<SmallLoading />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            height={550}
            scrollThreshold={0.7}
          >
            <table
              className={`details-table  lesson-table ${
                userData?.power === "only-show" ? "only-show" : "update"
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
                {lessonTableData?.map((lesson, i) => (
                  <LessonTableCard
                    key={i}
                    data={lesson}
                    lesson={userData}
                    mode="desktop"
                    cellNumber={i + 1 + (pageNum - 1) * 10}
                    setStudents={setStudents}
                  />
                ))}
              </tbody>
            </table>
          </InfiniteScroll>

          <div className="details-list-tablet">
            {lessonTableData?.map((teacher, i) => (
              <LessonTableCard
                key={i}
                data={teacher}
                lesson={userData}
                mode="tablet"
                cellNumber={i + 1 + (pageNum - 1) * 10}
                setStudents={setStudents}
              />
            ))}
          </div>

          {/* {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={pageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )} */}
        </>
      )}
    </>
  );
};

export default LessonTableData;
