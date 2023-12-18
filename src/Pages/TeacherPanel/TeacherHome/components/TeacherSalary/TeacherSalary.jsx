import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./teacherSalary.css";
import DateDropdown from "../../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { getSalaryTeacherPaginationAction } from "../../../../../redux/actions/salaryActions";

const TeacherSalary = () => {
  const dispatch = useDispatch();
  const { teacherSalaryData } = useSelector((state) => state.salaryPagination);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const applyFilter = (startDate, endDate) => {
    dispatch(getSalaryTeacherPaginationAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdown(false)
  };
  
  const applyMonthsFilter = (option) => {
    dispatch(getSalaryTeacherPaginationAction("", "", option.key));
  };

  useEffect(() => {
    dispatch(getSalaryTeacherPaginationAction("", "", 1));
  }, [dispatch]);


  return (
    <>
      <div className="teacher-salary">
        <div className="top">
          <h2 className="title">Əmək haqqı</h2>
          <DateDropdown
            optionType={"date"}
            calendar={true}
            setOpenCalendar={setOpenCalendar}
            openCalendar={openCalendar}
            applyMonthsFilter={applyMonthsFilter}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>

        <div className="bottom">
          <div className="content-con">
            <label htmlFor="" className="content-type">
              İştirakçıların sayı:
            </label>
            <p className="content-value">
              {teacherSalaryData?.participantCount}
            </p>
          </div>

          <div className="content-con">
            <label htmlFor="" className="content-type">
              Əmək haqqı:
            </label>
            <p className="content-value">
              {teacherSalaryData?.salary?.value} AZN{" "}
              {teacherSalaryData?.salary?.hourly && "(saatlıq)"}
              {teacherSalaryData?.salary?.monthly && "(aylıq)"}
            </p>
          </div>

          <div className="content-con">
            <label htmlFor="" className="content-type">
              Bonus:
            </label>
            <p className="content-value">{teacherSalaryData?.bonus} AZN</p>
          </div>

          <div className="content-con">
            <label htmlFor="" className="content-type">
              Ümumi əmək haqqı:
            </label>
            <p className="content-value">{teacherSalaryData?.totalSalary} AZN</p>
          </div>
        </div>
      </div>

      {openCalendar && (
        <DateRangeModal
          setOpenCalendar={setOpenCalendar}
          applyFilter={applyFilter}
        />
      )}
    </>
  );
};

export default TeacherSalary;
