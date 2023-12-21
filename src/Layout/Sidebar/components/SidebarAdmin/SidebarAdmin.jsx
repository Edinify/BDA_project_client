import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as MainPanelIcon } from "../../../../assets/icons/mainPanelIcon.svg";
import { ReactComponent as CoursesIcon } from "../../../../assets/icons/coursesIcon.svg";
import { ReactComponent as TeachersIcon } from "../../../../assets/icons/teachersIcon.svg";
import { ReactComponent as StudentsIcon } from "../../../../assets/icons/studentsIcon.svg";
import { ReactComponent as TableIcon } from "../../../../assets/icons/tableIcon.svg";
import { ReactComponent as FeedBacksIcon } from "../../../../assets/icons/sidebar/feedbacks-icon.svg";

const SidebarAdmin = ({ closeSidebar }) => {
  const location = useLocation();
  let nav = ["/student", "/"];
  const isActiveRoute = (route) => {
    return nav.includes(route);
  };

  const feedbackNav = ["/feedback/teacher", "/feedback/student"];
  const isfeedbackRoute = (route) => {
    return feedbackNav.includes(route);
  };

  return (
    <ul className="sidebar-nav-list">
      <li>
        <NavLink
          to="/"
          onClick={closeSidebar}
          className={isActiveRoute(location.pathname) ? "active" : ""}
        >
          <MainPanelIcon />
          Davamiyyət
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses" onClick={closeSidebar}>
          <CoursesIcon />
          Fənlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/teachers" onClick={closeSidebar}>
          <TeachersIcon />
          Müəllimlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/students" onClick={closeSidebar}>
          <StudentsIcon />
          Tələbələr
        </NavLink>
      </li>
      <li>
        <NavLink to="/lesson-table" onClick={closeSidebar}>
          <TableIcon />
          Cədvəl
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/feedback/teacher"
          onClick={closeSidebar}
          className={isfeedbackRoute(location.pathname) ? "active" : ""}
        >
          <FeedBacksIcon />
          Rəylər
        </NavLink>
      </li>

      {/* temporary table */}
      <li>
        <NavLink to="/temporary-table" onClick={closeSidebar}>
          <TableIcon />
          Müvəqqəti cədvəl
        </NavLink>
      </li>
    </ul>
  );
};

export default SidebarAdmin;
