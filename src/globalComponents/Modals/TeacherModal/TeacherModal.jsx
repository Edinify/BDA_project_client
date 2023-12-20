import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { TEACHERS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import Status from "./components/Buttons/Status";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import CoursesList from "./components/SelectCollection/CoursesList/CoursesList";
const TeacherModal = () => {
  const dispatch = useDispatch();
  const { teachersModalData: modalData } = useSelector(
    (state) => state.teachersModal
  );
  const inputNameArr1 = [
    "fin",
    "seria",
    "birthday",
    "phone",
    "email",
    "password",
  ];

  // formik
  const formik = useFormik({
    initialValues: {
      fullName: modalData.fullName ? modalData.fullName : "",
      fin: modalData.fin ? modalData.fin : "",
      seria: modalData.seria ? modalData.seria : "",
      phone: modalData.phone ? modalData.phone : "",
      birthday: modalData?.birthday ? modalData?.birthday : "",
      courses: modalData?.courses ? (modalData?.courses.length > 0 ? 'yes' : '') : "",
      email: modalData?.email ? modalData?.email : "",
      password: modalData?.password ? modalData?.password : "",
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
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Müəllim yenilə" : "Müəllim yarat"}</h2>
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
                  setInputValue={setInputValue}
                  modalData={modalData}
                  updateModalState={updateModalState}
                />
              ))}
            </div>

            <CoursesList
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
          </div>
        </Box>

        {modalData?._id ? (
          <div className="create-update-modal-btn-con">
            <Status modalData={modalData} updateModalState={updateModalState} />
            <SubmitBtn
              formik={formik}
              modalData={modalData}
              funcType="update"
              closeModal={closeModal}
            />
          </div>
        ) : (
          <SubmitBtn
            formik={formik}
            modalData={modalData}
            funcType="create"
            closeModal={closeModal}
          />
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

export default TeacherModal;
