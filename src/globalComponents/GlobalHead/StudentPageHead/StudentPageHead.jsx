import React from "react";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import { ReactComponent as HalfCircleICon } from "../../../assets/icons/filter/half-circle-svgrepo-com.svg";
import { downloadExcelAction } from "../../../redux/actions/studentsActions";
import ExcelExportBtn from "../../../globalComponents/ExcelExportBtn/ExcelExportBtn"

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
      <ExcelExportBtn/>

     
    </div>
  );
};

export default StudentPageHead;
