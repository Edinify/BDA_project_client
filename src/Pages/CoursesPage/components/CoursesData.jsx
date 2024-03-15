import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const CoursesData = ({ userData, getNextCourse, coursePageNum }) => {
  const { courses, totalLength,loading } = useSelector(
    (state) => state.coursesPagination
  );
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.coursesModal);
  const tableHead = [
    { id: 1, label: "Fənn adı" },
    { id: 2, label: "Tam" },
    { id: 3, label: "Tədris müddəti" },
    { id: 4, label: "10 hissəli" },
    { id: 5, label: "" },
  ];


  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);
  console.log(totalLength , courses.length )
  return (
    <>
        <>
          {openMoreModal && (
            <MoreModal
              setOpenMoreModal={setOpenMoreModal}
              type="courses"
              userData={userData}
            />
          )}

          {openConfirmModal && <ConfirmModal type="courses" />}
          <InfiniteScroll
            // style={{ overflowX: "none" }}
            dataLength={courses.length}
            next={getNextCourse}
            hasMore={totalLength > courses.length || loading}
            loader={<SmallLoading />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            scrollThreshold={0.7}
            height={600}
          >
            <table
              className={`details-table  courses-table ${
                userData.power === "only-show" ? "only-show" : "update"
              } `}
            >
              <thead>
                <tr>
                  {tableHead.map((head, i) => (
                    <th key={i}>{head.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {courses?.map((courseName, i) => (
                  <CourseCard
                    key={i}
                    data={courseName}
                    course={userData}
                    mode="desktop"
                    cellNumber={i + 1 + (coursePageNum - 1) * 10}
                    setOpenMoreModal={setOpenMoreModal}
                  />
                ))}
              </tbody>
            </table>
          </InfiniteScroll>

          <div className="details-list-tablet course-list-mobile">
            <h3 className="details-list-title">Fənn adı</h3>
            {courses.map((courseName, i) => (
              <CourseCard
                key={i}
                data={courseName}
                course={userData}
                mode="mobile"
                cellNumber={i + 1 + (coursePageNum - 1) * 10}
                setOpenMoreModal={setOpenMoreModal}
              />
            ))}
          </div>
        </>
    </>
  );
};

export default CoursesData;
