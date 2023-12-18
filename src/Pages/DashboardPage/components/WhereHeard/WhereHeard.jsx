import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateDropdown from "../../../../globalComponents/DateDropdown/DateDropdown"
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { getDashboardAdvertisingAction } from "../../../../redux/actions/dashboardAction";
import { useCustomHook } from "../../../../globalComponents/GlobalFunctions/globalFunctions";

const WhereHeard = ({ dashboardKeys }) => {
  const dispatch = useDispatch();
  const {whereComingList} = useCustomHook()
  const { advertising } = useSelector((state) => state.dashboardData);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDateDropdown, setOpenDateDropdown] = useState(false);

  const applyFilter = (startDate, endDate) => {
    dispatch(getDashboardAdvertisingAction(startDate, endDate, ''));
    setOpenCalendar(false);
    setOpenDateDropdown(false);
  };

  const applyMonthsFilter = (option) => {
    dispatch(getDashboardAdvertisingAction('', '', option.key));
  };


  return (
    <>
      <section className="where-heard">
        <div className="content-box">
          <div className="top">
            <h2 className="title">Bizi haradan eşidiblər?</h2>
            <DateDropdown
              optionType={"date"}
              calendar={true}
              setOpenCalendar={setOpenCalendar}
              openCalendar={openCalendar}
              openDropdown={openDateDropdown}
              setOpenDropdown={setOpenDateDropdown}
              applyMonthsFilter={applyMonthsFilter}
            />
          </div>

          <div className="bottom">
            {advertising?.length > 0 && advertising?.map((item, index) => (
              <div key={index} className="linear-con">
                <h5>{whereComingList.find((data) => data.key === item.name).name } | {item.value}%</h5>
                <div
                  style={{ width: `${item.value}%` }}
                  className="line"
                ></div>
              </div>
            ))}
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

export default WhereHeard;
