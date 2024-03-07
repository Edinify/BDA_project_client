import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCareerPaginationAction } from "../../redux/actions/careerActions";
import {
  CAREER_ALL_ACTIONS_TYPE,
  CAREER_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
import CareerData from "./components/CareerData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const CareerPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.careerPagination);
  const { careerSearchValues } = useSelector((state) => state.searchValues);
  const { courseId } = useSelector((state) => state.studentStatus);
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);

  const careerFilter = () => {
    dispatch({ type: CAREER_ALL_ACTIONS_TYPE.RESET_CAREER_PAGINATION });
    dispatch(
      getCareerPaginationAction(
        0,
        careerSearchValues,
        courseId,
        selectedGroup._id
      )
    );
  };

  const getPageNumber = (pageNumber) => {
    if (careerSearchValues) {
      dispatch(
        getCareerPaginationAction(
          pageNumber,
          careerSearchValues,
          courseId,
          selectedGroup._id
        )
      );
    } else {
      dispatch(
        getCareerPaginationAction(pageNumber, "", courseId, selectedGroup._id)
      );
    }
  };
  const openModal = () => {
    dispatch({
      type: CAREER_MODAL_ACTION_TYPE.GET_CAREER_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(
      getCareerPaginationAction(
        1,
        careerSearchValues,
        courseId,
        selectedGroup._id
      )
    );
  };

  useEffect(() => {
    if (careerSearchValues) {
      dispatch(getCareerPaginationAction(0, careerSearchValues, "", ""));
    } else {
      dispatch(getCareerPaginationAction(0, "", "", ""));
    }
    return () => {
      dispatch({ type: CAREER_ALL_ACTIONS_TYPE.RESET_CAREER_PAGINATION });
    };
  }, [dispatch]);

  return (
    <div className="details-page career-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"CAREER_SEARCH_VALUE"}
        dataSearchValues={careerSearchValues}
        addBtn={false}
        profile="career"
        statusType="career"
        filter={careerFilter}
      />
      <CareerData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default CareerPage;
