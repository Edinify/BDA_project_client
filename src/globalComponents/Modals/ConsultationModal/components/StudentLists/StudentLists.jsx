import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../../../../assets/icons/search-normal.svg";
import { getActiveStudentsAction, setLoadingAllStudentsAction } from "../../../../../redux/actions/studentsActions";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";


const StudentLists = ({
  selectedStudentName,
  updateModalState,
  setSelectedStudentName
}) => {
  const dispatch = useDispatch();
  const { loading, loadingAll, studentsByMore } = useSelector((state) => state.studentsPagination);
  const { feedbacksByTeacherData } = useSelector((state) => state.feedbacksByTeacherData);
  const { feedbackModalData } = useSelector((state) => state.feedbackModal);
  const disabledStudent = feedbackModalData?._id ? "disabled" : "";
  const [searchedValue, setSearchedValue] = useState('')
  const [studentNameOpen, setStudentNameOpen] = useState(false);
  const inputValue = selectedStudentName ? selectedStudentName.fullName : searchedValue

  const getSearchValue = (e) => {
    if(!studentNameOpen) {
      setStudentNameOpen(true)
    }
    setSearchedValue(e.target.value)
    setSelectedStudentName('')
    updateModalState("student", '');
  };
  const studentNameAddData = (item) => {
    updateModalState("student", item._id);
    setStudentNameOpen(false);
    setSelectedStudentName(item);
    setSearchedValue(item.fullName)
  };
  const searchData = (e) => {
    dispatch(setLoadingAllStudentsAction(true))
    dispatch(
      getActiveStudentsAction({
        studentsCount: 0,
        searchQuery: searchedValue ? searchedValue : "",
      })
    );
  };
  const getMoreData = () => {
    dispatch(
      getActiveStudentsAction({
        studentsCount: studentsByMore?.length ? studentsByMore?.length : 0,
        searchQuery: searchedValue ? searchedValue : "",
      })
    );
  };

  useEffect(() => {
    dispatch(getActiveStudentsAction({ studentsCount: 0, searchQuery: "" }));
  }, [dispatch]);


  return (
    <>
      <div className={`class-input ${disabledStudent}`}>
        <div className="class-field search">
          {!disabledStudent && <div className="search-icon" onClick={() => searchData()}><SearchIcon /></div>}
          <TextField
            sx={{
              "& input": {
                fontSize: "12px",
                color: disabledStudent && "#9a9a9a",
                marginLeft: disabledStudent ? '0px' : '25px',
                marginRight: "32px",
              },
              "& label": {
                paddingLeft: inputValue ? '0px' : '25px',
              },
              "& label.Mui-focused": {
                paddingLeft: '0px',
              },
              marginTop: "20px",
            }}
            InputLabelProps={{
              style: { fontSize: "12px", color: "#3F3F3F" },
            }}
            fullWidth
            label="Tələbə adı"
            name="class"
            autoComplete="off"
            value={inputValue}
            // onBlur={() => formik.setFieldTouched('whereComing', true)}
            // onClick={studentNameDropdown}
            onChange={(e) => getSearchValue(e)}
          />
          <div className="dropdown-icon" onClick={() => setStudentNameOpen(!studentNameOpen)}>
            <svg
              className={!studentNameOpen ? "down" : "up"}
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07999 9.4502"
                stroke="#5D5D5D"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <ul
          className={`create-update-modal-dropdown where-coming feedback ${
            studentNameOpen ? "active" : ""
          }`}
        >
          {loadingAll ?
          <li className="loading"><LoadingBtn /></li> :
          studentsByMore?.map((student, i) => (
            <li
              key={i}
              onClick={() => studentNameAddData(student)}
              className={
                feedbacksByTeacherData?.find(
                  (item) => item?.student === student?._id
                )
                  ? "disabled"
                  : ""
              }
            >
              <h4>{student.fullName}</h4>
            </li>
          ))}
          {!loadingAll &&
          <li>
            <button
              onClick={() => getMoreData()}
              className="more-btn"
              disabled={loading}
            >
              {loading ? "yüklənir..." : "daha cox"}
            </button>
          </li>
          }
        </ul>
      </div>
      {/* {formik.errors.whereComing && formik.touched.whereComing &&  <small className="validation-err-message">{formik.errors.whereComing}</small>} */}
    </>
  );
};

export default StudentLists;
