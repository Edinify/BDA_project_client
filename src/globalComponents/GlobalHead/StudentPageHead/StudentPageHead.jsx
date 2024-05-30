import React from "react";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import { ReactComponent as HalfCircleICon } from "../../../assets/icons/filter/half-circle-svgrepo-com.svg";
import ExcelExportBtn from "../../../globalComponents/ExcelExportBtn/ExcelExportBtn";
import StudentStatusDropdown from "../StudentStatusDropdown/StudentStatusDropdown";

const StudentPageHead = ({ filter, count }) => {
  return (
    <div className="student-filter-header">
      <CoursesDropdown deviceType="desktop" />
      <GroupsDropdown deviceType="desktop" />
      <StudentStatusDropdown deviceType="desktop" />
      <div className="lesson-table-btn-container student ">
        <button className="add-detail" onClick={() => filter()}>
          Tətbiq et
        </button>
      </div>
      <div className="circle-icon">
        <p className="filter-count">{count || 0}</p>
        <HalfCircleICon />
      </div>
      <ExcelExportBtn pageName="student" />
    </div>
  );
};

export default StudentPageHead;
