import {  useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { COURSES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/ValidationSchema";
import SubmitBtn from "./components/SubmitBtn";
// import Status from "./components/Status";
import InputField from "./components/InputField";
// import CategoryInput from "./components/CategoryInput";

export const CourseModal = () => {
  const dispatch = useDispatch();
  const {coursesModalData, coursesOpenModal} = useSelector(state => state.coursesModal)

  // formik
  const formik = useFormik({
    initialValues: {
      name: coursesModalData?.name ? coursesModalData?.name : "",
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
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL, 
      payload:{
        data: {...coursesModalData, [keyName]: value }, 
        openModal: true
      } })
  }
  const closeModal = () => {
    dispatch({ type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL, payload: { data: {}, openModal: false } });
  };
  



  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{coursesModalData?._id ? "Dərs yenilə" : "Dərs yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={e => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="create-update-modal-form">
            <InputField
              setInputValue={setInputValue}
              coursesModalData={coursesModalData}
              formik={formik}
              inputName={"name"}
            />
            {/* <CategoryInput
              formik={formik}
              setInputValue={setInputValue}
              coursesModalData={coursesModalData}
              updateModalState={updateModalState}
            /> */}
          </div>
        </Box>

        {coursesModalData?._id ? (
          <SubmitBtn
            formik={formik}
            coursesModalData={coursesModalData}
            funcType="update"
            closeModal={closeModal}
          />
        ) : (
          <SubmitBtn
            formik={formik}
            coursesModalData={coursesModalData}
            funcType="create"
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};
