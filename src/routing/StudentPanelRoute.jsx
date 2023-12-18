import React from "react";
import { Route } from "react-router";
import StudentTable from "../Pages/StudentPanel/StudentTable";

const StudentPanelRoute = () => {
  return (
    <>
      <Route path="/student-panel" element={<StudentTable />} />
    </>
  );
};

export default StudentPanelRoute;
