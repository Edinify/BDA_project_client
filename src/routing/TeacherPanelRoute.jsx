import React from "react";
import { Route } from "react-router";
import LessonTablePage from "../Pages/LessonTablePage/LessonTablePage";

const TeacherPanelRoute = () => {
  return (
    <>
      <Route path="/teacher-panel/" element={<LessonTablePage />} />
    </>
  );
};

export default TeacherPanelRoute;
