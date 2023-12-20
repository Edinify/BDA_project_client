import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSyllabusPaginationAction } from "../../redux/actions/syllabusActions";
import { SYLLABUS_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import SyllabusData from "./components/SyllabusData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const SyllabusPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.syllabusPagination);
  const { syllabusSearchValues } = useSelector((state) => state.searchValues);
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);

  const getPageNumber = (pageNumber) => {
    if (syllabusSearchValues) {
      dispatch(getSyllabusPaginationAction(pageNumber, syllabusSearchValues, selectedCourse._id));
    } else {
      dispatch(getSyllabusPaginationAction(pageNumber, "", selectedCourse._id));
    }
  };
  const openModal = () => {
    dispatch({
      type: SYLLABUS_MODAL_ACTION_TYPE.GET_SYLLABUS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getSyllabusPaginationAction(1, syllabusSearchValues, selectedCourse._id));
  };

  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"SYLLABUS_SEARCH_VALUE"}
        dataSearchValues={syllabusSearchValues}
        statusType='syllabus'
      />
      <SyllabusData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default SyllabusPage;
