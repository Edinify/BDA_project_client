import React, { useState } from "react";
import { TextField } from "@mui/material";
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

  return (
    <li>
      <div className="top">
        dərs günü: {data.day}
        <div className="minus-icon-con">
          <MinusIcon className="minus-icon" onClick={() => deleteItem(index)} />
        </div>
      </div>
      <div className="input-box">
        <TextField
          sx={{
            "& input": { fontSize: "12px"},
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
