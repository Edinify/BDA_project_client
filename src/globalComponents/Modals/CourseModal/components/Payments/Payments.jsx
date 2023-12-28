import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ReactComponent as CheckIcon } from "../../../../../assets/icons/Checkbox.svg";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";
import SelectedPaymentList from "./components/SelectedPaymentList";
import PaymentItem from "./components/PaymentItem";

const Payments = ({ formik, modalData, updateModalState }) => {
  const { paymentTypeList: dataList } = useCustomHook();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sameItemErrMessage, setsameItemErrMessage] = useState(false);

  // add new payment section
  const addData = () => {
    if (modalData.payments) {
      // the same element can't be added twice
      if (
        modalData.payments.find((item) => item.paymentType === selectedItem.key)
      ) {
        setsameItemErrMessage(true);
      } else {
        setsameItemErrMessage(false);
        updateModalState("payments", [
          ...modalData.payments,
          { paymentType: selectedItem.key, payment: "" },
        ]);
      }
    } else {
      updateModalState("payments", [
        { paymentType: selectedItem.key, payment: "" },
      ]);
    }
    setSelectedItem("");
    setOpenDropdown(false);
  };
  // add payment
  const addPayment = (type, payment) => {
    const paymentData = modalData.payments;
    const foundIndex = paymentData.findIndex(
      (item) => item.paymentType === type
    );
    paymentData[foundIndex] = { ...paymentData[foundIndex], payment: payment };
    updateModalState("payments", paymentData);
  };
  const deleteData = (type) => {
    if (modalData.payments.length === 1) {
      updateModalState("payments", []);
    } else {
      const paymentsData = modalData.payments.filter(
        (item) => item.paymentType !== type
      );
      updateModalState("payments", paymentsData);
    }
  };
  return (
    <>
      <div className="dropdown-input  courses">
        <div className="left">
          <div className="input-box">
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Ödəniş növü"
              autoComplete="off"
              disabled
              value={selectedItem ? selectedItem.name : ""}
            />
            <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul className={`dropdown-body ${openDropdown ? "active" : ""}`}>
            {dataList.map((item) => (
              <li key={item.key} onClick={() => setSelectedItem(item)}>
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <button
            disabled={!selectedItem}
            onClick={() => addData()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
      {sameItemErrMessage && (
        <small className="exist-error-message">
          Bu ödəniş növü artıq mövcuddur.
        </small>
      )}
      <ul className="category-list courses-li">
        {modalData?.payments?.map((item, index) => (
          <PaymentItem key={index} data={item} deleteData={deleteData} addPayment={addPayment}/>
        ))}
      </ul>{" "}
    </>
  );
};

export default Payments;
