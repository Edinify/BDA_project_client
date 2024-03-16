import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsPaginationAction } from "../../redux/actions/groupsActions";
import { GROUP_MODAL_ACTION_TYPE,GROUP_ALL_ACTIONS_TYPE } from "../../redux/actions-type";
import GroupsData from "./components/GroupsData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";
import { useLocation } from "react-router-dom";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { lastPage,groupData } = useSelector((state) => state.groupsPagination);
  const { groupsSearchValues } = useSelector((state) => state.searchValues);
  const {courseId } = useSelector((state) => state.studentStatus);
  const { selectedTeacher } = useSelector((state) => state.dropdownTeacher);
  const [status, setStatus] = useState("waiting");
  // console.log(selectedTeacher)
  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  
    const filterGroup = () => dispatch(
      getGroupsPaginationAction(
        1,
        groupsSearchValues, 
        status,
        courseId,
        selectedTeacher._id
      )
    )   
  // ============

  const getNextTeachers = () => {
    if (groupsSearchValues) {
      dispatch(
        getGroupsPaginationAction(groupData?.length || 0, groupsSearchValues, status,'','')
      );
    } else {
      dispatch(getGroupsPaginationAction(groupData?.length || 0, "", status,'',''));
    }
  };

  // ========

  const openModal = () => {
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getGroupsPaginationAction(0, groupsSearchValues, status,'',''));
  };

  useEffect(() => {
    if (location.pathname === "/groups/current") {
      dispatch(getGroupsPaginationAction(0, groupsSearchValues || "", "current",'',''));
      setStatus("current");
    } else if (location.pathname === "/groups/waiting") {
      dispatch(getGroupsPaginationAction(0, groupsSearchValues || "", "waiting",'',''));
      setStatus("waiting");
    }
    else if (location.pathname==="/groups/ended"){
      dispatch(getGroupsPaginationAction(0, groupsSearchValues || "", "ended",'',''));
      setStatus("ended");
    }

    return () => {
      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.RESET_GROUP_PAGINATION,
      });
    };
  }, [location.pathname]);

  return (
    <div className="details-page groups-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        filter={filterGroup}
        DATA_SEARCH_VALUE={"GROUPS_SEARCH_VALUE"}
        dataSearchValues={groupsSearchValues}
        profile={"groups"}
        statusType="groups"
      />

      <HeadTabs
        firstRoute={"/groups/waiting"}
        secondRoute={"/groups/current"}
        thirdRoute={"/groups/ended"}
        firstPathname={"Yığılan qruplar"}
        secondPathname={"Mövcud qruplar"}
        thirdPathname={"Bitmiş qruplar"}
      />

      <GroupsData
        pageNum={lastPage}
        getNextTeachers={getNextTeachers}
        userData={userData}
      />
    </div>
  );
};

export default GroupsPage;
