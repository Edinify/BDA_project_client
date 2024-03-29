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
      inputName: "portfolioLink",
      label: "Portfolio linki",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "cvLink",
      label: "CV linki",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "fullName",
      label: "Tələbə adı",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "previousWorkPlace",
      label: "Əvvəlki iş yeri",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "previousWorkPosition",
      label: "Əvvəlki iş vəzifəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "currentWorkPlace",
      label: "Cari iş yeri",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "currentWorkPosition",
      label: "Cari iş vəzifəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "workStartDate",
      label: "İşə başlama tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0px",
      inputValue:
        modalData[inputName] && inputName === "workStartDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
  ];

  // console.log(modalData,'lllllllllll')
  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName).className
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
            inputName === "workStartDate"
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
        disabled={inputName === "fullName"}
      />
    </div>
  );
}
