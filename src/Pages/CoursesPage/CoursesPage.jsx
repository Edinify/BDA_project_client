import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COURSES_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import { getCoursesPaginationAction } from "../../redux/actions/coursesActions";
import CoursesData from "./components/CoursesData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const CoursePage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.coursesPagination);
  const { coursesSearchValues } = useSelector((state) => state.searchValues);
  const [coursePageNum, setCoursePageNum] = useState(1);
  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  const openModal = () => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const getPageNumber = (pageNumber) => {
    setCoursePageNum(pageNumber);
    if (coursesSearchValues) {
      dispatch(getCoursesPaginationAction(pageNumber, coursesSearchValues));
    } else {
      dispatch(getCoursesPaginationAction(pageNumber, ""));
    }
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getCoursesPaginationAction(1, coursesSearchValues));
    setCoursePageNum(1);
  };

  useEffect(() => {
    if (coursesSearchValues) {
      dispatch(getCoursesPaginationAction(1, coursesSearchValues));
    } else {
      dispatch(getCoursesPaginationAction(1, ""));
    }
  }, []);

  useEffect(() => {
    if (lastPage) {
      setCoursePageNum(lastPage);
    }
  }, [lastPage]);

  return (
    <div className="details-page courses ">
      {userData?.role === "super-admin" ? (
        <>
          <GlobalHead
            searchData={searchData}
            openModal={openModal}
            DATA_SEARCH_VALUE={"COURSES_SEARCH_VALUE"}
            dataSearchValues={coursesSearchValues}
          />
        </>
      ) : (
        <>
          {userData.map((data, i) => {
            const { profile, power } = data;

            return profile === "courses" && power === "all" ? (
              <span key={i}>
                <GlobalHead
                  searchData={searchData}
                  openModal={openModal}
                  DATA_SEARCH_VALUE={"COURSES_SEARCH_VALUE"}
                  dataSearchValues={coursesSearchValues}
                />
              </span>
            ) : (
              ""
            );
          })}
        </>
      )}

      {userData?.role === "super-admin" ? (
        <>
          <CoursesData
            userData={userData}
            pageNum={lastPage}
            getPageNumber={getPageNumber}
          />
        </>
      ) : (
        <>
          {userData?.map((data, i) => {
            const { profile, power } = data;

            return (
              profile === "courses" && (
                <span key={i}>
                  <CoursesData
                    userData={data}
                    coursePageNum={coursePageNum}
                    getPageNumber={getPageNumber}
                  />
                </span>
              )
            );
          })}
        </>
      )}
      {/* <GlobalHead 
      searchData={searchData} 
      openModal={openModal} 
      DATA_SEARCH_VALUE={'COURSES_SEARCH_VALUE'} 
      dataSearchValues={coursesSearchValues}
      statusType="courses"
      />
      <CoursesData coursePageNum={coursePageNum} getPageNumber={getPageNumber} /> */}
    </div>
  );
};

export default CoursePage;
