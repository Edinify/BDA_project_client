import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WORKER_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteWorkerAction } from "../../../redux/actions/workersActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
const WorkerCard = ({ data, mode, cellNumber, setOpenMoreModal }) => {
  const { generalProfileList, generalProfilePowerList } = useCustomHook();
  const dispatch = useDispatch();
  const { workers, lastPage } = useSelector((state) => state.workersPagination);
  const { workersSearchValues } = useSelector((state) => state.searchValues);
  let profiles =
    Array.isArray(data.profiles) && data.profiles.length > 0
      ? data.profiles
          .map((item) => {
            return `${
              generalProfileList.find((profile) => profile.key === item.profile)
                .name
            }: ${
              generalProfilePowerList.find(
                (profile) => profile.key === item.power
              ).name
            }`;
          })
          .join(", ")
      : "boş";
  const updateItem = (modalType) => {
    const {
      _id,
      fullName,
      birthday,
      phone,
      position,
      profiles,
      email,
      password,
      role,
    } = data;
    dispatch({
      type: WORKER_MODAL_ACTION_TYPE.GET_WORKER_MODAL,
      payload: {
        data: {
          _id,
          fullName,
          birthday,
          phone,
          position,
          profiles,
          email,
          password,
          role,
        },
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
  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

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
              <div className="table-scroll-text phone">{data.position}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{profiles}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="more" onClick={() => openMoreModal()}>
            Ətraflı
          </td>
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              <li>
                <span className="type">Email:</span>
                <p>{data.email ? data.email : "boş"}</p>
              </li>
              <li>
                <span className="type">Telefon nömrəsi:</span>
                <p>{data.phone ? data.phone : "boş"}</p>
              </li>
              <li>
                <span className="type">Pozisiya:</span>
                <p>{data.position ? data.position : "boş"}</p>
              </li>
              <li>
                <span className="type">Profil:</span>
                <p>{profiles}</p>
              </li>
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
            <span onClick={() => openMoreModal()}>Ətraflı</span>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkerCard;
