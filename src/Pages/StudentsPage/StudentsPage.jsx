import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsPaginationAction } from "../../redux/actions/studentsActions";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import StudentsData from "./components/StudentsData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.studentsPagination);
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
    dispatch(
      getStudentsPaginationAction(
        1,
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
  const openModal = () => {
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    console.log(e)
    dispatch(
      getStudentsPaginationAction(
        1,
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
      dispatch(getStudentsPaginationAction(1, studentSearchValues, "all",'',
      ''));
    } else {
      dispatch(getStudentsPaginationAction(1, "", "",'',
      ''));
    }
  }, [dispatch]);

  return (
    <div className="details-page students-page">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        filter={studentFilter}
        DATA_SEARCH_VALUE={"STUDENTS_SEARCH_VALUE"}
        dataSearchValues={studentSearchValues}
        statusType="student"
      />

      <StudentsData
        studentPageNum={studentPageNum}
        getPageNumber={getPageNumber}
        userData={userData}
      />
    </div>
  );
};

export default StudentsPage;
