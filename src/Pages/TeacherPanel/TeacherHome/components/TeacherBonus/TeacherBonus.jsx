import React, { useState, useEffect } from "react";
import "./teacherBonus.css";
import { useDispatch, useSelector } from "react-redux";
import DateDropdown from "../../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import TeacherBonusData from "./TeacherBonusData/TeacherBonusData";
import TeacherFineData from "./TeacherFineData/TeacherFineData";
import { getTeacherFineAction } from '../../../../../redux/actions/fineActions';
import { getTeacherBonusAction } from "../../../../../redux/actions/bonusActions";

const TeacherBonus = () => {
  const dispatch = useDispatch()
  const {teacherBonus,teacherFine} = useSelector(state=>state.teacherBonus);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState("bonus");
  const [openDropdown, setOpenDropdown] = useState(false);
  const applyFilter = (startDate, endDate) => {
    dispatch(getTeacherBonusAction(startDate, endDate, ""))
    dispatch(getTeacherFineAction(startDate, endDate, ""))
    setOpenCalendar(false);
    setOpenDropdown(false)
  };
  const applyMonthsFilter = (option) => {
    dispatch(getTeacherBonusAction("","",option.key))
    dispatch(getTeacherFineAction("","",option.key))
  };

  useEffect(()=>{
    dispatch(getTeacherBonusAction("","",1))
    dispatch(getTeacherFineAction("","",1))
  },[])

  return (
    <>
      <div className="teacher-bonus">
        <div className="top">
          <div
            onClick={() => setActiveTab("bonus")}
            className={`tab ${activeTab === "bonus" && "active"}`}
          >
            Bonus
          </div>
          <div
            onClick={() => setActiveTab("fine")}
            className={`tab ${activeTab === "fine" && "active"}`}
          >
            Cərimə
            {teacherFine.length > 0 && <span className="circle"></span>} 
          </div>
        </div>

        <div className="bottom">
          <div className="head">
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

          {activeTab === "bonus" && <TeacherBonusData />}
          {activeTab === "fine" && <TeacherFineData />}
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

export default TeacherBonus;
