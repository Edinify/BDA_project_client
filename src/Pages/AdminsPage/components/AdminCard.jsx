import { useDispatch } from "react-redux";
import { ADMINS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteAdminAction } from "../../../redux/actions/adminsActions";

const AdminCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();

  const updateItem = () => {
    const { fullName, email, password, _id } = data;
    dispatch({
      type: ADMINS_MODAL_ACTION_TYPE.GET_ADMINS_MODAL,
      payload: {
        data: {
          fullName,
          email,
          password,
          _id,
        },
        openModal: true,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteAdminAction(data._id));
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
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box admin">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              <li className="email">
                <span className="type">Email:</span>
                <p>{data.email ? data.email : "boş"}</p>
              </li>
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCard;
