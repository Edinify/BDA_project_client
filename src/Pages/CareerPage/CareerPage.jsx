import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCareerPaginationAction } from "../../redux/actions/careerActions";
import { CAREER_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import CareerData from "./components/CareerData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const CareerPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.careerPagination);
  const { careerSearchValues } = useSelector((state) => state.searchValues);

  const getPageNumber = (pageNumber) => {
    if (careerSearchValues) {
      dispatch(getCareerPaginationAction(pageNumber, careerSearchValues));
    } else {
      dispatch(getCareerPaginationAction(pageNumber, ""));
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
    dispatch(getCareerPaginationAction(1, careerSearchValues));
  };

  useEffect(() => {
    if (careerSearchValues) {
      dispatch(getCareerPaginationAction(1, careerSearchValues));
    } else {
      dispatch(getCareerPaginationAction(1, ""));
    }
  }, []);
  return (
    <div className="details-page career-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"CAREER_SEARCH_VALUE"}
        dataSearchValues={careerSearchValues}
        addBtn={false}
      />
      <CareerData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default CareerPage;
