import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WORKER_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteWorkerAction } from "../../../redux/actions/workersActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
const WorkerCard = ({
  data,
  mode,
  worker,
  cellNumber,
  setOpenConfirmModal,
  setOpenMoreModal,
}) => {
  const dispatch = useDispatch();
  const { workers, lastPage } = useSelector((state) => state.workersPagination);
  const { workersSearchValues } = useSelector((state) => state.searchValues);

  const updateItem = (modalType) => {
    dispatch({
      type: WORKER_MODAL_ACTION_TYPE.GET_WORKER_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (workers.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = workersSearchValues;
    dispatch(deleteWorkerAction({ _id, pageNumber, searchQuery }));
  };

  const openConfirmModal = () => {
    setOpenConfirmModal(true);
    updateItem("more");
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  // console.log(worker)
  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.fin}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="email">
            <div className="td-con">
              <div className="table-scroll-text">{data.email}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data.phone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.position}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          {/* <td>
            <div className="td-con">
              <div className="table-scroll-text profiles">{profiles}</div>
              <div className="right-fade"></div>
            </div>
          </td> */}

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openConfirmModal={openConfirmModal}
              state={worker}
              openMoreModal={openMoreModal}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              <li>
                <span>Email:</span>
                <p>{data.email ? data.email : "boş"}</p>
              </li>
              <li>
                <span>Telefon nömrəsi:</span>
                <p>{data.phone ? data.phone : "boş"}</p>
              </li>
              <li>
                <span>Pozisiya:</span>
                <p>{data.position ? data.position : "boş"}</p>
              </li>
              {/* <li>
                <span>Profil:</span>
                <p className="profiles">{profiles}</p>
              </li> */}
            </ul>
          </div>
          
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openConfirmModal={openConfirmModal}
                state={worker}
                openMoreModal={openMoreModal}
              />
              {/* <div className="more-content">
                <span onClick={openMoreModal}>Ətraflı</span>
              </div> */}
            </div>
          
        </div>
      )}
    </>
  );
};

export default WorkerCard;
