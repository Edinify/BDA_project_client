import React, { useState } from "react";
import { TextField } from "@mui/material";
import DropdownIcon from "../../../../components/DropdownIcon/DropdownIcon";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";

const PaymentType = ({ formik, data, addPaymentType }) => {
  const { paymentTypeList: dataList } = useCustomHook();
  const inputValue = dataList.find((item) => item.key === data.paymentType)?.name || "";
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    addPaymentType(item);
    setOpenDropdown(false)
  };

  return (
    <>
      <div className="class-input">
        <div className="dropdown-input">
          <div className="input-box">
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
                // marginBottom: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Ödəniş növü"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("paymentType", true)}
            />
           <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul
            className={`dropdown-body where-coming ${
              openDropdown ? "active" : ""
            }`}
          >
            {dataList.map((item) => (
              <li key={item.key} onClick={() => addData(item.key)}>
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.paymentType && formik.touched.paymentType && (
        <small className="validation-err-message">
          {formik.errors.paymentType}
        </small>
      )}
    </>
  );
};

export default PaymentType;
