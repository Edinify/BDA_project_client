import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

const GroupsData = ({ pageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { groupData, totalPages, loading } = useSelector(
    (state) => state.groupsPagination
  );
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const tableHead = [
    "Qrup adı",
    "İxtisas",
    "Təlimçilər",
    "Tələbələr",
    "Dərs günləri",
    "Başlama tarixi",
    "Bitmə tarixi",
    "",
    ""
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
              type="groups"
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
              {groupData?.map((teacher, i) => (
                <GroupCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                  setOpenConfirmModal={setOpenConfirmModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {groupData?.map((teacher, i) => (
              <GroupCard
                key={i}
                data={teacher}
                mode="tablet"
                cellNumber={i + 1 + (pageNum - 1) * 10}
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

export default GroupsData;
