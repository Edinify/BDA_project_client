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

  console.log(tuitionFeeSearchValues, "tuitionFeeSearchValues");
  console.log(paidData);

  const updateTuitionPayments = () => {
    dispatch(
      updateTuitionFeeAction(
        tuitionFeeModalData,
        lastPage,
        tuitionFeeSearchValues
      )
    );
  };

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

    const currPayment =
      calcedPayments.find(
        (item) => new Date(item.paymentDate).getMonth() === currDate.getMonth()
      )?.rest || 0;

    console.log(currPayment, "curretn payment");

    setCurrentPayment(currPayment);

    setPayments(calcedPayments);

    setPaidAmount(totalConfirmedPayment);
  }, [tuitionFeeModalData.paids]);

  console.log(payments, "ssssssssssssssssssssss");
  return (
    <div style={{ marginTop: "30px" }}>
      <div>
        <div style={{ display: "flex" }}>
          <h2>Yekun məbləğ:</h2>
          <h2>{tuitionFeeModalData?.totalAmount} AZN</h2>
        </div>
        <div style={{ display: "flex" }}>
          <h2>Ödənilən məbləğ:</h2>
          <h2>
            {paidAmount}
            AZN
          </h2>
        </div>
        <div style={{ display: "flex" }}>
          <h2>Qalıq: </h2>
          <h2>{tuitionFeeModalData?.totalAmount - paidAmount} AZN</h2>
        </div>
        <div style={{ display: "flex" }}>
          <h2>Cari ödəniş: </h2>
          <h2>{currentPayment} AZN</h2>
        </div>
      </div>
      <h2 style={{ marginTop: "20px" }}>Ödəniş cədvəli:</h2>
      {payments?.map((item) => {
        return (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              borderBottom: "1px solid gray",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h2>
                {item?.paymentDate
                  ? moment(item.paymentDate).locale("az").format("DD.MM.YYYY")
                  : ""}
              </h2>

              <h2>{item.paid ? "ödənildi" : "ödənilməyib"}</h2>
              <h2>{(item.rest > item.payment && item.payment) || item.rest}</h2>

              <h2>{item.payment} AZN</h2>
            </div>
            {/* <div style={{ display: "flex" }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="wait"
                  control={<Radio checked={item?.status === "wait"} />}
                  label="Ödənilməyib"
                  disabled
                />
                <FormControlLabel
                  value="paid"
                  control={<Radio checked={item?.status === "paid"} />}
                  label="Ödənildi"
                  disabled
                />
              </RadioGroup>
            </div> */}
          </div>
        );
      })}

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
          <button className="confirm" onClick={updateTuitionPayments}>
            Yenilə
          </button>
        </div>
      </div>
    </div>
  );
};

export default TuitionFeeConfirmModal;
