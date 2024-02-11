import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/dashboard/check.svg";
import { ReactComponent as Xicon } from "../../../../assets/icons/dashboard/x-close.svg";
import { ReactComponent as HelpCircle } from "../../../../assets/icons/dashboard/help-circle-dashboard.svg";
import { ReactComponent as DotsIcon } from "../../../../assets/icons/dashboard/dots-horizontal-dashboard.svg";
import {
  getActiveStudentsCountAction,
  getAllEventsAction,
  getAllStudentsCountAction,
} from "../../../../redux/actions/dashboardAction";
import DateDropdown from "../../../../globalComponents/DateDropdown/DateDropdown";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";

const LessonsAmount = () => {
  const dispatch = useDispatch();
  const {
    confirmedLessonsData,
    cancelledLessonsData,
    unviewedLessonsData,
    eventsData,
  } = useSelector((state) => state.dashboardData);
  const [openUnviewedLessons, setUnviewedLessons] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdownCancelled, setOpenDropdownCancelled] = useState(false);
  const [openDropdownConfirmed, setOpenDropdownConfirmed] = useState(false);

  const applyConfirmedFilter = (startDate, endDate) => {
    dispatch(getAllEventsAction(startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownCancelled(false);
    setOpenDropdownConfirmed(false);
  };
  const applyCancelledFilter = (startDate, endDate) => {
    dispatch(getActiveStudentsCountAction(startDate, endDate, ""));
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
    dispatch(getAllEventsAction("", "", option.key));
  };
  const applyMonthsCancelledFilter = (option) => {
    dispatch(getActiveStudentsCountAction("", "", option.key));
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
    if (openUnviewedLessons) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openUnviewedLessons]);

  return (
    <>
      <section className="lessons-amount">
        <div className="content-box">
          <div className="left green">
            <CheckIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Tələbələr</h2>

              {/* { <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownConfirmed}
                setOpenDropdown={setOpenDropdownConfirmed}
                applyMonthsFilter={applyMonthsConfirmedFilter}
              />} */}
            </div>
            <p className="amount">
              {confirmedLessonsData ? confirmedLessonsData : 0}
            </p>
          </div>
        </div>

        <div className="content-box cancelled-lessons">
          <div className="left red">
            <Xicon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Aktiv tələbələr</h2>
              {/* <DateDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownCancelled}
                setOpenDropdown={setOpenDropdownCancelled}
                applyMonthsFilter={applyMonthsCancelledFilter}
              /> */}
            </div>
            <p className="amount">
              {cancelledLessonsData ? cancelledLessonsData : 0}
            </p>
          </div>
        </div>

        <div className="content-box">
          <div className="left grey">
            <HelpCircle />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Qruplar</h2>
            </div>
            <p className="amount">
              {unviewedLessonsData ? unviewedLessonsData : 0}
            </p>
          </div>
        </div>
        <div className="content-box">
          <div className="left green">
            <CheckIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Tədbirlər</h2>

              {
                <DateDropdown
                  optionType={"date"}
                  calendar={true}
                  setOpenCalendar={setOpenCalendar}
                  openCalendar={openCalendar}
                  openDropdown={openDropdownConfirmed}
                  setOpenDropdown={setOpenDropdownConfirmed}
                  applyMonthsFilter={applyMonthsConfirmedFilter}
                />
              }
            </div>
            <p className="amount">{eventsData ? eventsData : 0}</p>
          </div>
        </div>
      </section>

      {openCalendar && (
        <DateRangeModal
          applyFilter={applyFilter}
          setOpenCalendar={setOpenCalendar}
        />
      )}
    </>
  );
};

export default LessonsAmount;
