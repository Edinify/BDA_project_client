import { TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { ReactComponent as Eye } from "../../../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/icons/eye-slash.svg";
import { useDispatch } from "react-redux";

export default function InputField({
  formik,
  modalData,
  inputName,
  updateModalState,
}) {
  const dispatch = useDispatch();
  const [shrink, setShrink] = useState(false);
  const [viewPass, setViewPass] = useState(true);
  const inputData = [
    {
      inputName: "studentName",
      label: "Tələbə",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "addInfo",
      label: "Əlavə məlumat",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
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
      className: "birthday-input",
    },
    {
      inputName: "constTime",
      label: "Konsultasiya saatı",
      type: "time",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      className: "birthday-input",
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
      className: "birthday-input",
    },
    {
      inputName: "studentPhone",
      label: "Mobil nömrə",
      type: "tel",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
  ];

  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName)?.className || ""
      }
    >
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
            paddingRight: inputData.find((item) => item.inputName === inputName)
              ?.paddingRight,
          },
          marginTop: inputData.find((item) => item.inputName === inputName)
            .marginTop,
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
                  .inputValue
              ? true
              : shrink,
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
        onChange={(e) => updateModalState(inputName, e.target.value)}
        onBlur={(e) => {
          formik.setFieldTouched(inputName, true);
          setShrink(!!e.target.value);
        }}
        onFocus={() => setShrink(true)}
      />

      {inputName === "password" && modalData?._id
        ? formik.errors[inputName] &&
          formik.errors[inputName] !== "Bu xana tələb olunur." &&
          formik.touched[inputName] && (
            <small className="validation-err-message">
              {formik.errors[inputName]}
            </small>
          )
        : formik.errors[inputName] &&
          formik.touched[inputName] && (
            <small className="validation-err-message">
              {formik.errors[inputName]}
            </small>
          )}
      {inputName === "password" && (
        <div className="modal-view-icon" onClick={() => setViewPass(!viewPass)}>
          {viewPass ? <EyeSlash /> : <Eye />}
        </div>
      )}
    </div>
  );
}
