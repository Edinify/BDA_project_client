import React, { useEffect, useState } from "react";
import './components/studentFilterList.css'
import { LessonStatusList } from "../../../../globalComponents/LessonStatusList/LessonStatusList";
import { DatePick } from "../../../../globalComponents/DatePicker/DatePicker";
import DatePickBtn from "../../../../globalComponents/DatePickBtn/DatePickBtn";
import ApplyClearBtns from "./components/ApplyClearBtns";
import DatePickerModal from "../../../../globalComponents/Modals/DatePickerModal/DatePickerModal"

const StudentFilterList = ({ clearAll, getFilteredLessons }) => {
  const [datePickModal, setDatePickModal] = useState(false);

  return (
    <div className="dropdown-container">
      <div className="container">
        <div className="dropdown-container-con">
          <div className="left">
            <LessonStatusList />
          </div>
          <div className="right">
            <DatePick />
            <ApplyClearBtns
              clearAll={clearAll}
              getFilteredLessons={getFilteredLessons}
            />
            <DatePickBtn setDatePickModal={setDatePickModal} />
          </div>
        </div>
      </div>

      {datePickModal && (
        <DatePickerModal
          applyFilter={getFilteredLessons}
          setDatePickModal={setDatePickModal}
          clearAll={clearAll}
        />
      )}
    </div>
  );
};

export default StudentFilterList;
