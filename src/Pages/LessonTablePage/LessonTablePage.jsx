import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonTablePaginationAction } from "../../redux/actions/lessonTableActions";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import LessonTableData from "./components/LessonTableData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { toast } from "react-toastify";

const LessonTablePage = () => {
  const dispatch = useDispatch();
  const { status, lessonTableData, loading } = useSelector(
    (state) => state.lessonTablePagination
  );
  const { startDate, endDate } = useSelector((state) => state.datepicker);
  const { lessonTableSearchValues } = useSelector(
    (state) => state.searchValues
  );

  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const filterLessons = () =>
    dispatch(
      getLessonTablePaginationAction(
        0,
        lessonTableSearchValues,
        selectedGroup._id,
        startDate,
        endDate,
        status
      )
    );

  const getNextLessons = () => {
    if (loading) return;

    if (lessonTableSearchValues) {
      dispatch(
        getLessonTablePaginationAction(
          lessonTableData?.length || 0,
          lessonTableSearchValues,
          selectedGroup._id,
          startDate,
          endDate,
          status
        )
      );
    } else {
      dispatch(
        getLessonTablePaginationAction(
          lessonTableData?.length || 0,
          "",
          selectedGroup._id,
          startDate,
          endDate,
          status
        )
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
        0,
        lessonTableSearchValues,
        selectedGroup._id,
        startDate,
        endDate,
        status
      )
    );
  };

  console.log('lesson table page')
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

      {selectedGroup && <LessonTableData getNextLessons={getNextLessons} />}
    </div>
  );
};

export default LessonTablePage;
