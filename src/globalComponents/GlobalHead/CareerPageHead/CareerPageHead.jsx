import React from "react";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import ExcelExportBtn from "../../ExcelExportBtn/ExcelExportBtn";

const CareerPageHead = ({ filter }) => {
  return (
    <div className="career-filter-header">
      <CoursesDropdown deviceType="desktop" />
      <GroupsDropdown deviceType="desktop" />
      <div className="lesson-table-btn-container student ">
        <button className="add-detail" onClick={() => filter()}>
          Tətbiq et
        </button>
      </div>
      <ExcelExportBtn pageName={"career"} />
    </div>
  );
};

export default CareerPageHead;
