import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CheckIcon } from "../../../../../assets/icons/dashboard/check.svg";
import { ReactComponent as Xicon } from "../../../../..//assets/icons/dashboard/x-close.svg";
import { ReactComponent as HelpCircle } from "../../../../..//assets/icons/dashboard/help-circle-dashboard.svg";
import DateDropdown from "../../../../../globalComponents/DateDropdown/DateDropdown"
import "./teacherLessonsAmount.css";
import TeacherLessonStatistics from "../TeacherLessonStatistics/TeacherLessonStatistics";
import TeacherSalary from "../TeacherSalary/TeacherSalary";
import DateRangeModal from "../../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import {
  getTeacherCancelledLessonsAction,
  getTeacherConfirmedLessonsAction,
  getTeacherUnviewedLessonsAction,
} from "../../../../../redux/actions/teachersActions";
import TeacherLeaderboard from "./TeacherLeaderboard";

const TeacherLessonsAmounts = () => {
  const dispatch = useDispatch();
  const {
    teacherConfirmedLessons,
    teacherCancelledLessons,
    teacherUnviewedLessons,
  } = useSelector((state) => state.teachersPagination);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdownCancelled, setOpenDropdownCancelled] = useState(false);
  const [openDropdownConfirmed, setOpenDropdownConfirmed] = useState(false);
  const applyConfirmedFilter = (startDate, endDate) => {
    dispatch(getTeacherConfirmedLessonsAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownCancelled(false);
    setOpenDropdownConfirmed(false);
  };
  const applyCancelledFilter = (startDate, endDate) => {
    dispatch(getTeacherCancelledLessonsAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownCancelled(false);
    setOpenDropdownConfirmed(false);
  };
  const applyFilter = (startDate, endDate) => {
    if (openDropdownConfirmed) {
      applyConfirmedFilter(startDate, endDate);
    } else if (openDropdownCancelled) {
      applyCancelledFilter(startDate, endDate);
    }
  };
  const applyMonthsConfirmedFilter = (option) => {
    dispatch(getTeacherConfirmedLessonsAction("", "", option.key));
  };
  const applyMonthsCancelledFilter = (option) => {
    dispatch(getTeacherCancelledLessonsAction("", "", option.key));
  };

  useEffect(() => {
    if (openDropdownCancelled) {
      setOpenDropdownConfirmed(false);
    }
  }, [openDropdownCancelled]);
  useEffect(() => {
    if (openDropdownConfirmed) {
      setOpenDropdownCancelled(false);
    }
  }, [openDropdownConfirmed]);

  useEffect(() => {
    dispatch(getTeacherConfirmedLessonsAction("", "", 1));
    dispatch(getTeacherCancelledLessonsAction("", "", 1));
    dispatch(getTeacherUnviewedLessonsAction("", "", 1));
  }, []);

  return (
    <>
      <section className="lessons-amount">
        <div className="content-box grid-item">
          <div className="left green">
            <CheckIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Təsdiqlənmiş dərslər</h2>
              <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownConfirmed}
                setOpenDropdown={setOpenDropdownConfirmed}
                applyMonthsFilter={applyMonthsConfirmedFilter}
              />
            </div>
            <p className="amount">
              {teacherConfirmedLessons ? teacherConfirmedLessons : 0}
            </p>
          </div>
        </div>

        <div className="content-box grid-item cancelled-lessons">
          <div className="left red">
            <Xicon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Ləvğ edilmiş dərslər</h2>
              <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownCancelled}
                setOpenDropdown={setOpenDropdownCancelled}
                applyMonthsFilter={applyMonthsCancelledFilter}
              />
            </div>
            <p className="amount">
              {teacherCancelledLessons ? teacherCancelledLessons : 0}
            </p>
          </div>
        </div>

        <div className="content-box grid-item">
          <div className="left grey">
            <HelpCircle />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Baxılmamış dərslər</h2>
            </div>
            <p className="amount">
              {teacherUnviewedLessons ? teacherUnviewedLessons : 0}
            </p>
          </div>
        </div>

        <div className="grid-item">
          <TeacherLeaderboard />

          <TeacherSalary />
        </div>

        <div className="grid-item last">
          <TeacherLessonStatistics />
        </div>
      </section>

      {openCalendar && (
        <DateRangeModal
          setOpenCalendar={setOpenCalendar}
          applyFilter={applyFilter}
        />
      )}
    </>
  );
};

export default TeacherLessonsAmounts;
