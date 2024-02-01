import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../../../assets/icons/dashboardIcon.svg";
import { ReactComponent as MainPanelIcon } from "../../../../assets/icons/mainPanelIcon.svg";
import { ReactComponent as CoursesIcon } from "../../../../assets/icons/coursesIcon.svg";
import { ReactComponent as TeachersIcon } from "../../../../assets/icons/teachersIcon.svg";
import { ReactComponent as StudentsIcon } from "../../../../assets/icons/studentsIcon.svg";
import { ReactComponent as TableIcon } from "../../../../assets/icons/tableIcon.svg";
import { ReactComponent as SalaryIcon } from "../../../../assets/icons/salaryIcon.svg";
import { ReactComponent as ExpensesIcon } from "../../../../assets/icons/expensenIcon.svg";
import { ReactComponent as SalesIcon } from "../../../../assets/icons/sidebar/sales.svg";
import { ReactComponent as IncomesIcon } from "../../../../assets/icons/incomesIcon.svg";
import { ReactComponent as FeedBacksIcon } from "../../../../assets/icons/sidebar/feedbacks-icon.svg";
import { ReactComponent as AdminIcon } from "../../../../assets/icons/sidebar/users-01.svg";
import { ReactComponent as GroupIcon } from "../../../../assets/icons/sidebar/group-svgrepo-com.svg";
import { ReactComponent as CareerIcon } from "../../../../assets/icons/sidebar/work-case-filled-svgrepo-com (1).svg";
import { ReactComponent as EventsIcon } from "../../../../assets/icons/sidebar/events.svg";
import { ReactComponent as SyllabusIcon } from "../../../../assets/icons/sidebar/syllabus-svgrepo-com.svg";

const SidebarSuperAdmin = ({ closeSidebar }) => {
  const location = useLocation();
  const consultationNav = [
    "/consultation/appointed",
    "/consultation/completed",
  ];
  const groupsNav = ["/groups/current", "/groups/waiting"];

  return (
    <ul className="sidebar-nav-list">
      <li>
        <NavLink to="/" onClick={closeSidebar} className="admin">
          <TableIcon />
          Cədvəl
        </NavLink>
      </li>
      <li>
        <NavLink to="/students" onClick={closeSidebar}>
          <StudentsIcon />
          Tələbələr
        </NavLink>
      </li>
      <li>
        <NavLink to="/teachers" onClick={closeSidebar}>
          <TeachersIcon />
          Təlimçilər
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses" onClick={closeSidebar}>
          <CoursesIcon />
          Fənlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/syllabus" onClick={closeSidebar}>
          <SyllabusIcon />
          Sillabus
        </NavLink>
      </li>
      <li>
        <NavLink
          className={
            consultationNav.includes(location.pathname) ? "active" : ""
          }
          to="/consultation/appointed"
          onClick={closeSidebar}
        >
          <MainPanelIcon />
          Konsultasiya
        </NavLink>
      </li>
      <li>
        <NavLink to="/workers" onClick={closeSidebar} className="admin">
          <AdminIcon />
          Əməkdaşlar
        </NavLink>
      </li>
      <li>
        <NavLink
          className={groupsNav.includes(location.pathname) ? "active" : ""}
          to="/groups/waiting"
          onClick={closeSidebar}
        >
          <GroupIcon />
          Qruplar
        </NavLink>
      </li>

      <li>
        <NavLink to="/tuition-fee" onClick={closeSidebar}>
          <ExpensesIcon />
          Təhsil haqqı
        </NavLink>
      </li>
      <li>
        <NavLink to="/sales" onClick={closeSidebar}>
          <SalesIcon />
          Satış
        </NavLink>
      </li>
      <li>
        <NavLink to="/career" onClick={closeSidebar}>
          <CareerIcon />
          Karyera
        </NavLink>
      </li>
      <li>
        <NavLink to="/event" onClick={closeSidebar}>
          <EventsIcon />
          Tədbirlər
        </NavLink>
      </li>
    </ul>
  );
};

export default SidebarSuperAdmin;
