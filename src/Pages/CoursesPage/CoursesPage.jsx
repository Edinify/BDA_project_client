import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COURSES_MODAL_ACTION_TYPE,COURSES_ALL_ACTIONS_TYPE } from "../../redux/actions-type";
import { getCoursesPaginationAction } from "../../redux/actions/coursesActions";
import CoursesData from "./components/CoursesData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";

const CoursePage = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.coursesPagination);
  const { coursesSearchValues } = useSelector((state) => state.searchValues);
  const [coursePageNum, setCoursePageNum] = useState(1);
  const { user } = useSelector((state) => state.user);

  const openModal = () => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const getPageNumber = (pageNumber) => {
    setCoursePageNum(pageNumber);
    if (coursesSearchValues) {
      dispatch(getCoursesPaginationAction(0, coursesSearchValues));
    } else {
      dispatch(getCoursesPaginationAction(0, ""));
    }
  };

    // ============

  const getNextCourse = () => {
    if (coursesSearchValues) {
      dispatch(
        getCoursesPaginationAction(courses?.length || 0, coursesSearchValues)
      );
    } else {
      dispatch(
        getCoursesPaginationAction(courses?.length || 0, "")
      );
    }
  };

  // ========

  const searchData = (e) => {
    e.preventDefault();
    dispatch({
      type: COURSES_ALL_ACTIONS_TYPE.RESET_COURSES_PAGINATION,
    });
    dispatch(getCoursesPaginationAction(0, coursesSearchValues));
    setCoursePageNum(1);
  };

  useEffect(() => {
    if (coursesSearchValues) {
      dispatch(getCoursesPaginationAction(0, coursesSearchValues));
    } else {
      dispatch(getCoursesPaginationAction(0, ""));
    }

    return () =>{
      dispatch({
        type: COURSES_ALL_ACTIONS_TYPE.RESET_COURSES_PAGINATION,
      });
    }

  }, []);

  return (
    <div className="details-page courses ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"COURSES_SEARCH_VALUE"}
        dataSearchValues={coursesSearchValues}
        profile="courses"
      />

      <HeadTabs
        firstRoute={"/teachers"}
        secondRoute={"/teachers/mentors"}
        firstPathname={"Müəllimlər"}
        secondPathname={"Tyutorlar"}
      />

      <CoursesData
        userData={user}
        getNextCourse={getNextCourse}
        coursePageNum={coursePageNum}
      />
    </div>
  );
};

export default CoursePage;
