import React from "react";
import { Route } from "react-router";
import TeachersPage from "../Pages/TeachersPage/TeachersPage";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import TuitionFeePage from "../Pages/TuitionFeePage/TuitionFee";
import ConsultationsPage from "../Pages/ConsultationsPage/ConsultationsPage";
import GroupsPage from "../Pages/GroupsPage/GroupsPage";
import WorkersPage from "../Pages/WorkersPage/WorkersPage";
import CareerPage from "../Pages/CareerPage/CareerPage";

const SuperAdminPanelRoute = () => {
  return (
    <>
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/tuition-fee" element={<TuitionFeePage />} />
      <Route path="/consultation" element={<ConsultationsPage />} />
      <Route path="/groups/current" element={<GroupsPage />} />
      <Route path="/groups/waiting" element={<GroupsPage />} />
      <Route path="/workers" element={<WorkersPage />} />
      <Route path="/career" element={<CareerPage />} />
    </>
  );
};

export default SuperAdminPanelRoute;
