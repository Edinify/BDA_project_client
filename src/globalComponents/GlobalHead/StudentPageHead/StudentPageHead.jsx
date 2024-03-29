import React from "react";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import { ReactComponent as HalfCircleICon } from "../../../assets/icons/filter/half-circle-svgrepo-com.svg";
import { downloadExcelAction } from "../../../redux/actions/studentsActions";

const StudentPageHead = ({ filter, count }) => {
  return (
    <div className="student-filter-header">
      <CoursesDropdown deviceType="desktop" />
      <GroupsDropdown deviceType="desktop" />
      <div className="lesson-table-btn-container student ">
        <button className="add-detail" onClick={() => filter()}>
          Tətbiq et
        </button>
      </div>
      <div className="circle-icon">
        <p className="filter-count">{count || 0}</p>
        <HalfCircleICon />
      </div>

      <button
        onClick={() => downloadExcelAction()}
        style={{ border: "1px solid orange", cursor: "pointer" }}
      >
        excel
      </button>
    </div>
  );
};

export default StudentPageHead;
