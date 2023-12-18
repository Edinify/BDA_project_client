import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import Status from "./components/Buttons/Status";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import CoursesInput from "./components/Inputs/CoursesInput";

export const StudentModal = () => {
  const dispatch = useDispatch();
  const { studentsModalData: modalData } = useSelector(
    (state) => state.studentsModal
  );
  const [classIcon, setClassIcon] = useState(false);
  const [selectedClassList, setSelectedClassList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const inputNameArr1 = ["motherPhone", "fin"];

  // formik
  const formik = useFormik({
    initialValues: {
      fullName: modalData.fullName ? modalData.fullName : "",
      lessonAmount: modalData?.courses
        ? modalData?.courses?.find((item) => !item.lessonAmount)
          ? ""
          : 1
        : "",
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
  const changeIcon = () => {
    setClassIcon(!classIcon);
  };

  useEffect(() => {
    if (modalData?._id) {
      setSelectedClassList(modalData.courses);
    }
  }, []);

  useEffect(() => {
    if (modalData?._id && selectedClassList) {
      const coursesIdList = selectedClassList?.map((course) => {
        return course._id
          ? { course: course.course._id, lessonAmount: course?.lessonAmount }
          : "";
      });
      const coursesId = selectedClassList.map((course) => {
        return course?.course?._id;
      });
      setCheckedList([...coursesId]);
      updateModalState("courses", [...coursesIdList]);
    } else {
      if (selectedClassList.length > 0) {
        const coursesIdList = selectedClassList.map((course) => {
          return {
            course: course.course._id,
            lessonAmount: course?.lessonAmount,
          };
        });
        const coursesId = selectedClassList.map((course) => {
          return course?.course?._id;
        });
        setCheckedList([...coursesId]);
        updateModalState("courses", [...coursesIdList]);
      }
    }
  }, [selectedClassList]);

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
            <InputField
              inputName={"email"}
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
            <CoursesInput
              formik={formik}
              changeIcon={changeIcon}
              setClassIcon={setClassIcon}
              classIcon={classIcon}
              checkedList={checkedList}
              selectedClassList={selectedClassList}
              setSelectedClassList={setSelectedClassList}
              setInputValue={setInputValue}
              updateModalState={updateModalState}
              modalData={modalData}
            />
            <CoursesInput
              formik={formik}
              changeIcon={changeIcon}
              setClassIcon={setClassIcon}
              classIcon={classIcon}
              checkedList={checkedList}
              selectedClassList={selectedClassList}
              setSelectedClassList={setSelectedClassList}
              setInputValue={setInputValue}
              updateModalState={updateModalState}
              modalData={modalData}
            />
          </div>
        </Box>

        {modalData?._id ? (
          <div className="create-update-modal-btn-con">
            <Status modalData={modalData} updateModalState={updateModalState} />
            <SubmitBtn
              formik={formik}
              modalData={modalData}
              closeModal={closeModal}
              funcType="update"
            />
          </div>
        ) : (
          <SubmitBtn
            formik={formik}
            modalData={modalData}
            closeModal={closeModal}
            funcType="create"
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
