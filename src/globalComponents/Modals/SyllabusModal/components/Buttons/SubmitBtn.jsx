import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSyllabusAction, createSyllabusAction } from "../../../../../redux/actions/syllabusActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  const dispatch = useDispatch();
  const { syllabusModalLoading: modalLoading } = useSelector((state) => state.syllabusModal);
  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });
  const dataCreate = () => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.SYLLABUS_SEARCH_VALUE,
      payload: "",
    });
    if (modalData?._id) {
      dispatch(updateSyllabusAction(modalData?._id, modalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.SYLLABUS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(
        createSyllabusAction({
          ...modalData,
        })
      );
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (
          Object.keys(formik.errors).length === 0 &&
          modalData?.fullName
        ) {
          return false;
        } else if (
          Object.keys(formik.errors).length === 1 &&
          formik.errors.password === "Bu xana tələb olunur."
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        if (formik.isValid && modalData?.fullName) {
          return false;
        } else {
          return true;
        }
      }
    });
  }, [formik.errors]);

  return (
    <div>
      <div className="create-update-modal-btn">
        <button disabled={isDisabled || modalLoading} onClick={dataCreate}>
        {modalLoading ? (
          <LoadingBtn />
        ) : funcType === "update" ? (
          "Yenilə"
        ) : (
          "Yarat"
        )}
        </button>
      </div>
    </div>
  );
};

export default SubmitBtn;
