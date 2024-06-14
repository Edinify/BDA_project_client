import React, { useState, useEffect } from "react";
import { ReactComponent as DropdownArrowIcon } from "../../assets/icons/dashboard/arrow-down.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/dashboard/calendar.svg";
import { useDispatch } from "react-redux";
import {
  getLatedPayment,
  getPaidPayment,
  getWillPayPayment,
} from "../../redux/actions/tuitionFeePaymentActions";

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
  const [selectedOption, setSelectedOption] = useState(() => {
    switch (typeName) {
      case "lated":
        return { key: "lated", name: "Hamısı" };
      case "pay":
        return { key: "pay", name: "Hamısı" };
      case "currentDay":
        return { key: "currentDay", name: "Cari gün" };
      default:
        return { key: 1, name: "Cari ay" };
    }
  });
  
  const [selected, setSelected] = useState(selectedOption);

  const optionList = {
    date: {
      title: monthCount === 3 ? "Son 3 ay" : "Cari ay",
      data: [
        monthCount !== 3 && { key: 1, name: "Cari ay" },
        { key: 3, name: "Son 3 ay" },
        { key: 6, name: "Son 6 ay" },
        { key: 12, name: "İllik" },
        { key: "", name: "Tarix seç" },
      ].filter(Boolean),
    },
  };

  const selectOption = (option) => {
    if (option.name === "Tarix seç") {
      setOpenCalendar(!openCalendar);
      setSelectedOption(option);
    } else if (option.name === "Cari gün") {
      setSelectedOption({ key: "currentDay", name: "Cari gün" });
      setSelected({ key: "currentDay", name: "Cari gün" });
      setOpenDropdown(false);
      dispatch(getPaidPayment("", "", "", true));
    } else if (option.name === "Hamısı") {
      if (typeName === "lated") {
        setSelectedOption({ key: "lated", name: "Hamısı" });
        setSelected({ key: "lated", name: "Hamısı" });
        setOpenDropdown(false);
        dispatch(getLatedPayment("", "", "", true));
      } else if (typeName === "pay") {
        setSelectedOption({ key: "pay", name: "Hamısı" });
        setSelected({ key: "pay", name: "Hamısı" });
        setOpenDropdown(false);
        dispatch(getWillPayPayment("", "", "", true));
      }
    } else {
      setSelectedOption(option);
      setSelected(option);
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
          <p className="calendar-selected-name">{selected.name}</p>
          <CalendarIcon />
        </div>
      ) : (
        <div onClick={() => changeOpenDropdown()} className="dropdown-head">
          <p>
            {selectedOption.name}
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
           {typeName === "pay" && (
            <li
              className={selectedOption.key === "pay" ? "active" : ""}
              onClick={() => selectOption({ key: "pay", name: "Hamısı" })}
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
