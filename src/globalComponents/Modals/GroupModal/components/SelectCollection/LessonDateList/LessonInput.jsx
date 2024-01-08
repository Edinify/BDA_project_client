import React, { useState } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { ReactComponent as MinusIcon } from "../../../../../../assets/icons/minus-cirlce.svg";
import { ReactComponent as CheckIcon } from "../../../../../../assets/icons/Checkbox.svg";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";

const LessonInput = ({
  data,
  index,
  deleteItem,
  modalData,
  updateModalState,
}) => {
  const addTime = (selectedTime) => {
    const lessonDateData = [...modalData.lessonDate];
    lessonDateData[index] = { ...lessonDateData[index], time: selectedTime };
    updateModalState("lessonDate", lessonDateData);
  };

  const updateLessonType = () => {
    const lessonDateData = [...modalData.lessonDate];
    lessonDateData[index] = {
      ...lessonDateData[index],
      practical: !data.practical,
    };
    updateModalState("lessonDate", lessonDateData);
  };

  console.log(data);
  console.log(modalData, "modal dataaaaaaaaa");

  return (
    <li>
      <div className="top">
        <span style={{ fontWeight: "bold" }}> dərs günü: {data.day}</span>
        <div className="minus-icon-con">
          <MinusIcon className="minus-icon" onClick={() => deleteItem(index)} />
        </div>
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox checked={data.practical || false} />}
          onChange={updateLessonType}
          label="Praktiki Dərs"
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 28 },
            "& .MuiFormControlLabel-label": {
              fontSize: "12px",
              fontWeight: 500,
            },
          }}
        />
      </div>
      <div className="input-box">
        <TextField
          sx={{
            "& input": { fontSize: "12px" },
            marginTop: "16px",
          }}
          InputLabelProps={{
            style: { fontSize: "12px", color: "#3F3F3F" },
            shrink: true,
          }}
          fullWidth
          label="Dərs saatı"
          autoComplete="off"
          type="time"
          value={data.time ? data.time : ""}
          onChange={(e) => addTime(e.target.value)}
        />
      </div>
    </li>
  );
};

export default LessonInput;
