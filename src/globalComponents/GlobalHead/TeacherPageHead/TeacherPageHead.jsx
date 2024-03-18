import React from "react";
import Search from "../Search/Search";
import { StatusDropdown } from "../StatusDropdown/StatusDropdown";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import { ReactComponent as PlusIcon } from "../../../assets/icons/Plus.svg";
import { ReactComponent as HalfCircleICon } from "../../../assets/icons/filter/half-circle-svgrepo-com.svg";

const TeacherPageHead = ({
  openModal,
  search,
  filter,
  searchData,
  dataSearchValues,
  DATA_SEARCH_VALUE,
}) => {
  return (
    <div className="teacher-header-filter-container">
      <div className="teahcer-page-add-btn">
        <button className="add-detail" onClick={openModal}>
          <PlusIcon />
          Əlavə et
        </button>
      </div>
      <div className="teacher-header-filter">
        {search && (
          <Search
            searchData={searchData}
            dataSearchValues={dataSearchValues}
            className="search-input-con desktop"
            DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
          />
        )}
        <StatusDropdown statusType="teacher" deviceType="desktop" />
        <CoursesDropdown deviceType="desktop" />
        <GroupsDropdown deviceType="desktop" />

        <div className="lesson-table-btn-container teacher ">
          <button className="add-detail" onClick={() => filter()}>
            Tətbiq et
          </button>
        </div>
        <div className="circle-icon">
          <p className="filter-count">10</p>
          <HalfCircleICon />
        </div>
      </div>
    </div>
  );
};

export default TeacherPageHead;
