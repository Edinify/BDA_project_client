import React, { useEffect, useState } from "react";
import "./globalHead.css";
import { ReactComponent as PlusIcon } from "../../assets/icons/Plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { StatusDropdown } from "./StatusDropdown/StatusDropdown";
import Search from "./Search/Search";
import { CoursesDropdown } from "./CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "./GroupsDropdown/GroupsDropdown";
import { DatePick } from "../../globalComponents/DatePicker/DatePicker";

const GlobalHead = ({
  searchData,
  openModal,
  DATA_SEARCH_VALUE,
  dataSearchValues,
  statusType,
  search = true,
  addBtn = true,
  profile,
}) => {
  const { user } = useSelector((state) => state.user);
  const [showAddBtn, setShowAddBtn] = useState(false);

  useEffect(() => {
    if (user.role === "super-admin") {
      console.log(2);
      setShowAddBtn(true);
    } else if (user.role === "worker") {
      const checkPower =
        user?.profiles?.find((item) => item.profile === profile)?.power ===
        "all";
      setShowAddBtn(checkPower);
    }
  });

  return (
    <div className="details-header">
      <div className="container">
        <div className="details-header-container">
          <div className="details-header-content">
            <div className="details-header-content-left">
              {search && (
                <Search
                  searchData={searchData}
                  dataSearchValues={dataSearchValues}
                  className="search-input-con desktop"
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                />
              )}

              {statusType === "teacher" && (
                <StatusDropdown statusType="teacher" deviceType="desktop" />
              )}
              {/* {statusType === "student" && (
                <StatusDropdown statusType="student" deviceType="desktop" />
              )} */}
              {statusType === "syllabus" && (
                <CoursesDropdown deviceType="desktop" />
              )}
              {statusType === "lesson-table" && (
                <div className="lesson-table-header-container">
                  <div className="lesson-table-status">
                    <GroupsDropdown deviceType="desktop" />
                    <StatusDropdown
                      statusType="lesson-table"
                      deviceType="desktop"
                    />
                  </div>
                  <div className="lesson-table-datepick">
                    <DatePick />
                  </div>
                </div>
              )}
            </div>
            {addBtn && showAddBtn && (
              <div className="lesson-table-add-btn" >
                {statusType === "lesson-table" && (
                  <button className="add-detail" onClick={openModal}>
                    <PlusIcon />
                    Əlavə et
                  </button>
                )}
                {statusType !== "lesson-table" && (
                  <button className="add-detail" onClick={openModal}>
                    <PlusIcon />
                    Əlavə et
                  </button>
                )}
              </div>
            )}
          </div>
          {statusType === "teacher" && (
            <StatusDropdown statusType="teacher" deviceType="mobile" />
          )}
          {/* {statusType === "student" && (
            <StatusDropdown statusType="student" deviceType="mobile" />
          )} */}
          {statusType === "syllabus" && <CoursesDropdown deviceType="mobile" />}
          {statusType === "lesson-table" && (
            <GroupsDropdown deviceType="mobile" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalHead;
