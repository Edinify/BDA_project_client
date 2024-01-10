import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeacherCard from "./TeacherCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const TeachersData = ({ teacherPageNum, getPageNumber, userData }) => {
  const dispatch = useDispatch();
  const { teachers, totalPages } = useSelector(
    (state) => state.teachersPagination
  );
  const { loading } = useSelector((state) => state.teachersPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const tableHead =
    userData.power === "only-show"
      ? [
          { id: 1, label: "Təlimçi adı" },
          { id: 2, label: "Fənn" },
          { id: 3, label: "Email" },
          { id: 4, label: "Telefon nömrəsi" },
          { id: 6, label: "" },
        ]
      : [
          { id: 1, label: "Təlimçi adı" },
          { id: 2, label: "Fənn" },
          { id: 3, label: "Email" },
          { id: 4, label: "Telefon nömrəsi" },
          { id: 6, label: "" },
          { id: 8, label: "" },
        ];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openMoreModal && (
            <MoreModal
              setOpenMoreModal={setOpenMoreModal}
              type="teacher"
              userData={userData}
            />
          )}
          {openConfirmModal && (
            <ConfirmModal
              setOpenConfirmModal={setOpenConfirmModal}
              type="teacher"
            />
          )}
          <table
            className={`details-table  teacher-table ${
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
              {teachers?.map((teacher, i) => (
                <TeacherCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  teacher={userData}
                  cellNumber={i + 1 + (teacherPageNum - 1) * 10}
                  setOpenMoreModal={setOpenMoreModal}
                  setOpenConfirmModal={setOpenConfirmModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {teachers?.map((teacher, i) => (
              <TeacherCard
                key={i}
                data={teacher}
                mode="tablet"
                teacher={userData}
                cellNumber={i + 1 + (teacherPageNum - 1) * 10}
                setOpenMoreModal={setOpenMoreModal}
                setOpenConfirmModal={setOpenConfirmModal}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={teacherPageNum}
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

export default TeachersData;
