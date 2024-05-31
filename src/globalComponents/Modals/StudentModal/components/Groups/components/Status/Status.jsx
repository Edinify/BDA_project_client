import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

export default function Status({ data, setInputValue, formik, addGroupData }) {
  const changeSector = (value) => {
    addGroupData("status", value);
    setInputValue("status", value);
  };

<<<<<<< HEAD
  // // console.log(data.status, "data in status component");
=======
  console.log(data, "data in status component");
>>>>>>> 8dc53d552426155c8db801468c7369092d6b664a
  return (
    <div style={{ marginTop: "16px" }}>
      <label className="radio-sector-title"></label>
      <div className="radio-sector-con department">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 20,
            },
            "& .MuiFormControlLabel-label": {
              fontSize: 12,
            },
          }}
        >
          <FormControlLabel
            value="continue"
            control={<Radio checked={data?.status === "continue"} />}
            label="Davam edir"
            onClick={() => {
              changeSector("continue");
            }}
          />
          <FormControlLabel
            value="graduate"
            control={<Radio checked={data?.status === "graduate"} />}
            label="Məzun"
            onClick={() => {
              changeSector("graduate");
            }}
          />
          <FormControlLabel
            value="freeze"
            control={<Radio checked={data?.status === "freeze"} />}
            label="Dondurdu"
            onClick={() => {
              changeSector("freeze");
            }}
          />
          <FormControlLabel
            value="stopped"
            control={<Radio checked={data?.status === "stopped"} />}
            label="Dayandırdı"
            onClick={() => {
              changeSector("stopped");
            }}
          />
        </RadioGroup>
      </div>
      {formik.errors.sector && (
        <small className="validation-err-message sector">
          {formik.errors.status}
        </small>
      )}
    </div>
  );
}
