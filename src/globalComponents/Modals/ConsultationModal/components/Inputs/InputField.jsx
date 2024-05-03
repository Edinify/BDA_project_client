import { TextField } from "@mui/material";
import { useState } from "react";
import { ReactComponent as Eye } from "../../../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/icons/eye-slash.svg";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";

export default function InputField({
  formik,
  modalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  const [viewPass, setViewPass] = useState(true);
  registerLocale("az", az);

  const renderDatePicker = (dateName) => (
    <DatePicker
      selected={modalData[dateName] ? new Date(modalData[dateName]) : null}
      onChange={(date) => updateModalState(dateName, date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="dd/MM/yyyy"
      placeholderText="dd/mm/yyyy"
      locale="az"
    />
  );

  const inputData = [
    {
      inputName: "studentName",
      label: "Tələbə",
      type: "text",
    },
    {
      inputName: "addInfo",
      label: "Əlavə məlumat",
      type: "text",
    },
    {
      inputName: "constDate",
      label: "Konsultasiya tarixi",
      type: "date",
      className: "birthday-input",
    },
    {
      inputName: "constTime",
      label: "Konsultasiya saatı",
      type: "time",
    },
    {
      inputName: "contactDate",
      label: "Əlaqə tarixi",
      type: "date",
      className: "birthday-input",
    },
    {
      inputName: "studentPhone",
      label: "Mobil nömrə",
      type: "tel",
    },
  ];

  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName)?.className || ""
      }
    >
      {inputName === "constDate" || inputName === "contactDate" ? (
        renderDatePicker(inputName)
      ) : (
        <TextField
          sx={{
            "& input": {
              fontSize: "12px",
              paddingRight: inputData.find(
                (item) => item.inputName === inputName
              )?.paddingRight,
            },
            marginTop: inputData.find((item) => item.inputName === inputName)
              ?.marginTop,
            marginBottom: inputData.find((item) => item.inputName === inputName)
              ?.marginBottom,
          }}
          InputLabelProps={{
            shrink:
              inputData.find((item) => item.inputName === inputName)?.type ===
                "date" ||
              inputData.find((item) => item.inputName === inputName)?.type ===
                "time"
                ? true
                : inputData.find((item) => item.inputName === inputName)
                    ?.inputValue
                ? true
                : shrink,
            style: {
              fontSize: "12px",
              color: "#3F3F3F",
              marginBottom: inputData.find(
                (item) => item.inputName === inputName
              ).marginBottom,
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
          onChange={(e) => updateModalState(inputName, e.target.value)}
          onBlur={(e) => {
            formik.setFieldTouched(inputName, true);
            setShrink(!!e.target.value);
          }}
          onFocus={() => setShrink(true)}
        />
      )}

      {inputName === "password" && (
        <div className="modal-view-icon" onClick={() => setViewPass(!viewPass)}>
          {viewPass ? <EyeSlash /> : <Eye />}
        </div>
      )}
    </div>
  );
}
