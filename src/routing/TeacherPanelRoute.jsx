import React from "react";
import TeacherTable from "../Pages/TeacherPanel/TeacherTable/TeacherTable";
import  TeacherHome from "../Pages/TeacherPanel/TeacherHome/TeacherHome"
import { Route } from "react-router";

const TeacherPanelRoute = () => {

  return (
    <>
      <Route path="/teacher-panel/" element={<TeacherTable />} />
      <Route path="/teacher-panel/home" element={<TeacherHome/>}  />
    </>
  );
};

export default TeacherPanelRoute;
