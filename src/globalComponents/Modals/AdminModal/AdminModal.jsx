import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import {
  deleteAdminAction
} from "../../../redux/actions/adminsActions";
import { ADMINS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import Status from "./components/Buttons/Status";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import InputField from "./components/Inputs/InputField";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";

const AdminModal = () => {
  const dispatch = useDispatch();
  const { adminsModalData } = useSelector((state) => state.adminsModal);
  const inputNameArr1 = ["fullName", "email", "password"];
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // formik
  const formik = useFormik({
    initialValues: {
      fullName: adminsModalData.fullName ? adminsModalData.fullName : "",
      email: adminsModalData.email ? adminsModalData.email : "",
      password: adminsModalData.password ? adminsModalData.password : "",
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
    dispatch(deleteAdminAction(adminsModalData._id));
    dispatch({
      type: ADMINS_MODAL_ACTION_TYPE.GET_ADMINS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const closeModal = () => {
    dispatch({
      type: ADMINS_MODAL_ACTION_TYPE.GET_ADMINS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con admin-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{adminsModalData?._id ? "Admin yenilə" : "Admin yarat"}</h2>
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
            {inputNameArr1.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                formik={formik}
                setInputValue={setInputValue}
                adminsModalData={adminsModalData}
              />
            ))}
          </div>
        </Box>

        {adminsModalData?._id ? (
          <SubmitBtn
            formik={formik}
            adminsModalData={adminsModalData}
            funcType="update"
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            formik={formik}
            adminsModalData={adminsModalData}
            funcType="create"
            setShowDeleteModal={setShowDeleteModal}
          />
        )}

        {adminsModalData?._id && (
          <div className="joined-time">
            Qoşuldu: {moment(adminsModalData.createdAt).format("YYYY.MM.DD")}
          </div>
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

export default AdminModal;
