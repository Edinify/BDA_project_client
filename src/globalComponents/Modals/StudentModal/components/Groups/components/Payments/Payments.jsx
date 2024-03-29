import React from "react";
import Payment from "./Payment";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const Payments = ({ formik, setInputValue, data, addPayments, index }) => {
  // console.log(data, "data in paymentsss");
  return (
    <div style={{ borderTop: "1px solid gray", padding: "20px 0" }}>
      {/* <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        }}
      >
        <FormControlLabel
          value="wait"
          control={<Radio checked={data?.status === "wait"} />}
          label="Ödənilməyib"
          disabled
        />
        <FormControlLabel
          value="paid"
          control={<Radio checked={data?.status === "paid"} />}
          label="Ödənildi"
          disabled
        />
      </RadioGroup> */}

      <div className="input-couples">
        <Payment
          inputName={"payment"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addPayments={addPayments}
          index={index}
        />
        <Payment
          inputName={"paymentDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addPayments={addPayments}
          index={index}
        />
      </div>
      <hr />
    </div>
  );
};

export default Payments;
