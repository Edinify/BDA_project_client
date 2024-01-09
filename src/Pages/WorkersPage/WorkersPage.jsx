import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkersPaginationAction } from "../../redux/actions/workersActions";
import { WORKER_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import WorkersData from "./components/WorkersData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const WorkersPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.workersPagination);
  const { workersSearchValues } = useSelector((state) => state.searchValues);
  let userData = JSON.parse(localStorage.getItem("userData"));
  userData = userData.role !== "super-admin" ? userData.profiles :JSON.parse(localStorage.getItem("userData")) 


  const getPageNumber = (pageNumber) => {
    if (workersSearchValues) {
      dispatch(getWorkersPaginationAction(pageNumber, workersSearchValues));
    } else {
      dispatch(getWorkersPaginationAction(pageNumber, ""));
    }
  };
  const openModal = () => {
    dispatch({
      type: WORKER_MODAL_ACTION_TYPE.GET_WORKER_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getWorkersPaginationAction(1, workersSearchValues));
  };

  useEffect(() => {
    if (workersSearchValues) {
      dispatch(getWorkersPaginationAction(1, workersSearchValues));
    } else {
      dispatch(getWorkersPaginationAction(1, ""));
    }
  }, []);


  return (
    <div className="details-page teachers-page ">
      {
        userData?.role === "super-admin" ?
         <>
            <GlobalHead
              searchData={searchData}
              openModal={openModal}
              DATA_SEARCH_VALUE={"WORKERS_SEARCH_VALUE"}
              dataSearchValues={workersSearchValues}
            />
         </> :
         <>
         {
              userData.map((data,i) =>{
                const {profile,power} = data

                return(
                  profile === "workers" && power === "all" &&  (
                    <span key={i}>
                      <GlobalHead
                        searchData={searchData}
                        openModal={openModal}
                        DATA_SEARCH_VALUE={"WORKERS_SEARCH_VALUE"}
                        dataSearchValues={workersSearchValues}
                      />
                    </span>
                  )
                )
              })
            }
         </>
      }

      {
        userData?.role === "super-admin" ?
         <>
            <WorkersData userData={userData} pageNum={lastPage} getPageNumber={getPageNumber} />
         </> :
         <>
         {
              userData.map((data,i) =>{
                const {profile,power} = data

                return(
                  profile === "workers" &&  (
                    <span key={i}>
                      <WorkersData userData={data} Data={data} pageNum={lastPage} getPageNumber={getPageNumber} />
                    </span>
                  )
                )
              })
            }
         </>
      }
    </div>
  );
};

export default WorkersPage;
