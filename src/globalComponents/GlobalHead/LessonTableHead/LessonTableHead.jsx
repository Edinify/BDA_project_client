import React from "react";
import LessonStatusResult from "../LessonStatusResult/LessonStatusResult";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import { StatusDropdown } from "../StatusDropdown/StatusDropdown";
import { DatePick } from "../../DatePicker/DatePicker";
import { ReactComponent as PlusIcon } from "../../../assets/icons/Plus.svg";

const LessonTableHead = ({ showAddBtn, filter, openModal }) => {
  return (
    <div className="lesson-page-header-container">
      <div className="lesson-page-header-top">
        <div className="lesson-status-header">
          <LessonStatusResult />
        </div>
        {showAddBtn && (
          <div className="lesson-page-add-btn">
            <button className="add-detail" onClick={openModal}>
              <PlusIcon />
              Əlavə et
            </button>
          </div>
        )}
      </div>
      <div className="lesson-table-page-header-container">
        <div className="lesson-page-filter-container">
          <div className="lesson-table-header-content">
            <div className="lesson-table-status">
              <GroupsDropdown deviceType="desktop" page="lesson-table" />
              <StatusDropdown statusType="lesson-table" deviceType="desktop" />
            </div>
            <div className="lesson-table-datepick">
              <DatePick deviceType="desktop" />
            </div>
          </div>
          <div className="lesson-page-apply-btn">
            <div className="lesson-table-btn-container lesson-page ">
              <button className="add-detail" onClick={() => filter()}>
                Tətbiq et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonTableHead;
