// import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import { ReactComponent as MinusIcon } from "../../../../../assets/icons/minus-cirlce.svg";
import "./paids.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";

function Paids({ tuitionFeeModalData }) {
  const dispatch = useDispatch();

  const togglePaymentStatus = (index) => {
    const newPayments = tuitionFeeModalData.paids.map((item, i) =>
      i == index ? { ...item, confirmed: !item?.confirmed } : item
    );

    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: { ...tuitionFeeModalData, paids: newPayments },
        openModal: false,
        openConfirmModal: "openConfirmModal",
      },
    });
  };

  const deletePayment = (index) => {
    const newPayments = tuitionFeeModalData.paids.filter(
      (item, i) => i != index
    );

    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: { ...tuitionFeeModalData, paids: newPayments },
        openModal: false,
        openConfirmModal: "openConfirmModal",
      },
    });
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "40px" }}>
      {tuitionFeeModalData?.paids?.map((item, i) => (
        <Card
          key={i}
          sx={{
            boxShadow: "none",
            borderBottom: "0.1px solid ",
            borderRadius: 0,
            marginBottom: "20px",
          }}
          className="paids-container"
        >
          <Checkbox
            color="primary"
            onChange={() => togglePaymentStatus(i)}
            checked={item?.confirmed}
            sx={{
              ".MuiCheckbox-sizeMedium": {
                fontSize: "0px",
              },
            }}
            size="large"
          />
          {/* <div className="paids-content"> */}
          <Typography>
            {item?.paymentDate
              ? moment(item.paymentDate).format("DD.MM.YYYY")
              : ""}
          </Typography>
          <Typography>{item.payment} AZN</Typography>
          {/* </div> */}
          {
            <div
              className="minus-icon-con"
              style={item?.confirmed ? { visibility: "hidden" } : {}}
              onClick={() => deletePayment(i)}
            >
              <MinusIcon className="minus-icon" />
            </div>
          }
        </Card>
      ))}
    </Box>
  );
}

export default Paids;
