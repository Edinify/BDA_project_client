import React from "react";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import ExcelExportBtn from "../../../globalComponents/ExcelExportBtn/ExcelExportBtn";
import { ReactComponent as PlusIcon } from "../../../assets/icons/Plus.svg";
import Search from "../Search/Search";
import ConsultationStatusDropdown from "./ConsultationStatusDropdown/ConsultationStatusDropdown";
import { DatePick } from "../../DatePicker/DatePicker";
import WhereComingDropdown from "./WhereComingDropdown/WhereComingDropdown";

const ConsultationPageHead = ({
  openModal,
  search,
  filter,
  searchData,
  dataSearchValues,
  DATA_SEARCH_VALUE,
  count,
}) => {
  return (
    <div className="consultation-header-filter-container">
      <div className="teahcer-page-add-btn">
        <button className="add-detail" onClick={openModal}>
          <PlusIcon />
          Əlavə et
        </button>
      </div>
      <div className="consultation-header-filter">
        <div className="consultation-top-filter">
          {search && (
            <Search
              searchData={searchData}
              dataSearchValues={dataSearchValues}
              className="search-input-con desktop"
              DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
            />
          )}
          <CoursesDropdown deviceType="desktop" />
          <ConsultationStatusDropdown deviceType="desktop" />
          <WhereComingDropdown deviceType="desktop" />
        </div>
        <div className="consultation-bottom-filter">
          
            <DatePick deviceType="desktop" />
          

          <div className="lesson-table-btn-container teacher ">
            <button className="add-detail" onClick={() => filter()}>
              Tətbiq et
            </button>
          </div>
        </div>

        {/* <ExcelExportBtn pageName="student" /> */}
      </div>
    </div>
  );
};

export default ConsultationPageHead;
