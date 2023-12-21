import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonTablePaginationAction } from "../../redux/actions/lessonTableActions";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import LessonTableData from "./components/LessonTableData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const LessonTablePage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.workersPagination);
  const { lessonTableSearchValues } = useSelector((state) => state.searchValues);

  const getPageNumber = (pageNumber) => {
    if (lessonTableSearchValues) {
      dispatch(getLessonTablePaginationAction(pageNumber, lessonTableSearchValues));
    } else {
      dispatch(getLessonTablePaginationAction(pageNumber, ""));
    }
  };
  const openModal = () => {
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getLessonTablePaginationAction(1, lessonTableSearchValues));
  };

  useEffect(() => {
    if (lessonTableSearchValues) {
      dispatch(getLessonTablePaginationAction(1, lessonTableSearchValues));
    } else {
      dispatch(getLessonTablePaginationAction(1, ""));
    }
  }, []);
  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"LESSON_TABLE_SEARCH_VALUE"}
        dataSearchValues={lessonTableSearchValues}
      />
      <LessonTableData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default LessonTablePage;
