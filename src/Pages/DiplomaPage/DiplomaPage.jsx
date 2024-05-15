import React from 'react'
import GlobalHead from '../../globalComponents/GlobalHead/GlobalHead'
import DiplomaData from './components/DiplomaData'

const DiplomaPage = () => {
  return (
    <div className="details-page diploma-page " >
    <GlobalHead
    // searchData={searchData}
    // openModal={openModal}
    // DATA_SEARCH_VALUE={"CAREER_SEARCH_VALUE"}
    // dataSearchValues={careerSearchValues}
    addBtn={false}
    // profile="career"
    // statusType="career"
    // filter={careerFilter}
  />
  <DiplomaData/>
</div>
  )
}

export default DiplomaPage