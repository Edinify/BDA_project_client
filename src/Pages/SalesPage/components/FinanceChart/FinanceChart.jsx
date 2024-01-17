import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./financeChart.css";
import Chart from "react-apexcharts";

const FinanceChart = () => {
  const { financeChart } = useSelector((state) => state.financeData);
  const [series, setSeries] = useState([
    {
      name: "Lead",
      data: [
        20, 25, 29, 55, 90, 27, 44, 45, 170, 67, 85, 94, 38, 49, 200, 111, 25,
        66, 33, 44, 77, 88, 99, 22, 16, 72, 74, 28, 55, 144,
      ],
    },
    {
      name: "Planlanan",
      data: [
        66, 37, 29, 43, 53, 73, 100, 99, 80, 67, 90, 117, 26, 50, 30, 141, 49,
        62, 32, 44, 77, 88, 93, 29, 16, 74, 89, 60, 50, 120,
      ],
    },
    {
      name: "Konsultasiya",
      data: [
        44, 52, 29, 35, 60, 77, 99, 33, 57, 37, 96, 71, 37, 170, 134, 111, 66,
        79, 28, 48, 97, 68, 95, 49, 19, 78, 74, 48, 59, 121,
      ],
    },
    {
      name: "Satış",
      data: [
        19, 22, 33, 45, 9, 20, 30, 40, 50, 60, 35, 25, 15, 55, 44, 95, 67, 77,
        38, 42, 57, 78, 47, 17, 16, 10, 39, 49, 59, 100,
      ],
    },
  ]);
  const monthsLang = [
    { key: "January", name: "Yan" },
    { key: "February", name: "Fev" },
    { key: "March", name: "Mar" },
    { key: "April", name: "Apr" },
    { key: "May", name: "May" },
    { key: "June", name: "Iyn" },
    { key: "July", name: "Iyn" },
    { key: "August", name: "Avq" },
    { key: "September", name: "Sen" },
    { key: "October", name: "Okt" },
    { key: "November", name: "Noy" },
    { key: "December", name: "Dek" },
  ];
  const labels =
    financeChart && financeChart.months?.length > 0
      ? financeChart.months.map((item) => {
          return `${monthsLang.find((data) => data.key === item.month)?.name} ${
            item.year
          }`;
        })
      : [];

  const incomeValues =
    financeChart && financeChart?.chartIncome?.length > 0
      ? financeChart?.chartIncome.map((item) => {
          return item;
        })
      : [];

  const expenseValues =
    financeChart && financeChart?.chartExpense?.length > 0
      ? financeChart?.chartExpense.map((item) => {
          return item;
        })
      : [];

  const turnoverValues =
    financeChart && financeChart?.chartTurnover?.length > 0
      ? financeChart?.chartTurnover.map((item) => {
          return item;
        })
      : [];

  const profitValues =
    financeChart && financeChart?.chartProfit?.length > 0
      ? financeChart?.chartProfit.map((item) => {
          return item;
        })
      : [];

  let options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 351,
          },
        },
      },
    ],
    colors: [
      "rgba(5, 165, 234, 0.10)",
      "rgba(240, 59, 42, 0.10)",
      "rgba(251, 160, 19, 0.10)",
      "rgba(0, 188, 133, 0.10",
    ],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1,
      colors: ["#05A5EA", "#F03B2A", "#FBA013", "#00BC85"],
    },
    xaxis: {
      categories: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const selectData = (value) => {
    setSeries([
      {
        name: "Mədaxil",
        data: value === "Mədaxil" ? [...incomeValues] : [0],
      },
      {
        name: "Xərc",
        data: value === "Xərc" ? [...expenseValues] : [0],
      },
      {
        name: "Dövriyyə",
        data: value === "Dövriyyə" ? [...turnoverValues] : [0],
      },
      {
        name: "Qazanc",
        data: value === "Qazanc" ? [...profitValues] : [0],
      },
    ]);
  };

  useEffect(() => {
    // setSeries([
    //   {
    //     name: "Mədaxil",
    //     data: [...incomeValues],
    //   },
    //   {
    //     name: "Xərc",
    //     data: [...expenseValues],
    //   },
    //   {
    //     name: "Dövriyyə",
    //     data: [...turnoverValues],
    //   },
    //   {
    //     name: "Qazanc",
    //     data: [...profitValues],
    //   },
    // ]);
  }, [financeChart]);

  return (
    <div className="finance-chart">
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height="305"
      />

      <div className="chart-legends">
        <div className="legend blue" onClick={() => selectData("Mədaxil")}>
          Lead
        </div>
        <div className="legend red" onClick={() => selectData("Xərc")}>
          Planlanan
        </div>
        <div className="legend yellow" onClick={() => selectData("Dövriyyə")}>
          Konsultasiya
        </div>
        <div className="legend green" onClick={() => selectData("Qazanc")}>
          Satış
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;
