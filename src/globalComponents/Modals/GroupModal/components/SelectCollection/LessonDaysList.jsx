import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";

const LessonDaysList = ({ updateModalState, modalData }) => {
  const dispatch = useDispatch();
  const dataList = ["1-4", "2-5", "3-6", "1-3-5", "2-4-6", "6"];
  const [openDropdown, setOpenDroddown] = useState(false);
  const inputValue = modalData?.lessonDay || "";
  const selectItem = (item) => {
    updateModalState("lessonDay", item);
    setOpenDroddown(false);
  };

  return (
    <>
      <div className={`class-input`}>
        <div className="class-field search">
          <TextField 
            sx={{
              "& input": {
                fontSize: "12px",
                marginRight: "32px",
              },
              marginTop: "20px",
            }}
            InputLabelProps={{
              style: { fontSize: "12px", color: "#3F3F3F" },
            }}
            fullWidth
            label="Dərs günü"
            autoComplete="off"
            disabled={true}
            value={inputValue}
          />
          <div
            className="dropdown-icon"
            onClick={() => setOpenDroddown(!openDropdown)}
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
          className={`create-update-modal-dropdown where-coming feedback ${
            openDropdown ? "active" : ""
          }`}
        >
          {dataList?.map((item, i) => (
            <li key={i} onClick={() => selectItem(item)}>
              <h4>{item}</h4>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LessonDaysList;
