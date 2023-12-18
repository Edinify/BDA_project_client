import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { EXPENSES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import InputField from "./components/InputField/InputField";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import Category from "./components/InputDropdowns/Category";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import { useFinanceCustomHook } from "../../../Pages/FinancePage/utils";

export const ExpensesModal = () => {
  const dispatch = useDispatch();
  const {deleteExpense} = useFinanceCustomHook()
  const inputNameArr = ["appointment", "amount", "date"];
  const { expensesModalData, expensesOpenModal } = useSelector(
    (state) => state.expensesModal
  );
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const selectedCategoryList = [
    { key: "food", name: "Qida" },
    { key: "cleaningSupplies", name: "Təmizlik ləvazimatları " },
    { key: "repair", name: "Təmir" },
    { key: "lease", name: "İcarə" },
    { key: "equipment", name: "Avadanlıq" },
    { key: "other", name: "Digər" },
  ];

  const deleteItem = () => {
    deleteExpense(expensesModalData._id)
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: {
        data: { ...expensesModalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const categoryDropdown = () => {
    setCategoryOpen(!categoryOpen);
  };
  const categoryAddData = (item) => {
    updateModalState("category", item.key);
    setCategoryOpen(false);
    setSelectedCategory(item);
  };

  useEffect(() => {
    if (expensesModalData?._id) {
      if (expensesModalData.category) {
        setSelectedCategory({
          name: selectedCategoryList.filter(
            (item) => item.key === expensesModalData.category
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
            {expensesModalData?._id ? "Məhsulu yenilə" : "Məhsul yaradın"}
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
            <Category
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
                expensesModalData={expensesModalData}
                updateModalState={updateModalState}
              />
            ))}
          </div>
        </Box>

        {expensesModalData?._id ? (
          <SubmitBtn
            funcType="update"
            expensesModalData={expensesModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            funcType="create"
            expensesModalData={expensesModalData}
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
