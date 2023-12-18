import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { CONSULTATION_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import Status from "./components/Buttons/Status";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import Select from "./components/InputDropdowns/Select";
import StudentLists from "./components/StudentLists/StudentLists";

export const ConsultationModal = () => {
  const dispatch = useDispatch();
  const {
    consultationModalData: modalData,
    firstStep,
    secondStep,
  } = useSelector((state) => state.consultationModal);
  const [selectedStudentName, setSelectedStudentName] = useState(null)

  const sourceList = [
    { name: "İnstagram sponsorlu", key: "instagramSponsor" },
    { name: "İnstagram standart", key: "instagramStandart" },
    { name: "İnstruktor tövsiyyəsi", key: "instructorRecommed" },
    { name: "Dost tövsiyyəsi", key: "friendRecommend" },
    { name: "Sayt", key: "site" },
    { name: "Tədbir", key: "event" },
    { name: "AİESEC", key: "aiesec" },
    { name: "PO COMMUNİTY", key: "poCommunity" },
    { name: "Köhnə tələbə", key: "oldStudent" },
    { name: "Staff tövsiyyəsi", key: "staffRecommend" },
    { name: "SMS REKLAM", key: "smsReklam" },
    { name: "PROMOKOD", key: "promokod" },
    { name: "Resale", key: "resale" },
    { name: "Digər", key: "other" },
  ];
  const departmentList = [
    { name: "3D", key: "3d" },
    { name: "2D ANIMASIYA", key: "2dAnimation" },
    { name: "UX/UI", key: "uxAndUi" },
  ];
  const inputNameArr1 = ["constDate", "constTime"];
  const dropdownDataArr = firstStep
    ? [
        {
          name: "department",
          list: [
            { name: "3D", key: "3d" },
            { name: "2D ANIMASIYA", key: "2dAnimation" },
            { name: "UX/UI", key: "uxAndUi" },
          ],
        },
      ]
    : [
      {
        name: "department",
        list: [
          { name: "3D", key: "3d" },
          { name: "2D ANIMASIYA", key: "2dAnimation" },
          { name: "UX/UI", key: "uxAndUi" },
        ],
      },
      {
        name: "persona",
        list: [
          { name: "3D", key: "3d" },
          { name: "2D ANIMASIYA", key: "2dAnimation" },
          { name: "UX/UI", key: "uxAndUi" },
        ],
      },
      {
        name: "knowledge",
        list: [
          { name: "3D", key: "3d" },
          { name: "2D ANIMASIYA", key: "2dAnimation" },
          { name: "UX/UI", key: "uxAndUi" },
        ],
      },
      {
        name: "saleType",
        list: [
          { name: "3D", key: "3d" },
          { name: "2D ANIMASIYA", key: "2dAnimation" },
          { name: "UX/UI", key: "uxAndUi" },
        ],
      },
      ];

  // formik
  const formik = useFormik({
    initialValues: {
      fullName: modalData.fullName ? modalData.fullName : "",
      email: modalData.email ? modalData.email : "",
      password: modalData.password ? modalData.password : "",
      lessonAmount: modalData?.courses
        ? modalData?.courses?.find((item) => !item.lessonAmount)
          ? ""
          : 1
        : "",
      payment: modalData.payment ? modalData.payment : "",
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
    console.log(keyName, value);
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

  console.log(modalData);

  return (
    <div className="create-update-modal-con student-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head non-bottom-margin">
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
            <StudentLists
              setSelectedStudentName={setSelectedStudentName}
              selectedStudentName={selectedStudentName}
              updateModalState={updateModalState}
            />
            <InputField
              inputName="phone"
              formik={formik}
              setInputValue={setInputValue}
              modalData={modalData}
              updateModalState={updateModalState}
            />

            {dropdownDataArr.map((item, index) => {
              <Select
                formik={formik}
                dataList={departmentList}
                inputName={item}
                setInputValue={setInputValue}
                updateModalState={updateModalState}
              />;
            })}

            <InputField
              inputName="contactDate"
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
          </div>
        </Box>

        {modalData?._id ? (
          <div className="create-update-modal-btn-con">
            <Status modalData={modalData} updateModalState={updateModalState} />
            <SubmitBtn
              formik={formik}
              modalData={modalData}
              funcType="update"
            />
          </div>
        ) : (
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
