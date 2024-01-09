import React from "react";
import "./globalHead.css";
import { ReactComponent as PlusIcon } from "../../assets/icons/Plus.svg";
import { useDispatch } from "react-redux";
import { StatusDropdown } from "./StatusDropdown/StatusDropdown";
import Search from "./Search/Search";
import { CoursesDropdown } from "./CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "./GroupsDropdown/GroupsDropdown";

const GlobalHead = ({
  searchData,
  openModal,
  DATA_SEARCH_VALUE,
  dataSearchValues,
  statusType,
  search = true,
  addBtn = true,
  power,
}) => {
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
                <GroupsDropdown deviceType="desktop" />
              )}
            </div>
            {addBtn && (
              <>
                {power === "only-show" ? null : power === "update" ? null : (
                  <button className="add-detail" onClick={openModal}>
                    <PlusIcon />
                    Əlavə et
                  </button>
                )}
              </>
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
