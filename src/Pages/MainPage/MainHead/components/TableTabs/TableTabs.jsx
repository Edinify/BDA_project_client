import React from "react";
import { Link } from "react-router-dom";

const TableTabs = ({ changeMainPageType, mainpageType }) => {
  return (
    <div className="card-head">
      <div className="container">
        <div className="head-content ">
          <ul>
            <li>
              <Link
                onClick={() => changeMainPageType("teacher")}
                to="/"
                className={mainpageType === "teacher" ? "active" : ""}
              >
                Müəllim
              </Link>
            </li>

            <li>
              <Link
                onClick={() => changeMainPageType("student")}
                to="/student"
                className={mainpageType === "student" ? "active" : ""}
              >
                Tələbə
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TableTabs;
