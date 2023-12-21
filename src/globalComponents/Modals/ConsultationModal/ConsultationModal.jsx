import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { CONSULTATION_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import Course from "./components/SelectCollection/Course";
import Teacher from "./components/SelectCollection/Teacher";
import WhereComing from "./components/SelectCollection/WhereComing";
import Persona from "./components/SelectCollection/Persona";
import Knowledge from "./components/SelectCollection/Knowledge";
import CancelReason from "./components/SelectCollection/CancelReason";
import Status from "./components/SelectCollection/Status";

const ConsultationModal = () => {
  const dispatch = useDispatch();
  const { consultationModalData: modalData } = useSelector(
    (state) => state.consultationModal
  );
  const inputNameArr1 = [
    "contactDate",
    "studentPhone",
    "constDate",
    "constTime",
  ];

  // formik
  const formik = useFormik({
    initialValues: {
      studentName: modalData.studentName ? modalData.studentName : "",
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
    setInputValue(keyName, value);
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>
            {modalData?._id ? "Konsultasiya yenilə" : "Konsultasiya yarat"}
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
            <InputField
              inputName="studentName"
              formik={formik}
              setInputValue={setInputValue}
              modalData={modalData}
              updateModalState={updateModalState}
            />
            <div className="input-couples">
              {inputNameArr1.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  formik={formik}
                  modalData={modalData}
                  updateModalState={updateModalState}
                />
              ))}
            </div>
            <WhereComing
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <Course
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <Teacher
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <Persona
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <Knowledge
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <CancelReason
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <InputField
              inputName="addInfo"
              formik={formik}
              modalData={modalData}
              updateModalState={updateModalState}
            />
             <Status
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
          </div>
        </Box>

        {modalData?._id ? (
          // <div className="create-update-modal-btn-con">
          <SubmitBtn formik={formik} modalData={modalData} funcType="update" />
        ) : (
          // </div>
          <SubmitBtn formik={formik} modalData={modalData} funcType="create" />
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
