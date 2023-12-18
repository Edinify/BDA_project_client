import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { ReactComponent as Eye } from "../../../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/icons/eye-slash.svg";

export default function InputField({
  formik,
  setInputValue,
  modalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  const inputData = [
    {
      inputName: "phone",
      label: "Telefon nömrəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : '',
    },
    {
      inputName: "constTime",
      label: "Konsultasiya saatı",
      type: "time",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : ''  ,
    },
    {
      inputName: "constDate",
      label: "Konsultasiya tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "constDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "contactDate",
      label: "Əlaqə tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "contactDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
  ];

  return (
    <div className={inputName === "password" ? "password-input" : ""}>
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
            paddingRight: inputData.find((item) => item.inputName === inputName)
              ?.paddingRight,
          },
          marginTop: inputData.find((item) => item.inputName === inputName).marginTop || '0',
        }}
        InputLabelProps={{
          shrink:
          (inputName === "constDate" || inputName === "contactDate" || inputName === "constTime")
            ? true
            : (inputData.find((item) => item.inputName === inputName)
                .inputValue
            ? true
            : shrink),
          style: {
            fontSize: "12px",
            color: "#3F3F3F",
            marginBottom: inputData.find((item) => item.inputName === inputName)
              .marginBottom,
          },
        }}
        fullWidth
        id={inputName}
        name={inputName}
        type={inputData.find((item) => item.inputName === inputName).type}
        label={inputData.find((item) => item.inputName === inputName).label}
        value={
          inputData.find((item) => item.inputName === inputName)?.inputValue
        }
        onWheel={(e) => e.target.blur()}
        onChange={(e) => {
          updateModalState(inputName, e.target.value);
          setInputValue(inputName, e.target.value);
        }}
        onBlur={(e) => {
          formik.setFieldTouched(inputName, true);
          setShrink(!!e.target.value);
        }}
        onFocus={() => setShrink(true)}
      />

      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </div>
  );
}
