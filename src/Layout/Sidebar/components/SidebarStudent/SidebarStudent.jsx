import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as TableIcon } from "../../../../assets/icons/tableIcon.svg";
import { ReactComponent as SalaryIcon } from "../../../../assets/icons/salaryIcon.svg";

const SidebarStudent = ({ closeSidebar }) => {
  const location = useLocation();
  return (
    <ul className="sidebar-nav-list">
      <li>
        <Link
          onClick={closeSidebar}
          to="/student-panel"
          className={location.pathname === "/student-panel" ? "active" : ""}
        >
          <TableIcon />
          Home
        </Link>
      </li>
    </ul>
  );
};

export default SidebarStudent;
