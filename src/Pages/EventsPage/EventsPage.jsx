import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EVENTS_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";
import EventsData from "./components/EventsData";
import { getEventsPaginationAction } from "../../redux/actions/eventsActions";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.eventsPagination);
  const { eventsSearchValues } = useSelector((state) => state.searchValues);
  const [eventPageNum, setEventPageNum] = useState(1);
  const { user } = useSelector((state) => state.user);

  const openModal = () => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
      payload: { data: { status: false }, openModal: true },
    });
  };
  const getPageNumber = (pageNumber) => {
    setEventPageNum(pageNumber);
    if (eventsSearchValues) {
      dispatch(getEventsPaginationAction(pageNumber, eventsSearchValues));
    } else {
      dispatch(getEventsPaginationAction(pageNumber, ""));
    }
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getEventsPaginationAction(1, eventsSearchValues));
    setEventPageNum(1);
  };

  useEffect(() => {
    if (eventsSearchValues) {
      dispatch(getEventsPaginationAction(1, eventsSearchValues));
    } else {
      dispatch(getEventsPaginationAction(1, ""));
    }
  }, []);

  useEffect(() => {
    if (lastPage) {
      setEventPageNum(lastPage);
    }
  }, [lastPage]);

  return (
    <div className="details-page courses ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"EVENTS_SEARCH_VALUE"}
        dataSearchValues={eventsSearchValues}
        profile="events"
      />

      <EventsData
        userData={user}
        pageNum={lastPage}
        eventPageNum={eventPageNum}
        getPageNumber={getPageNumber}
      />

      {/* <GlobalHead 
      searchData={searchData} 
      openModal={openModal} 
      DATA_SEARCH_VALUE={'COURSES_SEARCH_VALUE'} 
      dataSearchValues={coursesSearchValues}
      statusType="courses"
      />
      <CoursesData coursePageNum={coursePageNum} getPageNumber={getPageNumber} /> */}
    </div>
  );
};

export default EventsPage;
