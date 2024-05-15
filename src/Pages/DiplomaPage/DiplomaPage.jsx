import React, { useEffect } from "react";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import DiplomaData from "./components/DiplomaData";
import { useDispatch, useSelector } from "react-redux";
import { DIPLOMA_ALL_ACTIONS_TYPE } from "../../redux/actions-type";
import { getDiplomaPaginationAction } from "../../redux/actions/diplomaActions";

const DiplomaPage = () => {
  const dispatch = useDispatch();
  const { currentLength, loading } = useSelector(
    (state) => state.diplomaPagination
  );
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const { diplomaSearchValues } = useSelector((state) => state.searchValues);
  

  const diplomaFilter = () => {
    dispatch({ type: DIPLOMA_ALL_ACTIONS_TYPE.RESET_DIPLOMA_PAGINATION });
    dispatch(
      getDiplomaPaginationAction(0, diplomaSearchValues, selectedGroup._id ? selectedGroup._id  :"")
    );
  };

  const getNextDiplomas = () => {
    if (loading) return;
    if (diplomaSearchValues) {
      dispatch(
        getDiplomaPaginationAction(
          currentLength || 0,
          diplomaSearchValues,
          selectedGroup._id ? selectedGroup._id  :""
        )
      );
    } else {
      dispatch(
        getDiplomaPaginationAction(currentLength || 0, "", selectedGroup._id ? selectedGroup._id  :"")
      );
    }
  };

  const searchData = (e) => {
    e.preventDefault();

    dispatch({ type: DIPLOMA_ALL_ACTIONS_TYPE.RESET_DIPLOMA_PAGINATION });
    dispatch(
      getDiplomaPaginationAction(0, diplomaSearchValues, selectedGroup._id ? selectedGroup._id  :"")
    );
  };



  return (
    <div className="details-page diploma-page ">
      <GlobalHead
        searchData={searchData}
        DATA_SEARCH_VALUE={"DIPLOMA_SEARCH_VALUE"}
        dataSearchValues={diplomaSearchValues}
        addBtn={false}
        filter={diplomaFilter}
        profile="diploma"
        statusType="diploma"
      />
      {selectedGroup && <DiplomaData getNextDiplomas={getNextDiplomas} />}
    </div>
  );
};

export default DiplomaPage;
