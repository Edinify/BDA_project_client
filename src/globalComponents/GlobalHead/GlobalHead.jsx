import React, { useEffect, useState } from "react";
import "./globalHead.css";
import { ReactComponent as PlusIcon } from "../../assets/icons/Plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { StatusDropdown } from "./StatusDropdown/StatusDropdown";
import Search from "./Search/Search";
import { CoursesDropdown } from "./CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "./GroupsDropdown/GroupsDropdown";
import { DatePick } from "../../globalComponents/DatePicker/DatePicker";
import { TeachersDropdown } from "./TeachersDropdown/TeachersDropdown";
import { ReactComponent as HalfCircleICon } from "../../assets/icons/filter/half-circle-svgrepo-com.svg";

const GlobalHead = ({
  searchData,
  openModal,
  DATA_SEARCH_VALUE,
  dataSearchValues,
  statusType,
  search = true,
  addBtn = true,
  profile,
}) => {
  const { user } = useSelector((state) => state.user);
  const [showAddBtn, setShowAddBtn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user.role === "super-admin") {
      console.log(2);
      setShowAddBtn(true);
    } else if (user.role === "worker") {
      const checkPower =
        user?.profiles?.find((item) => item.profile === profile)?.power ===
        "all";
      setShowAddBtn(checkPower);
    }
  }, []);

  return (
    <div className="details-header">
      <div className="container">
        <div className="details-header-container">
          <div
            className={`details-header-content ${
              location.pathname === "/"
                ? "lesson-page"
                : location.pathname === "/teachers"
                ? "teacher"
                : ""
            }`}
          >
            <div className="details-header-content-left">
              {location.pathname==="/teachers" ? null :
              search && (
                <Search
                  searchData={searchData}
                  dataSearchValues={dataSearchValues}
                  className="search-input-con desktop"
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                />
              )
}

              {statusType === "teacher" && (
                <div className="teacher-header-filter-container">
                  <div className="teahcer-page-add-btn">
                    <button className="add-detail" onClick={openModal}>
                      <PlusIcon />
                      Əlavə et
                    </button>
                  </div>
                  <div className="teacher-header-filter">
                  {search && (
                <Search
                  searchData={searchData}
                  dataSearchValues={dataSearchValues}
                  className="search-input-con desktop"
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                />
              )}
                    <StatusDropdown statusType="teacher" deviceType="desktop" />
                    <CoursesDropdown deviceType="desktop" />
                    <GroupsDropdown deviceType="desktop" />

                    <div className="lesson-table-btn-container teacher ">
                      <button className="add-detail">Tətbiq et</button>
                    </div>
                    <div className="circle-icon">
                      <p className="filter-count">10</p>
                      <HalfCircleICon />
                    </div>
                  </div>
                </div>
              )}
              {/* {statusType === "student" && (
                <StatusDropdown statusType="student" deviceType="desktop" />
              )} */}
              {statusType === "syllabus" && (
                <CoursesDropdown deviceType="desktop" />
              )}
              {statusType === "student" && (
                <div className="student-filter-header">
                  <CoursesDropdown deviceType="desktop" />
                  <GroupsDropdown deviceType="desktop" />
                  <div className="lesson-table-btn-container student ">
                    <button className="add-detail">Tətbiq et</button>
                  </div>
                  <div className="circle-icon">
                    <p className="filter-count">10</p>
                    <HalfCircleICon />
                  </div>
                </div>

                // <StatusDropdown statusType="student" deviceType="mobile" />
              )}
              {statusType === "groups" && (
                <div className="groups-filter-header">
                  <CoursesDropdown deviceType="desktop" />
                  <TeachersDropdown deviceType="desktop" />
                  <div className="lesson-table-btn-container groups ">
                    <button className="add-detail">Tətbiq et</button>
                  </div>
                  <div className="circle-icon">
                    <p className="filter-count">10</p>
                    <HalfCircleICon />
                  </div>
                </div>
              )}

              {statusType === "tutionFee" && (
                <div className="tution-fee-filter-header">
                  <CoursesDropdown deviceType="desktop" />
                  <GroupsDropdown deviceType="desktop" />
                  <div className="lesson-table-btn-container tution ">
                    <button className="add-detail">Tətbiq et</button>
                  </div>
                  <div className="circle-icon">
                    <p className="filter-count">10</p>
                    <HalfCircleICon />
                  </div>
                </div>
              )}
              {statusType === "lesson-table" && (
                <div className="lesson-page-header-container">
                  <div className="lesson-page-add-btn">
                    <button className="add-detail" onClick={openModal}>
                      <PlusIcon />
                      Əlavə et
                    </button>
                  </div>
                  <div className="lesson-page-filter-container">
                    <div className="lesson-table-header-content">
                      <div className="lesson-table-status">
                        <GroupsDropdown deviceType="desktop" />
                        <StatusDropdown
                          statusType="lesson-table"
                          deviceType="desktop"
                        />
                      </div>
                      <div className="lesson-table-datepick">
                        <DatePick deviceType="desktop" />
                      </div>
                    </div>
                    <div className="lesson-page-apply-btn">
                      <div className="lesson-table-btn-container lesson-page ">
                        <button className="add-detail">Tətbiq et</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {addBtn && showAddBtn && (
              <div className="lesson-table-add-btn">
                {statusType === "lesson-table" &&
                  null
                  // <button className="add-detail" onClick={openModal}>
                  //   <PlusIcon />
                  //   Əlavə et
                  // </button>
                  // <div className="lesson-table-btn-container desktop ">
                  //   <button className="add-detail">Tətbiq et</button>
                  // </div>
                }
                {statusType === "teacher" && null}
                {statusType !== "lesson-table" && statusType !== "teacher" && (
                  <button className="add-detail" onClick={openModal}>
                    <PlusIcon />
                    Əlavə et
                  </button>
                )}
              </div>
            )}
          </div>
          {statusType === "teacher" && (
            <StatusDropdown statusType="teacher" deviceType="mobile" />
          )}

          {statusType === "syllabus" && <CoursesDropdown deviceType="mobile" />}
          {statusType === "lesson-table" && (
            <GroupsDropdown deviceType="mobile" />
          )}
        </div>
        {/* {statusType === "lesson-table" && (
          <div className="apply-btn">
            <button className="add-detail" onClick={openModal}>
              Əlavə et
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default GlobalHead;
