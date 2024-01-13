import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const GroupsData = ({ pageNum, getPageNumber, userData }) => {
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const dispatch = useDispatch();
  const { groupData, totalPages, loading } = useSelector(
    (state) => state.groupsPagination
  );
  const { openConfirmModal } = useSelector((state) => state.groupModal);

  const tableHead = [
    "Qrup adı",
    "İxtisas",
    "Təlimçilər",
    "Dərs günləri",
    "Başlama tarixi",
    "Bitmə tarixi",
    "",
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
              type="group"
              userData={userData}
            />
          )}

          {openConfirmModal && <ConfirmModal type="groups" />}

          <table
            className={`details-table  teacher-table ${
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
              {groupData?.map((teacher, i) => (
                <GroupCard
                  key={i}
                  data={teacher}
                  group={userData}
                  mode="desktop"
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {groupData?.map((teacher, i) => (
              <GroupCard
                key={i}
                data={teacher}
                group={userData}
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

export default GroupsData;
