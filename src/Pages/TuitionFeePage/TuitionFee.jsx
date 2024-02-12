import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTuitionFeePaginationAction } from "../../redux/actions/tuitionFeeActions";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import TuitionFeeData from "./components/TuitionFeeData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const TuitionFeePage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.tuitionFeePagination);
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const {courseId } = useSelector((state) => state.studentStatus);
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);

  const filterTuition = () => dispatch(
    getTuitionFeePaginationAction(
      1,
      tuitionFeeSearchValues, 
      courseId,
      selectedGroup._id
    )
  ) 

  console.log(selectedGroup)

  const getPageNumber = (pageNumber) => {
    if (tuitionFeeSearchValues) {
      dispatch(
        getTuitionFeePaginationAction(pageNumber, tuitionFeeSearchValues, "all","","")
      );
    } else {
      dispatch(getTuitionFeePaginationAction(pageNumber, "", "all","",""));
    }
  };
  const openModal = () => {
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getTuitionFeePaginationAction(1, tuitionFeeSearchValues));
  };

  useEffect(() => {
    if (tuitionFeeSearchValues) {
      dispatch(getTuitionFeePaginationAction(1, tuitionFeeSearchValues));
    } else {
      dispatch(getTuitionFeePaginationAction(1, ""));
    }
  }, [dispatch]);


  return (
    <div className="details-page tuition-fee-page">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        filter={filterTuition}
        addBtn={false}
        DATA_SEARCH_VALUE={"TUITION_FEE_SEARCH_VALUE"}
        dataSearchValues={tuitionFeeSearchValues}
        profile={"tuitionFee"}
        statusType="tutionFee"
      />
      <TuitionFeeData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default TuitionFeePage;
