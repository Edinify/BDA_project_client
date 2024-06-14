import React, { useEffect, useState } from "react";
import "./paymentResult.css";
import DateRangeModal from "../../Modals/DateRangeModal/DateRangeModal";
import { useDispatch, useSelector } from "react-redux";
import PaymentDropdown from "../../PaymentDropdown/PaymentDropdown";
import { ReactComponent as PaymentIcon } from "../../../assets/icons/tuitionFee/payment-card.svg";
import {
  getLatedPayment,
  getPaidPayment,
  getWillPayPayment,
} from "../../../redux/actions/tuitionFeePaymentActions";

const PaymentResult = () => {
  const dispatch = useDispatch();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdownEntered, setOpenDropdownEntered] = useState(false);
  const [openDropdownLated, setOpenDropdownLated] = useState(false);
  const [openDropdownEnter, setOpenDropdownEnter] = useState(false);

  const { latedPayment, paidPayment, willPayPayment } = useSelector(
    (state) => state.tuitionFeePayment
  );

  useEffect(() => {
    dispatch(getLatedPayment("", "", "", true));
    dispatch(getPaidPayment("", "", "", true));
    dispatch(getWillPayPayment("", "", "", true));
  }, [dispatch]);

  const applyLatedFilter = (startDate, endDate) => {
    dispatch(getLatedPayment("", startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownEntered(false);
    setOpenDropdownLated(false);
    setOpenDropdownEnter(false);
  };
  const applyPaidFilter = (startDate, endDate) => {
    dispatch(getPaidPayment("", startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownEntered(false);
    setOpenDropdownLated(false);
    setOpenDropdownEnter(false);
  };

  const applyWillPayFilter = (startDate, endDate) => {
    dispatch(getWillPayPayment("", startDate, endDate, ""));
    setOpenCalendar(false);
    setOpenDropdownEntered(false);
    setOpenDropdownLated(false);
    setOpenDropdownEnter(false);
  };

  const applyMonthsLatedFilter = (option) => {
    dispatch(getLatedPayment(option.key, "", "", ""));
  };

  const applyMonthsPaidFilter = (option) => {
    dispatch(getPaidPayment(option.key, "", "", ""));
  };

  const applyMonthsWillPayFilter = (option) => {
    dispatch(getWillPayPayment(option.key, "", "", ""));
  };

  const applyFilter = (startDate, endDate) => {
    if (openDropdownLated) {
      applyLatedFilter(startDate, endDate);
    } else if (openDropdownEntered) {
      applyPaidFilter(startDate, endDate);
    } else if (openDropdownEnter) {
      applyWillPayFilter(startDate, endDate);
    }
  };

  return (
    <>
      <section className="payment-amount">
        <div className="content-box">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Gecikmədə olan</h2>

              {
                <PaymentDropdown
                  optionType="date"
                  calendar={true}
                  setOpenCalendar={setOpenCalendar}
                  openCalendar={openCalendar}
                  openDropdown={openDropdownLated}
                  setOpenDropdown={setOpenDropdownLated}
                  applyMonthsFilter={applyMonthsLatedFilter}
                  typeName="lated"
                />
              }
            </div>
            <p className="amount">{latedPayment ? latedPayment : 0}</p>
          </div>
        </div>

        <div className="content-box cancelled-lessons">
          <div className="left red">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Daxil olan</h2>
              <PaymentDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownEntered}
                setOpenDropdown={setOpenDropdownEntered}
                typeName="currentDay"
                applyMonthsFilter={applyMonthsPaidFilter}
              />
            </div>
            <p className="amount">{paidPayment ? paidPayment : 0}</p>
          </div>
        </div>

        <div className="content-box events">
          <div className="left green">
            <PaymentIcon />
          </div>

          <div className="right">
            <div className="top">
              <h2 className="title">Daxil olacaq</h2>

              <PaymentDropdown
                optionType={"date"}
                calendar={true}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                openDropdown={openDropdownEnter}
                setOpenDropdown={setOpenDropdownEnter}
                typeName="pay"
                applyMonthsFilter={applyMonthsWillPayFilter}
              />
            </div>
            <p className="amount">{willPayPayment ? willPayPayment : 0}</p>
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

export default PaymentResult;
