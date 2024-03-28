import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";

import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/az";
import { useDispatch, useSelector } from "react-redux";
import { updateTuitionFeeAction } from "../../../../redux/actions/tuitionFeeActions";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";
import Paids from "./components/Paids";

const TuitionFeeConfirmModal = () => {
  const { tuitionFeeModalData } = useSelector((state) => state.tuitionFeeModal);
  const { lastPage } = useSelector((state) => state.tuitionFeePagination);
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const dispatch = useDispatch();
  const [paidData, setPaidData] = useState({
    payment: "",
    paymentDate: "",
  });
  const [currentPayment, setCurrentPayment] = useState(0);
  const [payments, setPayments] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);

  // // console.log(tuitionFeeSearchValues, "tuitionFeeSearchValues");
  // // console.log(paidData);

  const updateTuitionPayments = () => {
    dispatch(
      updateTuitionFeeAction(
        tuitionFeeModalData,
        lastPage,
        tuitionFeeSearchValues
      )
    );
  };

  const confirmHead = [
    { id: 1, name: "Tarix" },
    { id: 2, name: "Status" },
    { id: 3, name: "Qalıq" },
    { id: 4, name: "Məbləğ" },
  ];

  const togglePaymentStatus = (data) => {
    const newPayments = tuitionFeeModalData.payments.map((item) =>
      item._id == data._id ? data : item
    );

    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: { ...tuitionFeeModalData, payments: newPayments },
        openModal: false,
        openConfirmModal: "openConfirmModal",
      },
    });
  };

  const addPayment = () => {
    const checkPaids = Array.isArray(tuitionFeeModalData.paids);
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: {
          ...tuitionFeeModalData,
          paids: checkPaids
            ? [...tuitionFeeModalData.paids, paidData]
            : [paidData],
        },
        openModal: false,
        openConfirmModal: "openConfirmModal",
      },
    });

    setPaidData({
      payment: "",
      paymentDate: "",
    });
  };

  useEffect(() => {
    const totalConfirmedPayment = tuitionFeeModalData?.paids?.reduce(
      (value, item) => value + parseFloat(item?.confirmed ? item.payment : 0),
      0
    );
    const currDate = new Date();
    currDate.setHours(23, 59, 59, 999);

    // // console.log(currDate, "mmmmmmmmmmmmmmm");
    const calcedPayments = tuitionFeeModalData?.payments.map(
      (item, index, array) => {
        const totalPayment = array
          .filter((item, i) => i <= index)
          .reduce((total, item) => total + item.payment, 0);

        if (totalConfirmedPayment - totalPayment >= 0) {
          return { ...item, paid: true, rest: 0 };
        } else {
          return {
            ...item,
            paid: false,
            rest: totalPayment - totalConfirmedPayment,
          };
        }
      }
    );

    const beforePayments = calcedPayments.filter((item) => {
      const date = (item?.paymentDate && new Date(item.paymentDate)) || null;
      // // console.log(date);
      return (
        date?.getFullYear() < currDate?.getFullYear() ||
        (date?.getFullYear() === currDate?.getFullYear() &&
          date?.getMonth() <= currDate?.getMonth())
      );
    });

    // // console.log(beforePayments, "before payments");

    const totalBeforePayment = beforePayments.reduce(
      (total, item) => total + item.payment,
      0
    );

    const currPayment = totalBeforePayment - totalConfirmedPayment;

    setCurrentPayment(currPayment > 0 ? currPayment : 0);

    setPayments(calcedPayments);

    setPaidAmount(totalConfirmedPayment);
  }, [tuitionFeeModalData.paids]);

  const confirmInformationData = [
    {
      id: 1,
      title: "Yekun məbləğ:",
      value: `${tuitionFeeModalData?.totalAmount}AZN`,
    },
    { id: 2, title: "Ödənilən məbləğ:", value: `${paidAmount}AZN` },
    {
      id: 3,
      title: "Qalıq:",
      value: `${tuitionFeeModalData?.totalAmount - paidAmount}AZN`,
    },
    { id: 4, title: "Cari ödəniş:", value: `${currentPayment}AZN` },
  ];

  // // console.log(payments, "ssssssssssssssssssssss");
  return (
    <div style={{ marginTop: "30px" }}>
      {confirmInformationData?.map((data) => (
        <div className="confirm-information-container" key={data.id}>
          <h2>{data.title}</h2>
          <h2>{data.value}</h2>
        </div>
      ))}

      <h2 style={{ marginTop: "20px" }}>Ödəniş cədvəli:</h2>
      {payments.length ? (
        <table className="confirm-table">
          <thead>
            <tr>
              {confirmHead.map((item) => (
                <th key={item.id}>{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ width: "100%" }}>
            {payments?.map((item) => (
              <tr
                className={`payment-container ${
                  item.paid ? "payment-green" : "payment-red"
                }`}
                key={item._id}
              >
                <td>
                  <h2>
                    {item?.paymentDate
                      ? moment(item.paymentDate)
                          .locale("az")
                          .format("DD.MM.YYYY")
                      : ""}
                  </h2>
                </td>
                <td>
                  <h2>{item.paid ? "ödənildi" : "ödənilməyib"}</h2>
                </td>
                <td>
                  <h2>
                    {(item.rest > item.payment && item.payment) || item.rest}
                  </h2>
                </td>
                <td>
                  <h2>{item.payment} AZN</h2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <div style={{ marginTop: "40px" }} className="tution-fee-confirm-modal">
        <h2 style={{ marginBottom: "40px" }}>Ödənişlər:</h2>
        <Paids tuitionFeeModalData={tuitionFeeModalData} />
        <div>
          <Box>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr",
                columnGap: "10px",
              }}
            >
              <TextField
                sx={{
                  "& input": {
                    fontSize: "12px",
                  },
                  marginTop: "0",
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontSize: "12px",
                    color: "#3F3F3F",
                    marginBottom: "10px",
                  },
                }}
                fullWidth
                id={"payment"}
                name={"payment"}
                type="number"
                label="ödəniş"
                value={paidData.payment}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  setPaidData({ ...paidData, payment: e.target.value });
                }}
                // onFocus={() => setShrink(true)}
              />
              <TextField
                sx={{
                  "& input": {
                    fontSize: "12px",
                  },
                  marginTop: "0",
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontSize: "12px",
                    color: "#3F3F3F",
                    marginBottom: "10px",
                  },
                }}
                fullWidth
                id={"paymentDate"}
                name={"paymentDate"}
                type="date"
                label="tarix"
                value={paidData.paymentDate}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  setPaidData({ ...paidData, paymentDate: e.target.value });
                }}
                // onFocus={() => setShrink(true)}
              />
              <div className="right">
                <button
                  disabled={!paidData.payment || !paidData.paymentDate}
                  onClick={addPayment}
                  className="add-class"
                >
                  <AiOutlinePlusCircle />
                </button>
              </div>
            </div>
          </Box>
        </div>
        <div className="confirm-btns">
          <span></span>
          <button
            disabled={paidData.payment || paidData.paymentDate}
            className={`confirm ${
              paidData.payment || paidData.paymentDate ? "disabled" : ""
            } `}
            onClick={updateTuitionPayments}
          >
            Yenilə
          </button>
        </div>
      </div>
    </div>
  );
};

export default TuitionFeeConfirmModal;
