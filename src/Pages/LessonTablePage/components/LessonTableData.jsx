import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LessonTableCard from "./LessonTableCard";
import StudentLessonModal from "./StudentLessonModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const LessonTableData = ({ getNextLessons }) => {
  const { lessonTableData, hasMore } = useSelector(
    (state) => state.lessonTablePagination
  );
  const { openStudentModal } = useSelector((state) => state.lessonTableModal);
  const { user } = useSelector((state) => state.user);
  const { openConfirmModal } = useSelector((state) => state.lessonTableModal);
  const [targetLesson, setTargetLesson] = useState({});
  const [updatedResultData, setUpdatedResultData] = useState("");
  const [scrollHeight, setScrollHeight] = useState(1);

  const tableHead =
    user?.role === "student"
      ? [
          "Dərs günü",
          "Dərs saatı",
          "Mövzu",
          "Müəllim",
          "Tyutor",
          "Tyutor saatı",
          "Status",
          "Davamiyyət",
          "Tələbə imzası",
          "",
        ]
      : user?.power === "only-show"
      ? ["Dərs günü", "Dərs saatı", "Mövzu", "Müəllim", "Status", "Tələbələr"]
      : [
          "Dərs günü",
          "Dərs saatı",
          "Mövzu",
          "Müəllim",
          "Tyutor",
          "Tələbələr",
          "Tyutor saatı",
          "Status",
          "",
        ];

  useEffect(() => {
    const mainHeader = document.querySelector(".main-header");
    const detailsHeader = document.querySelector(".details-header");

    const handleResize = () => {
      setScrollHeight(
        window.innerHeight -
          mainHeader.offsetHeight -
          detailsHeader.offsetHeight
      );
    };

    setScrollHeight(
      window.innerHeight - mainHeader.offsetHeight - detailsHeader.offsetHeight
    );

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {openStudentModal && (
        <StudentLessonModal
          targetLesson={targetLesson}
          setTargetLesson={setTargetLesson}
          setUpdatedResultData={setUpdatedResultData}
          updatedResultData={updatedResultData}
        />
      )}

      {openConfirmModal && <ConfirmModal type="lesson-table" />}
      <InfiniteScroll
        dataLength={lessonTableData.length}
        next={getNextLessons}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={scrollHeight}
        scrollThreshold={0.7}
      >
        <table
          className={`details-table  lesson-table ${
            user?.power === "only-show" ? "only-show" : "update"
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
                key={lesson._id}
                data={lesson}
                mode="desktop"
                cellNumber={i + 1}
                setTargetLesson={setTargetLesson}
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
            mode="tablet"
            cellNumber={i + 1}
          />
        ))}
      </div>
    </>
  );
};

export default LessonTableData;
