import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsPaginationAction } from "../../redux/actions/groupsActions";
import { GROUP_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import GroupsData from "./components/GroupsData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.groupsPagination);
  const { groupsSearchValues } = useSelector((state) => state.searchValues);

  const getPageNumber = (pageNumber) => {
    if (groupsSearchValues) {
      dispatch(getGroupsPaginationAction(pageNumber, groupsSearchValues));
    } else {
      dispatch(getGroupsPaginationAction(pageNumber, ""));
    }
  };
  const openModal = () => {
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getGroupsPaginationAction(1, groupsSearchValues));
  };

  useEffect(() => {
    if (groupsSearchValues) {
      dispatch(getGroupsPaginationAction(1, groupsSearchValues));
    } else {
      dispatch(getGroupsPaginationAction(1, ""));
    }
  }, []);
  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"GROUPS_SEARCH_VALUE"}
        dataSearchValues={groupsSearchValues}
      />
      <GroupsData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default GroupsPage;
