import React, { useEffect, useState } from "react";
import "./teacherFeedback.css";
import { useDispatch, useSelector } from "react-redux";
import DateDropdown from "../../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { ReactComponent as SearchIcon } from "../../../../../assets/icons/teacherHome/search-normal.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/icons/teacherHome/plus.svg";
import { FEEDBACK_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { getFeedbacskByTeacher } from "../../../../../redux/actions/feedbacksByTeacherAction";
import TeacherFeedbackCard from "./TeacherFeedbackCard";

const TeacherFeedback = () => {
  const dispatch = useDispatch();
  const { feedbacksByTeacherData } = useSelector((state) => state.feedbacksByTeacherData);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const applyFilter = (startDate, endDate) => {
    dispatch(getFeedbacskByTeacher(startDate, endDate, "", ""));
    setOpenCalendar(false);
    setOpenDropdown(false);
    setSearchValue("");
  };
  const applyMonthsFilter = (option) => {
    dispatch(getFeedbacskByTeacher("", "", "", option.key));
  };
  const openModal = () => {
    dispatch({
      type: FEEDBACK_MODAL_ACTION_TYPE.FEEDBACK_OPEN_MODAL,
      payload:true,
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getFeedbacskByTeacher("", "", searchValue, 1));
  };

  useEffect(() => {
    dispatch(getFeedbacskByTeacher("", "", "", 1));
  }, []);

  return (
    <>
      <div className="teacher-feedback">
        <div className="top">
          <h2 className="title">Rəylər</h2>
          <div className="left">
            <form onSubmit={(e) => searchData(e)}>
              <div className="input-box">
                <input
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue ? searchValue : ""}
                />
                <SearchIcon
                  onClick={(e) =>
                    dispatch(getFeedbacskByTeacher("", "", searchValue, 1))
                  }
                />
              </div>
            </form>

            <DateDropdown
              optionType={"date"}
              calendar={true}
              setOpenCalendar={setOpenCalendar}
              openCalendar={openCalendar}
              applyMonthsFilter={applyMonthsFilter}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />

            <div onClick={() => openModal()}>
              <PlusIcon />
            </div>
          </div>
        </div>

        <div className="feedback-data">
          {feedbacksByTeacherData?.map((data, index) => (
            <TeacherFeedbackCard
              key={index}
              data={data}
            />
          ))}
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

export default TeacherFeedback;
