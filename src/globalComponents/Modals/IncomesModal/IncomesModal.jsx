import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { INCOMES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import InputField from "./components/InputField/InputField";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import PaymentMethod from "./components/PaymentMethod/PaymentMethod";
import Category from "./components/InputDropdowns/Category";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import { useFinanceCustomHook } from "../../../Pages/FinancePage/utils";

export const IncomesModal = () => {
  const dispatch = useDispatch();
  const {deleteIncome} = useFinanceCustomHook()
  const { incomesModalData } = useSelector((state) => state.incomesModal);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const selectedCategoryList = [
    { key: "tuitionFees", name: "Təhsil haqqı" },
    { key: "other", name: "Digər" },
  ];
  const inputNameArr = [
    // "category",
    "appointment",
    "unitMeasurement",
    // "quantity",
    "unitPrice",
    "recipient",
    "amount",
    "date",
    // "paymentMethod",
    "imx",
  ];

  // formik
  const formik = useFormik({
    initialValues: {
      category: incomesModalData?.category ? incomesModalData?.category : "",
      appointment: incomesModalData?.appointment
        ? incomesModalData?.appointment
        : "",
      unitMeasurement: incomesModalData?.unitMeasurement
        ? incomesModalData?.unitMeasurement
        : "",
      // quantity: incomesModalData?.quantity ? incomesModalData?.quantity : "",
      unitPrice: incomesModalData?.unitPrice ? incomesModalData?.unitPrice : "",
      recipient: incomesModalData?.recipient ? incomesModalData?.recipient : "",
      amount: incomesModalData?.amount ? incomesModalData?.amount : "",
      date: incomesModalData?.date ? incomesModalData?.date : "",
      paymentMethod: incomesModalData?.paymentMethod
        ? incomesModalData?.paymentMethod
        : "",
      imx: incomesModalData?.imx ? incomesModalData?.imx : "",
    },
    validationSchema: ValidationSchema,
  });
  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  const deleteItem = () => {
    deleteIncome(incomesModalData._id)
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL,
      payload: {
        data: { ...incomesModalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const categoryDropdown = () => {
    setCategoryOpen(!categoryOpen);
  };
  const categoryAddData = (item) => {
    setInputValue("category", item.key);
    updateModalState("category", item.key);
    setCategoryOpen(false);
    setSelectedCategory(item);
  };

  useEffect(() => {
    if (incomesModalData?._id) {
      if (incomesModalData.category) {
        setSelectedCategory({
          name: selectedCategoryList.filter(
            (item) => item.key === incomesModalData.category
          )[0]?.name,
        });
      }
    }
  }, []);

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>
            {incomesModalData?._id ? "Mədaxili yenilə" : "Mədaxil yaradın"}
          </h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="create-update-modal-form">
            <PaymentMethod
              incomesModalData={incomesModalData}
              updateModalState={updateModalState}
              formik={formik}
              setInputValue={setInputValue}
            />
            <Category
              formik={formik}
              selectedCategory={selectedCategory}
              categoryDropdown={categoryDropdown}
              categoryOpen={categoryOpen}
              selectedCategoryList={selectedCategoryList}
              categoryAddData={categoryAddData}
            />
            {inputNameArr.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                incomesModalData={incomesModalData}
                updateModalState={updateModalState}
                formik={formik}
                setInputValue={setInputValue}
              />
            ))}
          </div>
        </Box>

        {incomesModalData?._id ? (
          <SubmitBtn
            formik={formik}
            funcType="update"
            incomesModalData={incomesModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            formik={formik}
            funcType="create"
            incomesModalData={incomesModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
        {showDeleteModal && (
          <DeleteItemModal
            setShowDeleteModal={setShowDeleteModal}
            deleteItem={deleteItem}
          />
        )}
      </div>
    </div>
  );
};
