import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { LEAD_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { useFinanceCustomHook } from "../../../utils";

const LeadCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const { deleteIncome } = useFinanceCustomHook();

  const updateItem = () => {
    const { _id, count, date } = data;
    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.GET_LEAD_MODAL,
      payload: {
        data: {
          _id,
          count,
          date,
        },
        openModal: true,
      },
    });
  };
  const deleteItem = () => {
    deleteIncome(data._id);
  };
  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td >
            <div className="td-con">
              <div className="table-scroll-text">{cellNumber}.</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data?.count}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {" "}
                {data.date ? moment(data.date).format("DD-MM-YYYY") : "boş"}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              profil={"sales"}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              <li className="payment">
                <span className="type">Lead sayı:</span>
                <p>{data?.count || ""}</p>
              </li>
              <li>
                <span className="type"> Tarix:</span>
                <p>
                  {data.date ? moment(data.date).format("YYYY-MM-DD") : "boş"}
                </p>
              </li>
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              profil={"sales"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LeadCard;
