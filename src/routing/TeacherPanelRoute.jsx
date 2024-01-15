import React from "react";
// import TeacherTable from "../Pages/TeacherPanel/TeacherTable/TeacherTable";
// import TeacherHome from "../Pages/TeacherPanel/TeacherHome/TeacherHome";
import { Route } from "react-router";
import LessonTablePage from "../Pages/LessonTablePage/LessonTablePage";

const TeacherPanelRoute = () => {
  return (
    <>
      <Route path="/teacher-panel/" element={<LessonTablePage />} />
      {/* <Route path="/teacher-panel/home" element={<TeacherHome/>}  /> */}
    </>
  );
};

export default TeacherPanelRoute;
