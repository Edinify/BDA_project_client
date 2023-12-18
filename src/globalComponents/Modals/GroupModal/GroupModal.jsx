import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { GROUP_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import TeacherList from "./components/SelectCollection/TeacherList";
import GroupList from "./components/SelectCollection/GroupList";
import LessonDaysList from "./components/SelectCollection/LessonDaysList";
import { useLocation } from "react-router-dom";
import LessonTimesList from "./components/SelectCollection/LessonTimesList";

export const GroupModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { groupModalData: modalData } = useSelector(
    (state) => state.groupModal
  );
  const inputNameArr = ["startDate", "endDate"];

  // formik
  const formik = useFormik({
    initialValues: {
      fullName: modalData.fullName ? modalData.fullName : "",
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

  const updateModalState = (keyName, value) => {
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con student-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head non-bottom-margin">
          <h2>
            {modalData?._id ? "Mövcud qrup yenilə" : "Mövcud qrup  yarat"}
          </h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="create-update-modal-form">
            <TeacherList
              updateModalState={updateModalState}
              modalData={modalData}
            />
            <GroupList
              updateModalState={updateModalState}
              modalData={modalData}
            />
            <LessonDaysList
              updateModalState={updateModalState}
              modalData={modalData}
            />
            <LessonTimesList
              updateModalState={updateModalState}
              modalData={modalData}
            />
            <InputField
              formik={formik}
              setInputValue={setInputValue}
              modalData={modalData}
              inputName={"studentCount"}
              updateModalState={updateModalState}
            />
            <div className="input-couples">
              {inputNameArr.map((name, index) => (
                <InputField
                  key={index}
                  formik={formik}
                  setInputValue={setInputValue}
                  modalData={modalData}
                  inputName={name}
                  updateModalState={updateModalState}
                />
              ))}
            </div>
          </div>
        </Box>

        {modalData?._id ? (
          <div className="create-update-modal-btn-con">
            <SubmitBtn
              formik={formik}
              modalData={modalData}
              funcType="update"
            />
          </div>
        ) : (
          <SubmitBtn formik={formik} modalData={modalData} funcType="create" />
        )}
      </div>
    </div>
  );
};
