import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DropdownArrowFinanceIcon1 } from "../../../../assets/icons/dashboard/arrow-down-finance1.svg";
import { ReactComponent as DropdownArrowFinanceIcon2 } from "../../../../assets/icons/dashboard/arrow-up.svg";
import { ReactComponent as TurnoverIcon } from "../../../../assets/icons/dashboard/refresh-cw-02.svg";
import { ReactComponent as ProfitIcon } from "../../../../assets/icons/dashboard/bank-note-01.svg";
import StudentsAmount from "../StudentsAmount/StudentsAmount";
import LessonStatistics from "../LessonStatistics/LessonStatistics";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import WhereHeard from "../WhereHeard/WhereHeard";
import { getDashboardFinanceAction } from "../../../../redux/actions/dashboardAction";
import { ReactComponent as ArrowRihgt1 } from "../../../../assets/icons/dashboard/arrow-right1.svg";
import { ReactComponent as ArrowRihgt2 } from "../../../../assets/icons/dashboard/arrow-right2.svg";
import { ReactComponent as ArrowRihgt3 } from "../../../../assets/icons/dashboard/arrow-right3.svg";
import { ReactComponent as ArrowRihgt4 } from "../../../../assets/icons/dashboard/arrow-right4.svg";
import { Table } from "../../../../globalComponents/Table/Table";

const FinanceStatistics = ({ dashboardKeys }) => {
  const dispatch = useDispatch();
  const { dashboardFinanceData } = useSelector((state) => state.dashboardData);

  return (
    <section className="finance-statictics">
      <div className="finance-statictics-con">
        <div className="content-box finance">
          <div className="left blue" style={{ transform: "rotate(90deg)" }}>
            <ArrowRihgt1 />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Lead</h2>
            </div>
            <p className="amount">{dashboardFinanceData?.leadsCount || 0}</p>
          </div>
        </div>

        <div className="content-box finance">
          <div className="left red" style={{ transform: "rotate(90deg)" }}>
            <ArrowRihgt2 />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Planlanan</h2>
            </div>
            <p className="amount">{dashboardFinanceData?.plansCount || 0}</p>
          </div>
        </div>

        <div className="content-box finance">
          <div className="left orange" style={{ transform: "rotate(90deg)" }}>
            <ArrowRihgt3 />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Konsultasiya</h2>
            </div>
            <p className="amount">
              {dashboardFinanceData?.consultationsCount || 0}
            </p>
          </div>
        </div>

        <div className="content-box finance last">
          <div className="left green" style={{ transform: "rotate(90deg)" }}>
            <ArrowRihgt4 />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Satış</h2>
            </div>
            <p className="amount">{dashboardFinanceData?.salesCount || 0}</p>
          </div>
        </div>
      </div>

      <div className="tablet-last-box">
        <div className="left">
          <div className="content-box finance">
            <div className="left green">
              <ProfitIcon />
            </div>

            <div className="right">
              <div className="top">
                <h2 className="title">Aylıq qazanc</h2>
                <div className="diff-pointer plus">+36.47%</div>
              </div>
              <p className="amount">
                ₼{" "}
                {dashboardFinanceData?.profit
                  ? dashboardFinanceData?.profit
                  : 0}
              </p>
            </div>
          </div>
          <LessonStatistics />
          <WhereHeard dashboardKeys={dashboardKeys} />
        </div>

        <div className="right">
          <StudentsAmount />
          <Table/>
          {/* <LeaderBoard type="mobile" /> */}
        </div>
      </div>
    </section>
  );
};

export default FinanceStatistics;
