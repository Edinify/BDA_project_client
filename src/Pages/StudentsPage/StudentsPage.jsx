import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsPaginationAction } from "../../redux/actions/studentsActions";
import {
  STUDENTS_ALL_ACTIONS_TYPE,
  STUDENTS_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
import StudentsData from "./components/StudentsData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { lastPage, students, totalLength } = useSelector(
    (state) => state.studentsPagination
  );
  const { studentSearchValues } = useSelector((state) => state.searchValues);
  const { studentStatus, courseId } = useSelector(
    (state) => state.studentStatus
  );
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const [studentPageNum, setStudentPageNum] = useState(1);

  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  const studentFilter = () => {
    dispatch({ type: STUDENTS_ALL_ACTIONS_TYPE.RESET_STUDENT_PAGINATION });

    dispatch(
      getStudentsPaginationAction(
        0,
        studentSearchValues,
        studentStatus
          ? studentStatus !== "all"
            ? studentStatus
            : "all"
          : "all",
        courseId,
        selectedGroup._id
      )
    );
  };

  const getPageNumber = (pageNumber) => {
    setStudentPageNum(pageNumber);
    if (studentSearchValues) {
      dispatch(
        getStudentsPaginationAction(
          pageNumber,
          studentSearchValues,
          studentStatus ? studentStatus : "all",
          courseId,
          selectedGroup._id
        )
      );
    } else {
      dispatch(
        getStudentsPaginationAction(
          pageNumber,
          "",
          studentStatus ? studentStatus : "all",
          courseId,
          selectedGroup._id
        )
      );
    }
  };

  const getNextStudents = () => {
    if (studentSearchValues) {
      dispatch(
        getStudentsPaginationAction(
          students?.length || 0,
          studentSearchValues,
          studentStatus ? studentStatus : "all",
          courseId,
          selectedGroup._id
        )
      );
    } else {
      dispatch(
        getStudentsPaginationAction(
          students?.length || 0,
          "",
          studentStatus ? studentStatus : "all",
          courseId,
          selectedGroup._id
        )
      );
    }
  };

  const openModal = () => {
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();

    dispatch({ type: STUDENTS_ALL_ACTIONS_TYPE.RESET_STUDENT_PAGINATION });

    dispatch(
      getStudentsPaginationAction(
        0,
        studentSearchValues,
        studentStatus
          ? studentStatus !== "all"
            ? studentStatus
            : "all"
          : "all",
        courseId,
        selectedGroup._id
      )
    );
    setStudentPageNum(1);
  };

  useEffect(() => {
    if (lastPage) {
      setStudentPageNum(lastPage);
    }
  }, [lastPage]);

  useEffect(() => {
    if (studentStatus) {
      getPageNumber(1);
    }
  }, [studentStatus]);

  useEffect(() => {
    if (studentSearchValues) {
      dispatch(
        getStudentsPaginationAction(0, studentSearchValues, "all", "", "")
      );
    } else {
      dispatch(getStudentsPaginationAction(0, "", "", "", ""));
    }

    return () => {
      dispatch({
        type: STUDENTS_ALL_ACTIONS_TYPE.RESET_STUDENT_PAGINATION,
      });
    };
  }, [dispatch]);

  // console.log(lastPage, "last page in student");
  return (
    <div className="details-page students-page">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        filter={studentFilter}
        DATA_SEARCH_VALUE={"STUDENTS_SEARCH_VALUE"}
        dataSearchValues={studentSearchValues}
        statusType="student"
        profile="students"
        count={totalLength}
      />

      <StudentsData
        studentPageNum={studentPageNum}
        getPageNumber={getPageNumber}
        getNextStudents={getNextStudents}
        userData={userData}
      />
    </div>
  );
};

export default StudentsPage;
