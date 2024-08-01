import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultationPaginationAction } from "../../redux/actions/consultationsActions";
import {
  CONSULTATION_MODAL_ACTION_TYPE,
  CONSULTATION_ALL_ACTIONS_TYPE,
} from "../../redux/actions-type";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import ConsultationData from "./components/ConsultationData";
// import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";
import { useLocation } from "react-router-dom";

const ConsultationsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { totalLength, loading, consultationData } = useSelector(
    (state) => state.consultationPagination
  );
  const { consultationSearchValues } = useSelector(
    (state) => state.searchValues
  );

  const { startDate, endDate, status, course, whereComing } = useSelector(
    (state) => state.filter
  );

  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));
  // ============

  const getNextConsultation = () => {
    if (loading) return;

    if (consultationSearchValues) {
      dispatch(
        getConsultationPaginationAction(
          consultationData?.length || 0,
          consultationSearchValues,
          status,
          startDate,
          endDate,
          course?._id,
          whereComing
        )
      );
    } else {
      dispatch(
        getConsultationPaginationAction(
          consultationData?.length || 0,
          "",
          status,
          startDate,
          endDate,
          course?._id || "",
          whereComing
        )
      );
    }
  };

  // ========

  const openModal = () => {
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();

    dispatch({
      type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
    });

    dispatch(
      getConsultationPaginationAction(
        0,
        consultationSearchValues,
        status,
        startDate,
        endDate,
        course?._id || "",
        whereComing
      )
    );
  };

  useEffect(() => {
    if (consultationSearchValues) {
      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
      });
      dispatch(
        getConsultationPaginationAction(
          0,
          consultationSearchValues,
          status,
          startDate,
          endDate,
          course?._id || "",
          whereComing
        )
      );
    } else {
      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
      });
      dispatch(getConsultationPaginationAction(0, "", "", "", "", "", ""));
    }
    return () => {
      dispatch({
        type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
      });
    };
  }, [location.pathname]);

  const consultationFilter = () => {
    dispatch({
      type: CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION,
    });
    dispatch(
      getConsultationPaginationAction(
        0,
        consultationSearchValues,
        status,
        startDate,
        endDate,
        course?._id,
        whereComing
      )
    );
  };

  return (
    <div className="details-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"CONSULTATION_SEARCH_VALUE"}
        dataSearchValues={consultationSearchValues}
        filter={consultationFilter}
        statusType="consultation"
        profile={"consultation"}
        count={totalLength}
      />

      <ConsultationData
        getNextConsultation={getNextConsultation}
        userData={userData}
      />
    </div>
  );
};

export default ConsultationsPage;
