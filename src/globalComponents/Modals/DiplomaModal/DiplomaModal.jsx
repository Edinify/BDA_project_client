import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { DIPLOMA_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import InputField from "./components/Inputs/InputField";

const DiplomaModal = () => {
  const dispatch = useDispatch();
  const { diplomaModalData: modalData } = useSelector((state) => state.diplomaModal);





  const inputArr=[
    "fullName",
    "date",
    "seria",
  ]

  const updateModalState = (keyName, value) => {
    dispatch({
      type: DIPLOMA_MODAL_ACTION_TYPE.GET_DIPLOMA_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };

  const closeModal = () => {
    dispatch({
      type: DIPLOMA_MODAL_ACTION_TYPE.GET_DIPLOMA_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>Diplom yenilə</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* <div className="input-couples ">
            {inputArr.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                modalData={modalData}
                updateModalState={updateModalState}
              />
            ))}
          </div> */}
        </Box>
      </div>
    </div>
  );
};

export default DiplomaModal;
