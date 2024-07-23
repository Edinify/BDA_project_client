import { useDispatch, useSelector } from "react-redux";
import { ROOMS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
import { useState } from "react";
import { deleteRoomAction } from "../../../redux/actions/roomsActions";

const RoomCard = ({ data, mode, cellNumber, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  const updateItem = (modalType) => {
    dispatch({
      type: ROOMS_MODAL_ACTION_TYPE.GET_ROOMS_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteRoomAction(data._id));
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };
  const openConfirmModal = () => {
    dispatch({
      type: ROOMS_MODAL_ACTION_TYPE.OPEN_ROOM_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  const doubleClick = () => {
    updateItem("");
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}

      {mode === "desktop" ? (
        <tr className="class-table" onDoubleClick={doubleClick}>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {cellNumber}. {data.name}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          {user?.power !== "only-show" ? (
            <td>
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"courses"}
                setShowDeleteModal={setShowDeleteModal}
              />
            </td>
          ) : null}
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3 className="name">{data.name}</h3>
          </div>

          {user?.power === "only-show" ? null : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"courses"}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomCard;
