import React, { useEffect, useState } from "react";
import "./financeStatistics.css";
import { useSelector } from "react-redux";
import { ReactComponent as ArrowRihgt1 } from "../../../../assets/icons/dashboard/arrow-right1.svg";
import { ReactComponent as ArrowRihgt2 } from "../../../../assets/icons/dashboard/arrow-right2.svg";
import { ReactComponent as ArrowRihgt3 } from "../../../../assets/icons/dashboard/arrow-right3.svg";
import { ReactComponent as ArrowRihgt4 } from "../../../../assets/icons/dashboard/arrow-right4.svg";
import { ReactComponent as DropdownArrowFinanceIcon2 } from "../../../../assets/icons/dashboard/arrow-up.svg";
import { ReactComponent as TurnoverIcon } from "../../../../assets/icons/dashboard/refresh-cw-02.svg";
import { ReactComponent as ProfitIcon } from "../../../../assets/icons/dashboard/bank-note-01.svg";

const FinanceStatistics = () => {
  const { salesChart } = useSelector((state) => state.salesData);
  const [total, setTotal] = useState({
    lead: 0,
    plan: 0,
    const: 0,
    sales: 0,
  });

  // console.log(salesChart);

  useEffect(() => {
    const totalLead = salesChart.series
      .find((item) => item.name === "Lead")
      .data.reduce((init, value) => init + value, 0);

    const totalPlan = salesChart.series
      .find((item) => item.name === "Planlanan")
      .data.reduce((init, value) => init + value, 0);

    const totalConst = salesChart.series
      .find((item) => item.name === "Konsultasiya")
      .data.reduce((init, value) => init + value, 0);

    const totalSales = salesChart.series
      .find((item) => item.name === "Satış")
      .data.reduce((init, value) => init + value, 0);

    setTotal({
      lead: totalLead,
      plan: totalPlan,
      const: totalConst,
      sales: totalSales,
    });
  }, [salesChart]);

  return (
    <div className="finance-statictics">
      <div className="content-box finance ">
        <div className="left blue" style={{ transform: "rotate(90deg)" }}>
          <ArrowRihgt1 />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Lead</h2>
          </div>
          <p className="amount">{total.lead}</p>
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
          <p className="amount">{total.plan}</p>
        </div>
      </div>

      <div className="content-box finance">
        <div className="left orange" style={{ transform: "rotate(90deg)" }}>
          <ArrowRihgt3 />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Konsultasiya</h2>
            {/* <div className="diff-pointer plus">+36.47%</div> */}
          </div>
          <p className="amount">{total.const}</p>
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
          <p className="amount">{total.sales}</p>
        </div>
      </div>
    </div>
  );
};

export default FinanceStatistics;
