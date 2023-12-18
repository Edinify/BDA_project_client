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
      inputName: "amountPaid",
      label: "Ödənilən məbləğ",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : "",
    },
    {
      inputName: "restOfAmount",
      label: "Qalıq Məbləğ",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : "",
    },
    {
      inputName: "discount",
      label: "Endirim %",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : "",
    },
    {
      inputName: "fullName",
      label: "Ad soyad",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : "",
    },
    {
      inputName: "contractDate",
      label: "Müqavilə tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "contractDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "studentCount",
      label: "Tələbə sayı",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] ? modalData[inputName] : "",
    },
    {
      inputName: "startDate",
      label: "Başlama tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "startDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "endDate",
      label: "Bitmə tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "endDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
  ];
  const inputType = inputData.find((item) => item.inputName === inputName).type;
  const inputValue = inputData.find(
    (item) => item.inputName === inputName
  )?.inputValue;
  const marginTop = inputData.find(
    (item) => item.inputName === inputName
  ).marginTop;
  const marginBottom = inputData.find(
    (item) => item.inputName === inputName
  ).marginBottom;

  return (
    <div>
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
          },
          marginTop: marginTop,
        }}
        InputLabelProps={{
          shrink:
            inputType === "date" ? true : shrink,
          style: {
            fontSize: "12px",
            color: "#3F3F3F",
            marginBottom: marginBottom,
          },
        }}
        fullWidth
        type={inputType}
        label={inputData.find((item) => item.inputName === inputName).label}
        value={inputValue}
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
