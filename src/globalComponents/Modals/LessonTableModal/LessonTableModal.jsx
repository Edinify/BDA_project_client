import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import ProfileList from "./components/SelectCollection/Profiles/ProfileList";

const LessonTableModal = () => {
  const dispatch = useDispatch();
  const { lessonTableModalData: modalData } = useSelector(
    (state) => state.lessonTableModal
  );
  const inputNameArr1 = ["birthday", "phone", "email", "password"];

  // formik
  const formik = useFormik({
    initialValues: {
      fullName: modalData.fullName ? modalData.fullName : "",
      birthday: modalData?.birthday ? modalData?.birthday : "",
      email: modalData.email ? modalData.email : "",
      phone: modalData.phone ? modalData.phone : "",
      position: modalData.position ? modalData.position : "",
      profiles: modalData.profiles ? modalData.profiles : "",
      password: modalData.password ? modalData.password : "",
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
    if (keyName === "profiles") {
      const formikValue = value.length > 0 ? (value?.find((item) => !item.power) ? "" : "true") : '' ;
      setInputValue("profiles", formikValue);
    } else {
      setInputValue(keyName, value);
    }
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Əməkdaş yenilə" : "Əməkdaş yarat"}</h2>
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
              inputName="fullName"
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
            <InputField
              inputName="position"
              formik={formik}
              setInputValue={setInputValue}
              modalData={modalData}
              updateModalState={updateModalState}
            />
            <ProfileList
              formik={formik}
              updateModalState={updateModalState}
              modalData={modalData}
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

        {modalData?._id && (
          <div className="joined-time">
            Qoşuldu: {moment(modalData.createdAt).format("YYYY.MM.DD")}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonTableModal;
