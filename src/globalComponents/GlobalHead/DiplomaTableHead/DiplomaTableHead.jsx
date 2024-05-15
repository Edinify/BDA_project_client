import React from "react";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import "./diploma.css";

const DiplomaTableHead = ({ filter }) => {
  return (
    <div className="diploma-page-header-container">
      <div className="diploma-table-status">
        <GroupsDropdown deviceType="desktop" />
      </div>
      <div className="diploma-table-btn-container diploma-page ">
        <button className="add-detail" onClick={() => filter()}>
          Tətbiq et
        </button>
      </div>
    </div>
  );
};

export default DiplomaTableHead;
