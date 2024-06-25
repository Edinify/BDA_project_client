import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as TableIcon } from "../../../../assets/icons/tableIcon.svg";
import { ReactComponent as EventsIcon } from "../../../../assets/icons/sidebar/events.svg";
import { ReactComponent as HomeIcon } from "../../../../assets/icons/teacherHome/teacher-home.svg";

const SidebarTeacher = ({ closeSidebar }) => {
  const location = useLocation();
  return (
    <ul className="sidebar-nav-list">
      {/* <li>
        <Link
          onClick={closeSidebar}
          to="/teacher-panel/home"
          className={
            location.pathname === "/teacher-panel/home" ? "active" : ""
          }
        >
          <HomeIcon />
          Home
        </Link>
      </li> */}
      <li>
        <Link
          onClick={closeSidebar}
          to="/teacher-panel"
          className={location.pathname === "/teacher-panel" ? "active" : ""}
        >
          <TableIcon />
          Cədvəl
        </Link>
      </li>
      <li>
        <Link
          to="/event"
          onClick={closeSidebar}
          className={location.pathname === "/event" ? "active" : ""}
        >
          <EventsIcon />
          Tədbirlər
        </Link>
      </li>
    </ul>
  );
};

export default SidebarTeacher;
