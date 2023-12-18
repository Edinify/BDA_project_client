import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./teacherLessonStatistics.css";
import Chart from "react-apexcharts";
import DateDropdown from "../../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { getTeacherLessonStatisticsAction } from "../../../../../redux/actions/teachersActions";

const TeacherLessonStatistics = ({ mode }) => {
  const dispatch = useDispatch();
  const { teacherLessonStatistics } = useSelector(
    (state) => state.teachersPagination
  );
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
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
  const differentYears = teacherLessonStatistics?.months?.find((item) => {
    return item.year !== teacherLessonStatistics?.months[0].year;
  })
    ? true
    : false;
  const labels =
    teacherLessonStatistics && teacherLessonStatistics.months?.length > 0
      ? teacherLessonStatistics.months.map((item) => {
          return `${monthsLang.find((data) => data.key === item.month)?.name} ${
            // differentYears ? item.year : ""
            item.year
          }`;
        })
      : [];
  const studentCountValues =
    teacherLessonStatistics &&
    teacherLessonStatistics?.studentsCountList?.length > 0
      ? teacherLessonStatistics?.studentsCountList.map((item) => {
          return item;
        })
      : [];
  const lessonCountValues =
    teacherLessonStatistics &&
    teacherLessonStatistics?.lessonsCountList?.length > 0
      ? teacherLessonStatistics?.lessonsCountList.map((item) => {
          return item;
        })
      : [];

  const [series, setSeries] = useState([
    {
      name: "Dərslərin sayına görə",
      data: [0],
    },
    {
      name: "Tələbə sayına görə",
      data: [0],
    },
  ]);

  let options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1100,
        options: {
          chart: {
            height: 240,
          },
        },
      },
      {
        breakpoint: 780,
        options: {
          chart: {
            height: "100%",
          },
        },
      },
    ],
    colors: ["rgba(5, 165, 234, 0.10)", "rgba(251, 160, 19, 0.10)"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1,
      colors: ["#05A5EA", "#FBA013"],
    },
    xaxis: {
      categories: [...labels],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const applyFilter = (startDate, endDate) => {
    dispatch(getTeacherLessonStatisticsAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdown(false);
  };
  const applyMonthsFilter = (option) => {
    if (option.key === 1) {
      dispatch(getTeacherLessonStatisticsAction("", "", 3));
    } else {
      dispatch(getTeacherLessonStatisticsAction("", "", option.key));
    }
  };
  const selectData = (dataType) => {
    if (dataType === "lessons") {
      setSeries([
        {
          name: "Dərslərin sayına görə",
          data: [...lessonCountValues],
        },
        {
          name: "Tələbə sayına görə",
          data: [0],
        },
      ]);
    } else if ("students") {
      setSeries([
        {
          name: "Dərslərin sayına görə",
          data: [0],
        },
        {
          name: "Tələbə sayına görə",
          data: [...studentCountValues],
        },
      ]);
    }
  };
  
  useEffect(() => {
    setSeries([
      {
        name: "Dərslərin sayına görə",
        data: [...lessonCountValues],
      },
      {
        name: "Tələbə sayına görə",
        data: [...studentCountValues],
      },
    ]);
  }, [teacherLessonStatistics])

  useEffect(() => {
    dispatch(getTeacherLessonStatisticsAction("", "", 3));
  }, []);


  return (
    <>
      <div className={`teacher-lesson-statistics ${mode}`}>
        <div className="top">
          <h2>Dərslərin statistikası</h2>
          <DateDropdown
            optionType={"date"}
            // calendar={true}
            setOpenCalendar={setOpenCalendar}
            openCalendar={openCalendar}
            applyMonthsFilter={applyMonthsFilter}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            monthCount={3}
          />
        </div>
        <div className="bottom">
          <Chart
            options={options}
            series={series}
            type="area"
            width="100%"
            height="305"
          />

          <div className="chart-legends">
            <div className="legend blue" onClick={() => selectData("lessons")}>
              Dərslərin sayına görə
            </div>
            <div
              className="legend yellow"
              onClick={() => selectData("students")}
            >
              Tələbə sayına görə
            </div>
          </div>
        </div>
      </div>

      {openCalendar && (
        <DateRangeModal
          setOpenCalendar={setOpenCalendar}
          applyFilter={applyFilter}
          type="months"
        />
      )}
    </>
  );
};

export default TeacherLessonStatistics;
