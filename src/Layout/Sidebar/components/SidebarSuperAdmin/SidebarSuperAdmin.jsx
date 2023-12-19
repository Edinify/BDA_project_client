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
import { ReactComponent as IncomesIcon } from "../../../../assets/icons/incomesIcon.svg";
import { ReactComponent as FeedBacksIcon } from "../../../../assets/icons/sidebar/feedbacks-icon.svg";
import { ReactComponent as AdminIcon } from "../../../../assets/icons/sidebar/users-01.svg";

const SidebarSuperAdmin = ({ closeSidebar }) => {
  return (
    <ul className="sidebar-nav-list">
      <li>
        <NavLink to="/workers" onClick={closeSidebar} className="admin">
          <AdminIcon />
          Əməkdaşlar
        </NavLink>
      </li>
      <li>
        <NavLink to="/groups/current" onClick={closeSidebar}>
          <StudentsIcon />
          Qruplar
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
        <NavLink to="/tuition-fee" onClick={closeSidebar}>
          <SalaryIcon />
          Təhsil haqqı
        </NavLink>
      </li>
      <li>
        <NavLink to="/career" onClick={closeSidebar}>
          <SalaryIcon />
          Karyera
        </NavLink>
      </li>
      <li>
        <NavLink to="/consultation" onClick={closeSidebar}>
          <SalaryIcon />
          Konsultasiya
        </NavLink>
      </li>
    </ul>
  );
};

export default SidebarSuperAdmin;
