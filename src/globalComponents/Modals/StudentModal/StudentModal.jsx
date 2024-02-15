import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import WhereComing from "./components/SelectCollection/WhereComing";
import CoursesList from "./components/SelectCollection/CoursesList/CoursesList";
import GroupList from "./components/Groups/GroupList";

export const StudentModal = () => {
  const dispatch = useDispatch();
  const { studentsModalData: modalData } = useSelector(
    (state) => state.studentsModal
  );
  const inputNameArr1 = ["fin", "seria", "birthday", "phone"];


  // console.log(modalData,"studentModal")
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
    if (keyName === "courses") {
      setInputValue("courses", value.length > 0 ? "yes" : "");
    } else {
      setInputValue(keyName, value);
    }
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con student-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Tələbə yenilə" : "Tələbə yarat"}</h2>
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
              inputName={"fullName"}
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
                  setInputValue={setInputValue}
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

            <CoursesList
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <GroupList
              formik={formik}
              setInputValue={setInputValue}
              updateModalState={updateModalState}
              modalData={modalData}
            />
          </div>
        </Box>

        <SubmitBtn
          formik={formik}
          modalData={modalData}
          closeModal={closeModal}
          funcType={modalData?._id ? "update" : "create"}
        />

        {modalData?._id && (
          <div className="joined-time">
            Qoşuldu: {moment(modalData.createdAt).format("YYYY.MM.DD")}
          </div>
        )}
      </div>
    </div>
  );
};
