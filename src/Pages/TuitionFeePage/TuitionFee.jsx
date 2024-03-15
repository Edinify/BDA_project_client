import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTuitionFeePaginationAction } from "../../redux/actions/tuitionFeeActions";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import TuitionFeeData from "./components/TuitionFeeData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const TuitionFeePage = () => {
  const dispatch = useDispatch();
  const { lastPage, currentLength } = useSelector(
    (state) => state.tuitionFeePagination
  );
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const { courseId } = useSelector((state) => state.studentStatus);
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const { paymentStatus } = useSelector((state) => state.paymentStatus);

  const filterTuition = () =>
    dispatch(
      getTuitionFeePaginationAction(
        1,
        tuitionFeeSearchValues,
        courseId,
        selectedGroup._id,
        paymentStatus
      )
    );

  // console.log(selectedGroup)

  const getNextTuitionFees = () => {
    console.log('getNextTuitionFees')
    if (tuitionFeeSearchValues) {
      dispatch(
        getTuitionFeePaginationAction(
          currentLength,
          tuitionFeeSearchValues,
          "",
          "",
          paymentStatus
        )
      );
    } else {
      dispatch(
        getTuitionFeePaginationAction(currentLength, "", "", "", paymentStatus)
      );
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
    dispatch(
      getTuitionFeePaginationAction(
        1,
        tuitionFeeSearchValues,
        "",
        "",
        paymentStatus
      )
    );
  };

  useEffect(() => {
    if (tuitionFeeSearchValues) {
      dispatch(
        getTuitionFeePaginationAction(
          0,
          tuitionFeeSearchValues,
          "",
          "",
          paymentStatus
        )
      );
    } else {
      dispatch(getTuitionFeePaginationAction(0, "", "", "", paymentStatus));
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
      <TuitionFeeData
        pageNum={lastPage}
        getNextTuitionFees={getNextTuitionFees}
      />
    </div>
  );
};

export default TuitionFeePage;
