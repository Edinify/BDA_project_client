import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DropdownName } from "../../../../../globalComponents/DropdownName/DropdownName";
import { LessonStatusList } from "../../../../../globalComponents/LessonStatusList/LessonStatusList";
import { DatePick } from "../../../../../globalComponents/DatePicker/DatePicker";
import DatePickerModal from "../../../../../globalComponents/Modals/DatePickerModal/DatePickerModal";
import DatePickBtn from "../../../../../globalComponents/DatePickBtn/DatePickBtn";
import ApplyClearBtns from "./components/ApplyClearBtns";

const FilterList = ({
  clearAll,
  getFilteredLessons,
}) => {
  const [datePickModal, setDatePickModal] = useState(false);
  const { dropdownNameError } = useSelector((state) => state.dropdownNameError);

  return (
    <div className="dropdown-container">
      <div className="container">
        <div className="dropdown-container-con">
          {dropdownNameError && (
            <small className="err-message-mobile">
              Zəhmət olmasa ilk öncə ad seçin.
            </small>
          )}
          <div className="left">
            <DropdownName />
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

export default FilterList;
