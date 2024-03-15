import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

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
    "Müəllimlər",
    "Təlimçilər",
    "Tələbələr",
    "Dərs günləri",
    "Başlama tarixi",
    "Bitmə tarixi",
    "Status",
    "",
  ];

  console.log(groupData,"group data")

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
          <InfiniteScroll
            dataLength={groupData.length}
            // next={getNextTeachers}
            // hasMore={totalLength > teachers.length || loading}
            hasMore={groupData.length || loading}
            loader={<SmallLoading />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            height={550}
            scrollThreshold={0.7}
          >
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
          </InfiniteScroll>

          <div className="details-list-tablet">
            {groupData?.map((teacher, i) => (
              <GroupCard
                key={i}
                data={teacher}
                group={userData}
                mode="tablet"
                cellNumber={i + 1 + (pageNum - 1) * 10}
                setOpenMoreModal={setOpenMoreModal}
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

export default GroupsData;
