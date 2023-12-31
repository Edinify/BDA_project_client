import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultationPaginationAction } from "../../redux/actions/consultationsActions";
import { CONSULTATION_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import ConsultationData from "./components/ConsultationData";
import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";
import { useLocation } from "react-router-dom";

const ConsultationsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { lastPage } = useSelector((state) => state.consultationPagination);
  const { consultationSearchValues } = useSelector(
    (state) => state.searchValues
  );
  const status =
    location.pathname === "/consultation/appointed" ? "appointed" : "completed";

  const getPageNumber = (pageNumber) => {
    if (consultationSearchValues) {
      dispatch(
        getConsultationPaginationAction(
          pageNumber,
          consultationSearchValues,
          status
        )
      );
    } else {
      dispatch(getConsultationPaginationAction(pageNumber, "", status));
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
      getConsultationPaginationAction(1, consultationSearchValues, status)
    );
  };

  useEffect(() => {
    if (consultationSearchValues) {
      dispatch(
        getConsultationPaginationAction(1, consultationSearchValues, status)
      );
    } else {
      dispatch(getConsultationPaginationAction(1, "", status));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (consultationSearchValues) {
      dispatch(
        getConsultationPaginationAction(1, consultationSearchValues, status)
      );
    } else {
      dispatch(getConsultationPaginationAction(1, "", status));
    }
  }, []);

  return (
    <div className="details-page tuition-fee-page">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"CONSULTATION_SEARCH_VALUE"}
        dataSearchValues={consultationSearchValues}
        addBtn={status === "appointed" ? true : false}
        // statusType="student"
      />
      <HeadTabs
        firstRoute={"/consultation/appointed"}
        secondRoute={"/consultation/completed"}
        firstPathname={"Təyin olunmuş"}
        secondPathname={"Baş tutmuş"}
      />
      <ConsultationData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default ConsultationsPage;
