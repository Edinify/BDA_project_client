import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";

const Status = ({ formik, modalData, updateModalState }) => {
  const { constStatusList: dataList } = useCustomHook();
  const inputValue = dataList.find((item) => item.key === modalData.status)?.name || ""
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("status", item)
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
              label="Status"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("status", true)}
            />
            <div
              className="dropdown-icon"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <svg
                className={!openDropdown ? "down" : "up"}
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07999 9.4502"
                  stroke="#5D5D5D"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
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
      {formik.errors.status && formik.touched.status && (
        <small className="validation-err-message">
          {formik.errors.status}
        </small>
      )}
    </>
  );
};

export default Status;