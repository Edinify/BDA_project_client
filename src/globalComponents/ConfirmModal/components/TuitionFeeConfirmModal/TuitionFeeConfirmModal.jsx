import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import moment from "moment";
import "moment/locale/az";
import { useDispatch, useSelector } from "react-redux";
import { updateTuitionFeeAction } from "../../../../redux/actions/tuitionFeeActions";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";

const TuitionFeeConfirmModal = () => {
  const { tuitionFeeModalData } = useSelector((state) => state.tuitionFeeModal);
  const { lastPage } = useSelector((state) => state.tuitionFeePagination);
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const dispatch = useDispatch();

  console.log(tuitionFeeSearchValues, "tuitionFeeSearchValues");

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

  return (
    <div style={{ marginTop: "30px" }}>
      {tuitionFeeModalData?.payments?.map((item) => {
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
            <div>
              <h2>
                {item?.paymentDate
                  ? moment(item.paymentDate).locale("az").format("DD.MM.YYYY")
                  : ""}
              </h2>

              <h2>{item.payment} AZN</h2>
            </div>
            <div style={{ display: "flex" }}>
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
                  // labelPlacement="bottom"
                />
                <FormControlLabel
                  value="paid"
                  control={<Radio checked={item?.status === "paid"} />}
                  label="Ödənildi"
                  disabled
                />
              </RadioGroup>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="confirm"
                  control={<Radio checked={item?.status === "confirm"} />}
                  label="Təstiqləndi"
                  disabled={item?.status === "wait"}
                  onClick={() => {
                    togglePaymentStatus({ ...item, status: "confirm" });
                  }}
                />
                <FormControlLabel
                  value="cancel"
                  control={<Radio checked={item?.status === "cancel"} />}
                  label="Ləğv edildi"
                  disabled={item?.status === "wait"}
                  onClick={() => {
                    togglePaymentStatus({ ...item, status: "cancel" });
                  }}
                />
              </RadioGroup>
            </div>
          </div>
        );
      })}

      <div className="confirm-btns">
        <span></span>
        <button className="confirm" onClick={updateTuitionPayments}>
          Yenilə
        </button>
      </div>
    </div>
  );
};

export default TuitionFeeConfirmModal;
