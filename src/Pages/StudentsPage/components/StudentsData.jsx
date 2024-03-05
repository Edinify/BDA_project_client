import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentCard from "./StudentCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBtn from "../../../globalComponents/Loading/components/LoadingBtn/LoadingBtn";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const StudentsData = ({
  studentPageNum,
  getPageNumber,
  userData,
  getNextStudents,
}) => {
  const { students, totalLength } = useSelector(
    (state) => state.studentsPagination
  );
  const { loading } = useSelector((state) => state.studentsPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.studentsModal);
  const tableHead = ["Tələbə adı", "İxtisas", "Mobil nömrə", "Qrup", "Q/B", ""];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  console.log(students.length, "students length");
  console.log(totalLength, "total length");
  return (
    <>
      {openMoreModal && (
        <MoreModal
          setOpenMoreModal={setOpenMoreModal}
          type="student"
          userData={userData}
        />
      )}

      {openConfirmModal && <ConfirmModal type="student" />}
      <InfiniteScroll
        dataLength={students.length}
        next={getNextStudents}
        hasMore={totalLength > students.length || loading}
        loader={<SmallLoading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollThreshold={1}
      >
        <table
          style={{ marginBottom: "200px" }}
          className={`details-table  student-table ${
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
            {students?.map((student, i) => (
              <StudentCard
                key={i}
                data={student}
                mode="desktop"
                student={userData}
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1 + (studentPageNum - 1) * 10}
              />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      <div className="details-list-tablet with-more">
        {students?.map((student, i) => (
          <StudentCard
            key={i}
            data={student}
            mode="tablet"
            student={userData}
            setOpenMoreModal={setOpenMoreModal}
            cellNumber={i + 1 + (studentPageNum - 1) * 10}
          />
        ))}
      </div>

      {/* {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={studentPageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )} */}
    </>
  );
};

export default StudentsData;
