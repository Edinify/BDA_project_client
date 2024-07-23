import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";

const LessonStatus = ({ data }) => {

  const dispatch = useDispatch();

  const confirmedStatusList = [
    { status: "unviewed", label: "Gözləmədə" },
    { status: "confirmed", label: "Keçirilib" },
    { status: "cancelled", label: "Ləğv edilib" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("");
  const { lessonTableModalData: modalData } = useSelector(
    (state) => state.lessonTableModal
  );

 
  return (
    <form
      className="lesson-page-status"
      //   style={
      //     data.status === "unviewed"
      //       ? { backgroundColor: "#d2c3fe" }
      //       : data.status === "confirmed"
      //       ? { backgroundColor: "#d4ffbf" }
      //       : { backgroundColor: "#ffced1" }
      //   }
    >
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
        //   backgroundColor: 
        //   data.status === "unviewed" ? "#d2c3fe" : 
        //   data.status === "confirmed" ? "#d4ffbf" : 
        //   "#ffced1"
        }}
      >
        {confirmedStatusList?.map((item, i) => (
          <FormControlLabel
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginRight: 0,
            }}
            key={i}
            value={item.status}
            control={<Radio checked={selectedStatus === item.status} />}
            label={item.label}
            onClick={() =>{
                 setSelectedStatus(item.status)}}
          />
        ))}
      </RadioGroup>
    </form>
  );
};

export default LessonStatus;
