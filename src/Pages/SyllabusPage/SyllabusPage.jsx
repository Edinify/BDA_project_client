import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSyllabusPaginationAction } from "../../redux/actions/syllabusActions";
import { SYLLABUS_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import SyllabusData from "./components/SyllabusData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { toast } from "react-toastify";

const SyllabusPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.syllabusPagination);
  const { syllabusSearchValues } = useSelector((state) => state.searchValues);
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);

  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  const getPageNumber = (pageNumber) => {
    if (syllabusSearchValues) {
      dispatch(
        getSyllabusPaginationAction(
          pageNumber,
          syllabusSearchValues,
          selectedCourse._id
        )
      );
    } else {
      dispatch(getSyllabusPaginationAction(pageNumber, "", selectedCourse._id));
    }
  };
  const openModal = () => {
    if (selectedCourse) {
      dispatch({
        type: SYLLABUS_MODAL_ACTION_TYPE.GET_SYLLABUS_MODAL,
        payload: { data: {}, openModal: true },
      });
    } else {
      toast.error("Ixtisas seçməlisiniz", {
        position: "top-right",
        autoClose: 2000,
        toastClassName: "custom-toast",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const searchData = (e) => {
    e.preventDefault();
    if (selectedCourse) {
      dispatch(
        getSyllabusPaginationAction(1, syllabusSearchValues, selectedCourse._id)
      );
    } else {
      toast.error("Ixtisas seçməlisiniz", {
        position: "top-right",
        autoClose: 2000,
        toastClassName: "custom-toast",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"SYLLABUS_SEARCH_VALUE"}
        dataSearchValues={syllabusSearchValues}
        statusType="syllabus"
      />

      <SyllabusData
        pageNum={lastPage}
        getPageNumber={getPageNumber}
        userData={userData}
      />
    </div>
  );
};

export default SyllabusPage;
