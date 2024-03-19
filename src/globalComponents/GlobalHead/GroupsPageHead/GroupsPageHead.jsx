import React from "react";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { TeachersDropdown } from "../TeachersDropdown/TeachersDropdown";
import { ReactComponent as HalfCircleICon } from "../../../assets/icons/filter/half-circle-svgrepo-com.svg";

const GroupsPageHead = ({ filter, count }) => {
  return (
    <div className="groups-filter-header">
      <CoursesDropdown deviceType="desktop" />
      <TeachersDropdown deviceType="desktop" />
      <div className="lesson-table-btn-container groups ">
        <button className="add-detail" onClick={() => filter()}>
          Tətbiq et
        </button>
      </div>
      <div className="circle-icon">
        <p className="filter-count">{count}</p>
        <HalfCircleICon />
      </div>
    </div>
  );
};

export default GroupsPageHead;
