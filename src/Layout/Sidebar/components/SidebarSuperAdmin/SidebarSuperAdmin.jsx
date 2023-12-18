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
  const location = useLocation();
  let nav = ["/student", "/"];
  const isActiveRoute = (route) => {
    return nav.includes(route);
  };

  const stimulationNav = ["/stimulations/bonus", "/stimulations/fine"];
  const isActiveStimulationsRoute = (route) => {
    return stimulationNav.includes(route);
  };
  const feedbackNav = ["/feedback/teacher", "/feedback/student"];
  const isfeedbackRoute = (route) => {
    return feedbackNav.includes(route);
  };

  const financeNav = ["/finance/incomes", "/finance/expenses"];

  const isFinanceRoute = (route) => {
    return financeNav.includes(route);
  };

  return (
    <ul className="sidebar-nav-list">
      {/* <li>
        <NavLink to="/dashboard" onClick={closeSidebar}>
          <DashboardIcon />
          İdarəetmə paneli
        </NavLink>
      </li>
      <li>
        <NavLink to="/groups/current" onClick={closeSidebar}>
          <StudentsIcon />
          Qruplar
        </NavLink>
      </li>
      <li>
        <NavLink to="/tuition-fee" onClick={closeSidebar}>
          <SalaryIcon />
          Təhsil xərcləri
        </NavLink>
      </li>
      <li>
        <NavLink to="/consultations" onClick={closeSidebar}>
          <SalaryIcon />
          Konsultasiyalar
        </NavLink>
      </li>
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
      </li> */}

      <li>
        <NavLink to="/students" onClick={closeSidebar}>
          <StudentsIcon />
          Tələbələr
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/teachers" onClick={closeSidebar}>
          <TeachersIcon />
          Müəllimlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/table" onClick={closeSidebar}>
          <TableIcon />
          Cədvəl
        </NavLink>
      </li>
      <li>
        <NavLink to="/salary" onClick={closeSidebar}>
          <SalaryIcon />
          Əmək haqqı
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/finance/incomes"
          onClick={closeSidebar}
          className={isFinanceRoute(location.pathname) ? "active" : ""}
        >
          <ExpensesIcon />
          Maliyyə
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/stimulations/bonus"
          onClick={closeSidebar}
          className={
            isActiveStimulationsRoute(location.pathname) ? "active" : ""
          }
        >
          <IncomesIcon />
          Həvəsləndirmə
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
      <li>
        <NavLink to="/admins" onClick={closeSidebar} className="admin">
          <AdminIcon />
          Admin
        </NavLink>
      </li>
      <li>
        <NavLink to="/temporary-table" onClick={closeSidebar}>
          <TableIcon />
          Müvəqqəti cədvəl
        </NavLink>
      </li> */}
    </ul>
  );
};

export default SidebarSuperAdmin;
