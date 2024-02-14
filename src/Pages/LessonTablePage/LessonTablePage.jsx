import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonTablePaginationAction } from "../../redux/actions/lessonTableActions";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import LessonTableData from "./components/LessonTableData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { toast } from "react-toastify";

const LessonTablePage = () => {
  const dispatch = useDispatch();
  const { lastPage,status } = useSelector((state) => state.lessonTablePagination);
  const { startDate,endDate } = useSelector((state) => state.datepicker);
  // console.log(startDate,endDate)
  const { lessonTableSearchValues } = useSelector(
    (state) => state.searchValues
  );
  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const filterLessons = () => dispatch(
    getLessonTablePaginationAction(
      1,
      lessonTableSearchValues,
      selectedGroup._id,
      startDate,
      endDate,
      status
    )
  )
  const getPageNumber = (pageNumber) => {
    if (lessonTableSearchValues) {
      dispatch(
        getLessonTablePaginationAction(
          pageNumber,
          lessonTableSearchValues,
          selectedGroup._id,
          startDate,
          endDate,
          status
        )
      );
    } else {
      dispatch(
        getLessonTablePaginationAction(pageNumber, "", selectedGroup._id,startDate,
        endDate,
        status)
      );
    }
  };
  const openModal = () => {
    if (selectedGroup) {
      const students = selectedGroup.students.map((student) => ({
        student,
      }));

      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
        payload: {
          data: { group: selectedGroup._id, students },
          openModal: true,
        },
      });
    } else {
      toast.error("Qrup seçməlisiniz", {
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
    dispatch(
      getLessonTablePaginationAction(
        1,
        lessonTableSearchValues,
        selectedGroup._id,
        startDate,
        endDate,
        status
      )
    );
  };

  return (
    <div className="details-page lesson-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        filter={filterLessons}
        DATA_SEARCH_VALUE={"LESSON_TABLE_SEARCH_VALUE"}
        dataSearchValues={lessonTableSearchValues}
        statusType="lesson-table"
        search={false}
        profile={"lessonTable"}
      />

      <LessonTableData
        pageNum={lastPage}
        getPageNumber={getPageNumber}
        userData={userData}
      />
    </div>
  );
};

export default LessonTablePage;
