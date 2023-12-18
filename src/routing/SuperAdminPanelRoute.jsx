import React from "react";
import { Route } from "react-router";
import { Dashboard } from "../Pages/DashboardPage/DashboardPage";
import MainPage from "../Pages/MainPage/MainPage";
import TablePage from "../Pages/TablePage/TablePage";
import TemporaryTable from "../Pages/TemporaryTable/TemporaryTable";
import SalaryPage from "../Pages/SalaryPage/SalaryPage";
import TeachersPage from "../Pages/TeachersPage/TeachersPage";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import StimulationPage from "../Pages/StimulationPage/StimulationPage";
import FinancePage from "../Pages/FinancePage/FinancePage";
import FeedbackPage from "../Pages/FeedbacksPage/FeedbackPage";
import AdminsPage from "../Pages/AdminsPage/AdminsPage";
import TuitionFeePage from "../Pages/TuitionFeePage/TuitionFee";
import ConsultationsPage from "../Pages/ConsultationsPage/ConsultationsPage";
import GroupsPage from "../Pages/GroupsPage/GroupsPage";

const SuperAdminPanelRoute = () => {
  return (
    <>
      <Route path="/" element={<MainPage />} />
      <Route path="/student" element={<MainPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/salary" element={<SalaryPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/stimulations" element={<StimulationPage />} />
      <Route path="/stimulations/fine" element={<StimulationPage />} />
      <Route path="/stimulations/bonus" element={<StimulationPage />} />
      <Route path="/finance" element={<FinancePage />} />
      <Route path="/finance/expenses" element={<FinancePage />} />
      <Route path="/finance/incomes" element={<FinancePage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/feedback/teacher" element={<FeedbackPage />} />
      <Route path="/feedback/student" element={<FeedbackPage />} />
      <Route path="/admins" element={<AdminsPage />} />
      <Route path="/tuition-fee" element={<TuitionFeePage />} />
      <Route path="/consultations" element={<ConsultationsPage />} />
      <Route path="/groups/current" element={<GroupsPage />} />
      <Route path="/groups/waiting" element={<GroupsPage />} />
      {/* temporary table */}
      <Route path="/temporary-table" element={<TemporaryTable />} />
    </>
  );
};

export default SuperAdminPanelRoute;
