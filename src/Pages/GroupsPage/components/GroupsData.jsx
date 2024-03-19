import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const GroupsData = ({ pageNum, getNextTeachers, userData }) => {
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const dispatch = useDispatch();
  const { groupData, hasMore } = useSelector(
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

  // console.log(groupData,"group data")

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
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
            next={getNextTeachers}
            hasMore={hasMore}
            loader={<SmallLoading />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            height={500}
            scrollThreshold={0.8}
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
                    cellNumber={i + 1}
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
                cellNumber={i + 1}
                setOpenMoreModal={setOpenMoreModal}
              />
            ))}
          </div>
        </>
    </>
  );
};

export default GroupsData;
