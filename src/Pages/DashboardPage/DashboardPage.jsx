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
  getDashboardCancelledLessonsAction,
  getDashboardConfirmedLessonsAction,
  getDashboardCourseStatisticAction,
  getDashboardFinanceAction,
  getDashboardStudentsAmountAction,
  getDashboardUnviewedLessonsAction,
} from "../../redux/actions/dashboardAction";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardKeys, setDashboardKeys] = useState({});

  useEffect(() => {
    dispatch(getDashboardFinanceAction());
    dispatch(getDashboardConfirmedLessonsAction("", "", 1));
    dispatch(getDashboardCancelledLessonsAction("", "", 1));
    dispatch(getDashboardUnviewedLessonsAction("", "", 1));
    dispatch(getDashboardCourseStatisticAction("", "", 1));
    dispatch(getDashboardAdvertisingAction("", "", 1));
    dispatch(getDashboardStudentsAmountAction("", "", 3));
    dispatch(getDashboarLeadboarddAction("", "", 1, "lessonCount"));
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
              <LeaderBoard />
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
