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
  const { consultationStatus, courseId, whereComing } = useSelector(
    (state) => state.consultationStatus
  );
  const { startDate, endDate } = useSelector((state) => state.datepicker);
  // const status =
  //   location.pathname === "/consultation/appointed" ? "appointed" : "completed";

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
          consultationStatus,
          startDate,
          endDate,
          courseId,
          whereComing
        )
      );
    } else {
      dispatch(
        getConsultationPaginationAction(
          consultationData?.length || 0,
          "",
          consultationStatus,
          startDate,
          endDate,
          courseId,
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
        consultationStatus,
        "",
        "",
        "",
        ""
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
          consultationStatus,
          "",
          "",
          "",
          ""
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

  const consultationFilter=()=>{
    dispatch({type:CONSULTATION_ALL_ACTIONS_TYPE.RESET_CONSULTATION_PAGINATION})
    dispatch(getConsultationPaginationAction(0,consultationSearchValues,consultationStatus,startDate,endDate,courseId,whereComing))
  }

  return (
    <div className="details-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"CONSULTATION_SEARCH_VALUE"}
        dataSearchValues={consultationSearchValues}
        filter={consultationFilter}
        // addBtn={status === "appointed" ? true : false}
        statusType="consultation"
        profile={"consultation"}
        count={totalLength}
      />

      {/* <HeadTabs
        firstRoute={"/consultation/appointed"}
        secondRoute={"/consultation/completed"}
        firstPathname={"Təyin olunmuş"}
        secondPathname={"Baş tutmuş"}
      /> */}

      <ConsultationData
        getNextConsultation={getNextConsultation}
        userData={userData}
      />
    </div>
  );
};

export default ConsultationsPage;
