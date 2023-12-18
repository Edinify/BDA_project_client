import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  SEARCH_VALUES_ACTION_TYPES,
} from "../../redux/actions-type";
import FeedbackHeader from "./components/FeedbackHeader/FeedbackHeader";
import FeedbackData from "./components/FeedbackData/FeedbackData";
import { getFeedbackPaginationAction } from "../../redux/actions/generalfeedbackActions";
import { useLocation } from "react-router-dom";
import { clearSearchValue } from "../../redux/actions/clearSearchValueAction";
import SearchDateFilter from "../../globalComponents/SearchDateFilter/SearchDateFilter";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const FeedbackPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { lastPage: feedbackLastPage } = useSelector(
    (state) => state.feedbackData
  );
  const { feedbackSearchValues,studentFeedbackSearchValues } = useSelector(
    (state) => state.searchValues
  );
  const [feedbackPageNum, setFeedbackPageNum] = useState(1);



  const searchFeedbackDataTeacher = (e) => {
    e.preventDefault();
    dispatch(
      getFeedbackPaginationAction(1, "", "", feedbackSearchValues, "teacher")
    );
    setFeedbackPageNum(1);
  };
  const searchFeedbackDataStudent = (e) => {
    e.preventDefault();
    dispatch(
      getFeedbackPaginationAction(
        1,
        "",
        "",
        studentFeedbackSearchValues,
        "student"
      )
    );
    setFeedbackPageNum(1);
  };
  const applyFeedbackFilterTeacher = () => {
    dispatch(
      getFeedbackPaginationAction(
        1,
        startDate,
        endDate,
        feedbackSearchValues,
        "teacher"
      )
    );
  };
  const applyFeedbackFilterStudent = () => {
    dispatch(
      getFeedbackPaginationAction(
        1,
        startDate,
        endDate,
        studentFeedbackSearchValues,
        "student"
      )
    );
  };
  const getPageNumberTeacher = (pageNumber) => {
    setFeedbackPageNum(pageNumber);
    dispatch(
      getFeedbackPaginationAction(
        pageNumber,
        startDate ? startDate : "",
        endDate ? endDate : "",
        feedbackSearchValues ? feedbackSearchValues : "",
        "teacher"
      )
    );
  };
  const getPageNumberStudent = (pageNumber) => {
    setFeedbackPageNum(pageNumber);
    dispatch(
      getFeedbackPaginationAction(
        pageNumber,
        startDate ? startDate : "",
        endDate ? endDate : "",
        studentFeedbackSearchValues ? studentFeedbackSearchValues : "",
        "student"
      )
    );
  };
  const changeSearchValue = (e) => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.FEEDBACK_SEARCH_VALUE,
      payload: e.target.value,
    });
  };

  const changeStudentSearchValue = (e) => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.STUDENT_FEEDBACK_SEARCH_VALUE,
      payload: e.target.value,
    });
  };
  const clearAll = () => {
    setFeedbackPageNum(1);

    dispatch(clearSearchValue());

    if (location.pathname === "/feedback/teacher") {
      dispatch(getFeedbackPaginationAction(1, "", "", "", "teacher"));
    } else {
      dispatch(getFeedbackPaginationAction(1, "", "", "", "student"));
    }
  };

  useEffect(() => {
    if (feedbackLastPage) {
      setFeedbackPageNum(feedbackLastPage);
    }
  }, [feedbackLastPage]);

  useEffect(() => {
    clearAll();
  }, [location.pathname]);


  return (
    <div className="details-page feedback-page">
      <FeedbackHeader />
      {location.pathname === "/feedback/teacher" && (
        <SearchDateFilter
          className="feedback-head"
          clearAll={clearAll}
          applyFilter={applyFeedbackFilterTeacher}
          changeSearchValue={changeSearchValue}
          searchValue={feedbackSearchValues}
          searchData={searchFeedbackDataTeacher}
          color="gray"
        />
     ) }
     {location.pathname === "/feedback/student" && (
        <SearchDateFilter
          className="feedback-head"
          clearAll={clearAll}
          applyFilter={applyFeedbackFilterStudent}
          changeSearchValue={changeStudentSearchValue}
          searchValue={studentFeedbackSearchValues}
          searchData={searchFeedbackDataStudent}
          color="gray"
        />
     )}
      <FeedbackData
        feedbackPageNum={feedbackPageNum}
        getPageNumberTeacher={getPageNumberTeacher}
        getPageNumberStudent={getPageNumberStudent}
      />
    </div>
  );
};

export default FeedbackPage;
