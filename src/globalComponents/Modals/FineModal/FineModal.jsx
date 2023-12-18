import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  DROPDOWN_NAME_ACTION_TYPE,
  FINE_MODAL_ACTION_TYPE,
} from "../../../redux/actions-type";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import TeacherLists from "./components/TeacherLists/TeacherLists";
import FineTypeLists from "./components/FineTypeLists/FineTypeLists";
import { getTeachersAction } from "../../../redux/actions/teachersActions";
import InputField from "./components/InputField/InputField";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import { deletetFineAction } from "../../../redux/actions/fineActions";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";

export const FineModal = () => {
  const dispatch = useDispatch();
  const { fineTypeList } = useCustomHook();
  const { fineModalData } = useSelector((state) => state.fineModal);
  const { fineSearchValues } = useSelector((state) => state.searchValues);
  const { fineData, lastPage } = useSelector((state) => state.fineData);
  const { startDate: selectedStartDate} = useSelector((state) => state.datepicker);
  const { endDate: selectedEndDate } = useSelector((state) => state.datepicker);
  const { fineCategory } = useSelector((state) => state.fineCategory);
  const { teachers } = useSelector((state) => state.teachersPagination);
  const teacherList = teachers?.filter((teacher) => teacher?.status);
  const [selectedTeacherName, setSelectedTeacherName] = useState("");
  const [teacherNameOpen, setTeacherNameOpen] = useState(false);
  const [selectedFineType, setSelectedFineType] = useState(null);
  const [fineTypeOpen, setfineTypeOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fineTypeDropdown = () => {
    setfineTypeOpen(!fineTypeOpen);
  };
  const fineTypeAddData = (item) => {
    updateModalState("fineType", item.key);
    setfineTypeOpen(false);
    setSelectedFineType(item);
  };
  const teacherNameDropdown = () => {
    setTeacherNameOpen(!teacherNameOpen);
  };
  const teacherNameAddData = (item) => {
    updateModalState("teacher", item._id);
    dispatch({ type: DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN, payload: item });
    setTeacherNameOpen(false);
    setSelectedTeacherName(item);
  };

  const deleteItem = () => {
    const page =
      lastPage > 1 ? (fineData.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = fineModalData._id;
    const searchQuery = fineSearchValues;
    const category = fineCategory ? fineCategory : "all"
    const startDate = selectedStartDate ? selectedStartDate : "";
    const endDate = selectedEndDate ? selectedEndDate : "";

    dispatch(
      deletetFineAction({
        _id,
        startDate,
        endDate,
        searchQuery,
        page,
        category,
      })
    );
    dispatch({
      type: FINE_MODAL_ACTION_TYPE.GET_FINE_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const updateModalState = (keyName, value) => {
    dispatch({
      type: FINE_MODAL_ACTION_TYPE.GET_FINE_MODAL,
      payload: {
        data: {
          ...fineModalData,
          // teacher: selectedTeacherName?._id,
          fineType: selectedFineType?.key,
          [keyName]: value,
        },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: FINE_MODAL_ACTION_TYPE.GET_FINE_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  useEffect(() => {
    dispatch(getTeachersAction());
  }, [dispatch]);

  useEffect(() => {
    if (fineModalData?._id && teachers) {
      if (fineModalData.teacher) {
        setSelectedTeacherName(
          teachers.filter((item) => item._id === fineModalData.teacher)[0]
        );
      }
      if (fineModalData.fineType) {
        setSelectedFineType(
          fineTypeList.filter((item) => item.key === fineModalData.fineType)[0]
        );
      }
    }
  }, [teachers]);

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{fineModalData?._id ? "Cərimə yenilə" : "Cərimə yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="create-update-modal-form">
            <TeacherLists
              selectedTeacherName={selectedTeacherName}
              setSelectedTeacherName={setSelectedTeacherName}
              teacherNameDropdown={teacherNameDropdown}
              teacherNameOpen={teacherNameOpen}
              setTeacherNameOpen={setTeacherNameOpen}
              teacherNameAddData={teacherNameAddData}
              teacherList={teacherList}
            />
            <FineTypeLists
              selectedFineType={selectedFineType}
              fineTypeDropdown={fineTypeDropdown}
              fineTypeOpen={fineTypeOpen}
              fineTypeAddData={fineTypeAddData}
              fineTypeList={fineTypeList}
            />
            <InputField
              inputName={"comment"}
              fineModalData={fineModalData}
              updateModalState={updateModalState}
            />
          </div>
        </Box>

        {fineModalData?._id ? (
          <SubmitBtn
            funcType="update"
            fineModalData={fineModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <SubmitBtn
            funcType="create"
            fineModalData={fineModalData}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
      </div>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
    </div>
  );
};
