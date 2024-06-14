import React, { useState, useEffect } from "react";
import { ReactComponent as DropdownArrowIcon } from "../../assets/icons/dashboard/arrow-down.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/dashboard/calendar.svg";
import {
  getLatedPayment,
  getPaidPayment,
} from "../../redux/actions/tuitionFeePaymentActions";
import { useDispatch } from "react-redux";

const PaymentDropdown = ({
  optionType,
  calendar,
  setOpenCalendar,
  openCalendar,
  applyMonthsFilter = () => {},
  openDropdown,
  setOpenDropdown,
  monthCount = "",
  typeName,
}) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(
    optionType === "date"
      ? monthCount === 3
        ? { key: 3, name: "Son 3 ay" }
        : { key: 1, name: "Cari ay" }
      : { key: "lessonCount", name: "Dərslər" }
  );
  const [selected, setSelected] = useState(null);

  const optionList = {
    date: {
      title: monthCount === 3 ? "Son 3 ay" : "Cari ay",
      data: [
        monthCount !== 3 && { key: 1, name: "Cari ay" },
        { key: 3, name: "Son 3 ay" },
        { key: 6, name: "Son 6 ay" },
        { key: 12, name: "İllik" },
        { key: "", name: "Tarix seç" },
      ],
    },
  };

  console.log(selected,"selected")

  const selectOption = (option) => {
    if (option.name === "Tarix seç") {
      setOpenCalendar(!openCalendar);
      setSelectedOption(option);
    } else if (option.name === "Cari gün") {
      setSelectedOption({ key: "currentDay", name: "Cari gün" });
      setSelected({name:"Cari gün"});
      setOpenDropdown(false);
      dispatch(getPaidPayment("", "", "", true));
    } else if (option.name === "Hamısı") {
      setSelectedOption({ key: "lated", name: "Hamısı" });
      setSelected({name:"Hamısı"});
      setOpenDropdown(false);
      dispatch(getLatedPayment("", "", "", true));
    } else {
      setSelectedOption(option);
      setOpenDropdown(false);
      applyMonthsFilter(option);
    }
  };

  const changeOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
    setOpenCalendar(false);
  };

  const closeDropdown = () => {
    setOpenCalendar(false);
    setOpenDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div
      className={`date-filter-dropdown ${calendar ? "calendar-dropdown" : ""}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {calendar ? (
        <div
          className={`calendar ${openDropdown ? "active" : ""}`}
          onClick={() => changeOpenDropdown()}
        >
          <p className="calendar-selected-name">{selected?.name}</p>
          <CalendarIcon />
        </div>
      ) : (
        <div onClick={() => changeOpenDropdown()} className="dropdown-head">
          <p>
            {selectedOption
              ? selectedOption.name
              : optionList[optionType].title}
          </p>
          <div className={`dropdown-icon ${openDropdown ? "up" : "down"}`}>
            <DropdownArrowIcon />
          </div>
        </div>
      )}

      <div className={`dropdown-body ${openDropdown ? "active" : ""}`}>
        <ul>
          {typeName === "currentDay" && (
            <li
              className={selectedOption.key === "currentDay" ? "active" : ""}
              onClick={() =>
                selectOption({ key: "currentDay", name: "Cari gün" })
              }
            >
              Cari gün
            </li>
          )}
          {typeName === "lated" && (
            <li
              className={selectedOption.key === "lated" ? "active" : ""}
              onClick={() => selectOption({ key: "lated", name: "Hamısı" })}
            >
              Hamısı
            </li>
          )}
          {optionList[optionType].data.map((option, index) => (
            <li
              className={selectedOption.key === option.key ? "active" : ""}
              key={index}
              onClick={() => {
                setSelected(option);
                selectOption(option);
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentDropdown;
