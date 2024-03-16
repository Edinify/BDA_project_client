import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTuitionFeePaginationAction } from "../../redux/actions/tuitionFeeActions";
import {
  TUITION_FEE_ALL_ACTIONS_TYPE,
  TUITION_FEE_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
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
  const { loading } = useSelector((state) => state.tuitionFeePagination);

  const filterTuition = () => {
    console.log("filterrrrrrr");
    dispatch({
      type: TUITION_FEE_ALL_ACTIONS_TYPE.RESET_TUITION_FEE_PAGINATION,
    });

    dispatch(
      getTuitionFeePaginationAction(
        0,
        tuitionFeeSearchValues,
        courseId,
        selectedGroup._id,
        paymentStatus
      )
    );
  };

  // console.log(selectedGroup)

  const getNextTuitionFees = () => {
    console.log(loading, "loading");
    if (loading) return;

    console.log("getNextTuitionFees");
    if (tuitionFeeSearchValues) {
      dispatch(
        getTuitionFeePaginationAction(
          currentLength,
          tuitionFeeSearchValues,
          courseId,
          selectedGroup._id,
          paymentStatus
        )
      );
    } else {
      dispatch(
        getTuitionFeePaginationAction(
          currentLength,
          "",
          courseId,
          selectedGroup._id,
          paymentStatus
        )
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

    dispatch({
      type: TUITION_FEE_ALL_ACTIONS_TYPE.RESET_TUITION_FEE_PAGINATION,
    });

    dispatch(
      getTuitionFeePaginationAction(
        0,
        tuitionFeeSearchValues,
        courseId,
        selectedGroup._id,
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

    return () =>
      dispatch({
        type: TUITION_FEE_ALL_ACTIONS_TYPE.RESET_TUITION_FEE_PAGINATION,
      });
  }, []);

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
