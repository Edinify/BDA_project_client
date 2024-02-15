import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentCard from "./StudentCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const StudentsData = ({ studentPageNum, getPageNumber, userData }) => {
  const { students, totalPages } = useSelector(
    (state) => state.studentsPagination
  );
  const { loading } = useSelector((state) => state.studentsPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.studentsModal);

  const tableHead = ["Tələbə adı", "İxtisas", "Mobil nömrə", "Qrup", ""];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  // console.log(studentPageNum, "student page num");
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openMoreModal && (
            <MoreModal
              setOpenMoreModal={setOpenMoreModal}
              type="student"
              userData={userData}
            />
          )}

          {openConfirmModal && <ConfirmModal type="student" />}
          <table
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

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={studentPageNum}
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

export default StudentsData;
