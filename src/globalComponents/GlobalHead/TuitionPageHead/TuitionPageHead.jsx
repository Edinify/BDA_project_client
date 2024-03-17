import React from 'react'
import PaymentResult from '../PaymentResult/PaymentResult'
import Search from '../Search/Search'
import { CoursesDropdown } from '../CoursesDropdown/CoursesDropdown'
import { GroupsDropdown } from '../GroupsDropdown/GroupsDropdown'
import { PaymentStatusDropdown } from '../PaymentStatusDropdown/PaymentStatusDropdown'

const TuitionPageHead = ({search,filter,searchData,dataSearchValues,DATA_SEARCH_VALUE}) => {
  return (
    <div className="tuition-fee-container">
                  <div className="tuition-fee-payment-container">
                    <PaymentResult />
                  </div>
                  <div className="tution-fee-filter-header">
                    {search && (
                      <Search
                        searchData={searchData}
                        dataSearchValues={dataSearchValues}
                        className="search-input-con desktop"
                        DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                      />
                    )}
                    <CoursesDropdown deviceType="desktop" />
                    <GroupsDropdown deviceType="desktop" />
                    <PaymentStatusDropdown
                      deviceType="desktop"
                      statusType="tution-fee"
                    />
                    <div className="lesson-table-btn-container tution ">
                      <button className="add-detail" onClick={() => filter()}>
                        Tətbiq et
                      </button>
                    </div>
                  </div>
                </div>
  )
}

export default TuitionPageHead