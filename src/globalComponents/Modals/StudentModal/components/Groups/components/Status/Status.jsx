import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

export default function Status({ data, setInputValue, formik, addGroupData }) {
  const changeSector = (value) => {
    addGroupData("status", value);
    setInputValue("status", value);
  };

  // console.log(data.status, "data in status component");
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
              fontSize: 28,
            },
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        >
          <FormControlLabel
            value="wait"
            control={<Radio checked={data?.status} />}
            label="Məzun"
            onClick={() => {
              changeSector(true);
            }}
          />
          <FormControlLabel
            value="paid"
            control={<Radio checked={!data?.status} />}
            label="Davam edir"
            onClick={() => {
              changeSector(false);
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
