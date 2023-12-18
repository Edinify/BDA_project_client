import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownName } from "../../../globalComponents/DropdownName/DropdownName";
import { copyMainToCurrent } from "../../../redux/actions/currentLessonsDataAction";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";

const TableHead = () => {
  const dispatch = useDispatch();
  const { changeTableType } = useCustomHook();
  const { tableType } = useSelector((state) => state.tableType);
  const { copyMainToCurrentButton } = useSelector((state) => state.currentLessonsData);


  return (
    <div className="table-select-container">
      <div className="left-side">
        <div className="table-dropdown">
          <DropdownName type="teacher" />
        </div>

        <div className="table-select">
          <ul>
            <li>
              <Link
                className={tableType === "main" ? "active" : "none"}
                onClick={() => changeTableType("main")}
              >
                Əsas cədvəl
              </Link>
            </li>
            <li>
              <Link
                className={tableType === "current" ? "active" : "none"}
                onClick={() => changeTableType("current")}
              >
                Cari cədvəl
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="right-side">
        <button
          disabled={copyMainToCurrentButton}
          className="update-close-btn"
          onClick={() => {
            dispatch(copyMainToCurrent());
          }}
        >
          Yenilə
        </button>
      </div>
    </div>
  );
};

export default TableHead;
