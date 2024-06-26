import React from "react";
import { Route } from "react-router";
// import StudentTable from "../Pages/StudentPanel/StudentTable";
import TeachersPage from "../Pages/TeachersPage/TeachersPage";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import TuitionFeePage from "../Pages/TuitionFeePage/TuitionFee";
import ConsultationsPage from "../Pages/ConsultationsPage/ConsultationsPage";
import GroupsPage from "../Pages/GroupsPage/GroupsPage";
import CareerPage from "../Pages/CareerPage/CareerPage";
import SyllabusPage from "../Pages/SyllabusPage/SyllabusPage";
import LessonTablePage from "../Pages/LessonTablePage/LessonTablePage";
import EventsPage from "../Pages/EventsPage/EventsPage";
import { Dashboard } from "../Pages/DashboardPage/DashboardPage";

const WorkersPanelRoute = (user) => {
  // const { user } = useSelector((state) => state.user);
  const profiles = user?.profiles?.reduce(
    (profilesObj, item) => ({ ...profilesObj, [item.profile]: true }),
    {}
  );

  return (
    <>
      {profiles?.courses && <Route path="/courses" element={<CoursesPage />} />}

      {profiles?.students && (
        <Route path="/students" element={<StudentsPage />} />
      )}
      {profiles?.teachers && (
        <>
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/mentors" element={<TeachersPage />} />
        </>
      )}

      {profiles?.tuitionFee && (
        <Route path="/tuitionFee" element={<TuitionFeePage />} />
      )}

      {profiles?.consultation && (
        <>
          <Route
            path="/consultation/appointed"
            element={<ConsultationsPage />}
          />
          <Route
            path="/consultation/completed"
            element={<ConsultationsPage />}
          />
        </>
      )}

      {profiles?.groups && (
        <>
          <Route path="/groups/current" element={<GroupsPage />} />
          <Route path="/groups/waiting" element={<GroupsPage />} />
          <Route path="/groups/ended" element={<GroupsPage />} />
        </>
      )}

      {profiles?.career && <Route path="/career" element={<CareerPage />} />}

      {profiles?.syllabus && (
        <Route path="/syllabus" element={<SyllabusPage />} />
      )}
      {profiles?.lessonTable && (
        <Route path="/lessonTable" element={<LessonTablePage />} />
      )}
      {profiles?.events && <Route path="/events" element={<EventsPage />} />}
      {profiles?.dashboard && (
        <Route path="/dashboard" element={<Dashboard />} />
      )}
    </>
  );
};

export default WorkersPanelRoute;
