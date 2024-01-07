import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const CoursesData = ({ coursePageNum, getPageNumber }) => {
  const { courses, totalPages } = useSelector(
    (state) => state.coursesPagination
  );
  const { loading } = useSelector((state) => state.coursesPagination);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const tableHead = [
    { id: 1, label: "Fənn adı" },
    { id: 2, label: "" },
    { id: 3, label: "" },
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
              type="courses"
            />
          )}
          <table className="details-table courses-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {courses.map((courseName, i) => (
                <CourseCard
                  key={i}
                  data={courseName}
                  mode="desktop"
                  cellNumber={i + 1 + (coursePageNum - 1) * 10}
                  setOpenConfirmModal={setOpenConfirmModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet course-list-mobile">
            <h3 className="details-list-title">Fənn adı</h3>
            {courses.map((courseName, i) => (
              <CourseCard
                key={i}
                data={courseName}
                mode="mobile"
                cellNumber={i + 1 + (coursePageNum - 1) * 10}
                setOpenConfirmModal={setOpenConfirmModal}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={coursePageNum}
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

export default CoursesData;
