import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultationPaginationAction } from "../../redux/actions/consultationsActions";
import { CONSULTATION_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import ConsultationData from "./components/ConsultationData";

const ConsultationsPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.consultationPagination);
  const { consultationSearchValues } = useSelector(
    (state) => state.searchValues
  );

  const getPageNumber = (pageNumber) => {
    if (consultationSearchValues) {
      dispatch(
        getConsultationPaginationAction(
          pageNumber,
          consultationSearchValues,
          "all"
        )
      );
    } else {
      dispatch(getConsultationPaginationAction(pageNumber, "", "all"));
    }
  };
  const openModal = () => {
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(
      getConsultationPaginationAction(1, consultationSearchValues, "all")
    );
  };

  useEffect(() => {
    if (consultationSearchValues) {
      dispatch(
        getConsultationPaginationAction(1, consultationSearchValues, "all")
      );
    } else {
      dispatch(getConsultationPaginationAction(1, "", ""));
    }
  }, [dispatch]);

  return (
    <div className="details-page tuition-fee-page">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"CONSULTATION_SEARCH_VALUE"}
        dataSearchValues={consultationSearchValues}
        // statusType="student"
      />
      <ConsultationData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default ConsultationsPage;
