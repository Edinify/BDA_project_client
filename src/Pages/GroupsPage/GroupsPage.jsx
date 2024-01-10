import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsPaginationAction } from "../../redux/actions/groupsActions";
import { GROUP_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import GroupsData from "./components/GroupsData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";
import { useLocation } from "react-router-dom";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { lastPage } = useSelector((state) => state.groupsPagination);
  const { groupsSearchValues } = useSelector((state) => state.searchValues);
  const [completed, setCompleted] = useState(true);
  const getPageNumber = (pageNumber) => {
    if (groupsSearchValues) {
      dispatch(
        getGroupsPaginationAction(pageNumber, groupsSearchValues, completed)
      );
    } else {
      dispatch(getGroupsPaginationAction(pageNumber, "", completed));
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
    dispatch(getGroupsPaginationAction(1, groupsSearchValues, completed));
  };

  useEffect(() => {
    if (location.pathname === "/groups/current") {
      dispatch(getGroupsPaginationAction(1, groupsSearchValues || "", true));
      setCompleted(true);
    } else if (location.pathname === "/groups/waiting") {
      dispatch(getGroupsPaginationAction(1, groupsSearchValues || "", false));
      setCompleted(false);
    }
  }, [location.pathname]);

  console.log(lastPage, "last page");

  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"GROUPS_SEARCH_VALUE"}
        dataSearchValues={groupsSearchValues}
      />
      <HeadTabs
        firstRoute={"/groups/waiting"}
        secondRoute={"/groups/current"}
        firstPathname={"Yığılan qruplar"}
        secondPathname={"Mövcud qruplar"}
      />
      <GroupsData pageNum={lastPage} getPageNumber={getPageNumber} />
    </div>
  );
};

export default GroupsPage;
