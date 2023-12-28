import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../../../../../assets/icons/search-normal.svg";
import { ReactComponent as CheckIcon } from "../../../../../../assets/icons/Checkbox.svg";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  getActiveStudentsAction,
  setLoadingAllStudentsAction,
} from "../../../../../../redux/actions/studentsActions";
import LoadingBtn from "../../../../../Loading/components/LoadingBtn/LoadingBtn";
import StudentInput from "./StudentInput";

const StudentList = ({ modalData, updateModalState }) => {
  const dispatch = useDispatch();
  const { loading, loadingAll, studentsByMore } = useSelector(
    (state) => state.studentsPagination
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchedValue, setSearchedValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const inputValue = selectedItem ? selectedItem.fullName : searchedValue;

  const getSearchValue = (e) => {
    if (!openDropdown) {
      setOpenDropdown(true);
    }
    setSearchedValue(e.target.value);
    setSelectedItem("");
    updateModalState("student", "");
  };
  const addItem = () => {
    if (modalData.students) {
      // the same element can't be added twice
      if (modalData.students.find((item) => item._id === selectedItem._id)) {
      } else {
        const studentsData = [...modalData?.students, selectedItem];
        updateModalState("students", studentsData);
      }
    } else {
      const studentsData = [selectedItem];
      updateModalState("students", studentsData);
    }
    setSelectedItem("");
    setOpenDropdown(false);
  };
  const searchData = (e) => {
    dispatch(setLoadingAllStudentsAction(true));
    dispatch(
      getActiveStudentsAction({
        studentsCount: 0,
        searchQuery: searchedValue ? searchedValue : "",
        courseId: modalData?.course?._id,
      })
    );
  };
  const getMoreData = () => {
    dispatch(
      getActiveStudentsAction({
        studentsCount: studentsByMore?.length ? studentsByMore?.length : 0,
        searchQuery: searchedValue ? searchedValue : "",
        courseId: modalData?.course?._id,
      })
    );
  };
  const deleteItem = (_id) => {
    if (modalData.students.length === 1) {
      updateModalState("students", []);
    } else {
      const studentsData = modalData.students.filter(
        (student) => student._id !== _id
      );
      updateModalState("students", studentsData);
    }
  };

  useEffect(() => {
    if (modalData.course) {
      dispatch(
        getActiveStudentsAction({
          studentsCount: 0,
          searchQuery: searchedValue ? searchedValue : "",
          courseId: modalData?.course?._id,
        })
      );
    }
  }, []);

  return (
    <div>
      <div className={`dropdown-input search courses`}>
        <div className="left">
          <div className="input-box">
            <div className="search-icon" onClick={() => searchData()}>
              <SearchIcon />
            </div>
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginLeft: "25px",
                  marginRight: "32px",
                },
                "& label": {
                  paddingLeft: inputValue ? "0px" : "25px",
                },
                "& label.Mui-focused": {
                  paddingLeft: "0px",
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
              onChange={(e) => getSearchValue(e)}
            />
            <div
              className="dropdown-icon"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <svg
                className={!openDropdown ? "down" : "up"}
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
          <ul className={`dropdown-body  ${openDropdown ? "active" : ""}`}>
            {loadingAll ? (
              <li className="loading">
                <LoadingBtn />
              </li>
            ) : (
              studentsByMore?.map((item, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  className={
                    modalData.items?.find(
                      (item) => item?.item._id === item?._id
                    )
                      ? "disabled"
                      : ""
                  }
                >
                  {modalData?.students?.find((obj) => obj._id === item._id) ? (
                    <CheckIcon />
                  ) : null}
                  <h4>{item.fullName}</h4>
                </li>
              ))
            )}
            {!loadingAll && (
              <li>
                <button
                  onClick={() => modalData.course && getMoreData()}
                  className="more-btn"
                  disabled={loading}
                >
                  {loading ? "yüklənir..." : "daha cox"}
                </button>
              </li>
            )}
          </ul>
        </div>

        <div className="right">
          <button
            disabled={!selectedItem}
            onClick={() => addItem()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>

      <ul className="category-list courses-li">
        {modalData?.students?.map((item, index) => (
          <StudentInput
            key={index}
            index={index}
            data={item}
            deleteItem={deleteItem}
            modalData={modalData}
            updateModalState={updateModalState}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
