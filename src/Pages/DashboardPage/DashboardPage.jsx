import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LessonsAmount from "./components/LessonsAmount/LessonsAmount";
import LessonStatistics from "./components/LessonStatistics/LessonStatistics";
import WhereHeard from "./components/WhereHeard/WhereHeard";
import StudentsAmount from "./components/StudentsAmount/StudentsAmount";
import FinanceStatistics from "./components/FinanceStatistics/FinanceStatistics";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";
import {
  getDashboarLeadboarddAction,
  getDashboardAdvertisingAction,
  getActiveStudentsCountAction,
  getAllStudentsCountAction,
  getDashboardCourseStatisticAction,
  getDashboardConsultationsDataAction,
  getDashboardStudentsAmountAction,
  getAllGroupsAction,
  getAllEventsAction,
  getDashboardWeeklyTable
} from "../../redux/actions/dashboardAction";
import { Table } from "../../globalComponents/Table/Table";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardKeys, setDashboardKeys] = useState({});

  useEffect(() => {
    dispatch(getDashboardConsultationsDataAction());
    dispatch(getAllStudentsCountAction("", "", 1));
    dispatch(getActiveStudentsCountAction("", "", 1));
    dispatch(getAllGroupsAction("", "", 1));
    dispatch(getAllEventsAction("", "", 1));
    dispatch(getDashboardCourseStatisticAction("", "", 1));
    dispatch(getDashboardAdvertisingAction("", "", 1));
    dispatch(getDashboardStudentsAmountAction("", "", 3));
    dispatch(getDashboarLeadboarddAction("", "", 1, "lessonCount"));
    dispatch(getDashboardWeeklyTable())
  }, []);

  

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-main desktop">
          <div className="left">
            <LessonsAmount />
            <LessonStatistics />
            <WhereHeard dashboardKeys={dashboardKeys} />
          </div>

          <div className="right">
            <div className="top">
              <StudentsAmount />
              <FinanceStatistics dashboardKeys={dashboardKeys} />
            </div>

            <div className="bottom">
              <Table/>
            </div>
          </div>
        </div>

        <div className="dashboard-main tablet">
          <LessonsAmount />
          <FinanceStatistics dashboardKeys={dashboardKeys} />
        </div>

        <div className="dashboard-main mobile">
          <LessonsAmount />
          <FinanceStatistics dashboardKeys={dashboardKeys} />
          <StudentsAmount />
          <LessonStatistics type="mobile" />
          <WhereHeard dashboardKeys={dashboardKeys} />
          <LeaderBoard type="mobile" />

        </div>
      </div>
    </div>
  );
};
