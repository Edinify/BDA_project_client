import { TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { ReactComponent as Eye } from "../../../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/icons/eye-slash.svg";

export default function InputField({
  formik,
  modalData,
  inputName,
  updateModalState,
}) {
  const [shrink, setShrink] = useState(false);
  const [viewPass, setViewPass] = useState(true);
  const [totalAmountValue, setTotalAmountValue] = useState(() => {
    const amount =  modalData.amount || 0
    const discount = modalData.discount || 0
    return amount - ((amount * discount) / 100) 
  })
  const inputData = [
    {
      inputName: "fullName",
      label: "Ad soyad",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "fin",
      label: "Fin kod",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "seria",
      label: "Seria nömrəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "birthday",
      label: "Doğum tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "birthday"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "phone",
      label: "Mobil nömrə",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },

    {
      inputName: "degree",
      label: "Təhsil dərəcəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "contractStartDate",
      label: "Müqavilə başlama tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "contractStartDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "contractEndDate",
      label: "Müqavilə bitmə tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "contractEndDate"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "amount",
      label: "Ödəniş",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "totalAmount",
      label: "Yekun məbləğ",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: totalAmountValue || '0'
    },
    {
      inputName: "discount",
      label: "Endirim %",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
    },
    {
      inputName: "password",
      label: !modalData._id ? "Şifrə" : "Şifrəni dəyiş",
      type: viewPass ? "password" : "text",
      marginTop: "24px",
      marginBottom: "0",
      paddingRight: "50px",
    },
  ];

  useEffect(() => {
    setTotalAmountValue(() => {
      const amount =  modalData.amount || 0
      const discount = modalData.discount || 0
      const result = amount - ((amount * discount) / 100) 
      updateModalState('totalAmount', result);
      return result
    })
  }, [modalData.amount, modalData.discount])

  return (
    <div className={inputName === "password" ? "password-input" : ""}>
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
            paddingRight: inputData.find((item) => item.inputName === inputName)
              ?.paddingRight,
          },
          marginTop:
            inputData.find((item) => item.inputName === inputName)?.marginTop ||
            "0",
        }}
        InputLabelProps={{
          shrink:
            inputData.find((item) => item.inputName === inputName)?.type ===
            "date"
              ? true
              : inputData.find((item) => item.inputName === inputName)
                  ?.inputValue
              ? true
              : shrink,
          style: {
            fontSize: "12px",
            color: "#3F3F3F",
            marginBottom: inputData.find((item) => item.inputName === inputName)
              ?.marginBottom,
          },
        }}
        fullWidth
        id={inputName}
        name={inputName}
        type={inputData.find((item) => item.inputName === inputName)?.type}
        label={inputData.find((item) => item.inputName === inputName)?.label}
        value={
          inputData.find((item) => item.inputName === inputName)?.inputValue
        }
        disabled={inputName === 'totalAmount' ? true : false}
        onWheel={(e) => e.target.blur()}
        onChange={(e) => {
          updateModalState(inputName, e.target.value);
        }}
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
