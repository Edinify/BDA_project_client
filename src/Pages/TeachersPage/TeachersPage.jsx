import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeachersPaginationAction } from "../../redux/actions/teachersActions";
import { TEACHERS_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import TeachersData from "./components/TeachersData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";
import { useLocation } from "react-router-dom";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { lastPage } = useSelector((state) => state.teachersPagination);
  const { teachersSearchValues } = useSelector((state) => state.searchValues);
  const { teacherStatus } = useSelector((state) => state.teacherStatus);
  const [teacherPageNum, setTeacherPageNum] = useState(1);
  const [role, setRole] = useState("teacher");

  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  const getPageNumber = (pageNumber) => {
    setTeacherPageNum(pageNumber);
    if (teachersSearchValues) {
      dispatch(
        getTeachersPaginationAction(
          pageNumber,
          teachersSearchValues,
          teacherStatus
            ? teacherStatus !== "all"
              ? teacherStatus
              : "all"
            : "all",
          role
        )
      );
    } else {
      dispatch(
        getTeachersPaginationAction(
          pageNumber,
          "",
          teacherStatus
            ? teacherStatus !== "all"
              ? teacherStatus
              : "all"
            : "all",
          role
        )
      );
    }
  };
  const openModal = () => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(
      getTeachersPaginationAction(
        1,
        teachersSearchValues,
        teacherStatus
          ? teacherStatus !== "all"
            ? teacherStatus
            : "all"
          : "all",
        role
      )
    );
    setTeacherPageNum(1);
  };

  useEffect(() => {
    if (lastPage) {
      setTeacherPageNum(lastPage);
    }
  }, [lastPage]);
  useEffect(() => {
    if (teacherStatus) {
      getPageNumber(1);
    }
  }, [teacherStatus]);

  // useEffect(() => {
  //   if (teachersSearchValues) {
  //     dispatch(getTeachersPaginationAction(1, teachersSearchValues, "all"));
  //   } else {
  //     dispatch(getTeachersPaginationAction(1, "", "all"));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/teachers") {
      dispatch(
        getTeachersPaginationAction(
          1,
          teachersSearchValues || "",
          "all",
          "teacher"
        )
      );
      setRole("teacher");
    } else if (location.pathname === "/teachers/mentors") {
      dispatch(
        getTeachersPaginationAction(
          1,
          teachersSearchValues || "",
          "all",
          "mentor"
        )
      );
      setRole("mentor");
    }
  }, [location.pathname]);

  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"TEACHERS_SEARCH_VALUE"}
        dataSearchValues={teachersSearchValues}
        statusType="teacher"
        profile={"teachers"}
      />

      <HeadTabs
        firstRoute={"/teachers"}
        secondRoute={"/teachers/mentors"}
        firstPathname={"Müəllimlər"}
        secondPathname={"Tyutorlar"}
      />

      <TeachersData
        teacherPageNum={teacherPageNum}
        getPageNumber={getPageNumber}
        userData={userData}
      />
    </div>
  );
};

export default TeachersPage;
