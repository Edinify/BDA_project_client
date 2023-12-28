import React, { useState } from "react";
import { ReactComponent as MinusIcon } from "../../../../../../assets/icons/minus-cirlce.svg";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";
import { TextField } from "@mui/material";

const PaymentItem = ({ data, deleteData, addPayment }) => {
  const { paymentTypeList } = useCustomHook();
  const paymentType = paymentTypeList.find(
    (item) => item.key === data.paymentType
  ).name;
  return (
    <li>
      <div className="top">
        ödəniş növü: {paymentType}
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteData(data.paymentType)}
          />
        </div>
      </div>
      <div className="input-box">
        <TextField
          sx={{
            "& input": { fontSize: "12px" },
            marginTop: "16px",
          }}
          InputLabelProps={{
            style: { fontSize: "12px", color: "#3F3F3F" },
            shrink: data.payment ? true : false,
          }}
          fullWidth
          label="Ümumi ödəniş"
          autoComplete="off"
          type="number"
          value={data.payment ? data.payment : ""}
          onChange={(e) => addPayment(data.paymentType, e.target.value)}
        />
      </div>
    </li>
  );
};

export default PaymentItem;
