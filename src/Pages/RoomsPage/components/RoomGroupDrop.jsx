import React, { useState } from "react";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";

const RoomGroupDropdown = ({ data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className={`global-category-dropdown dropdown-name data-status  ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <h2>Qruplar</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body room">
        <ul>
          {data?.map((group, i) => (
            <li key={i}>
              {group?.name} -
              {group?.lessonDate?.map((item, index) => (
                <div key={index}>
                  <span>
                    {item.startTime} - {item.endTime}
                  </span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomGroupDropdown;
