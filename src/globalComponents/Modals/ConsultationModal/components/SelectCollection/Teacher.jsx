import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTeachersAction } from "../../../../../redux/actions/teachersActions";

const Teacher = ({ formik, modalData, updateModalState }) => {
  const dispatch = useDispatch();
  const { teachers: dataList } = useSelector((state) => state.teachersPagination);
  const inputValue = modalData?.teacher?.fullName || ""
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("teacher", item)
    setOpenDropdown(false)
  };

  useEffect(() => {
    dispatch(getActiveTeachersAction());
  }, []);
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
              label="Müəllim"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("teacher", true)}
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
              <li key={item._id} onClick={() => addData(item)}>
                <h4>{item.fullName}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.teacher && formik.touched.teacher && (
        <small className="validation-err-message">
          {formik.errors.teacher}
        </small>
      )}
    </>
  );
};

export default Teacher;
