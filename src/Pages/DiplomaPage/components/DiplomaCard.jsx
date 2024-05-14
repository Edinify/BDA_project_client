import moment from "moment";
import React from "react";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { useDispatch } from "react-redux";
import { DIPLOMA_MODAL_ACTION_TYPE } from "../../../redux/actions-type";

const DiplomaCard = ({ data, mode }) => {
  const dispatch = useDispatch();

  const updateItem = () => {
    dispatch({
      type: DIPLOMA_MODAL_ACTION_TYPE.GET_DIPLOMA_MODAL,
      payload: {
        data: data,
        openModal: true,
      },
    });
  };

  const deleteItem = () => {
    console.log("delete item");
  };
  return (
    <>
      <tr>
        <td>
          <div className="td-con" style={{ width: "200px" }}>
            {/* <div className="cell-number">{cellNumber}.</div> */}
            <div className="table-scroll-text phone">{data.fullName}</div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td>
          <div className="td-con" style={{ width: "150px" }}>
            <div className="table-scroll-text">{data?.group?.name}</div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td>
          <div className="td-con" style={{ width: "150px" }}>
            <div className="table-scroll-text">{data?.degree}</div>
            <div className="right-fade"></div>
          </div>
        </td>

        <td>
          <div className="td-con" style={{ width: "200px" }}>
            <div className="table-scroll-text phone">
              {data?.date
                ? moment(data?.date).locale("az").format("DD MMMM YYYY")
                : ""}
            </div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td>
          <div className="td-con" style={{ width: "150px" }}>
            <div className="table-scroll-text">{data?.seria}</div>
            <div className="right-fade"></div>
          </div>
        </td>

        <td>
          <div className="td-con" style={{ width: "150px" }}>
            <div className="table-scroll-text">{data?.status}</div>
            <div className="right-fade"></div>
          </div>
        </td>

        <td>
          <UpdateDeleteModal
            updateItem={updateItem}
            deleteItem={deleteItem}
            // openMoreModal={openMoreModal}
            profil={"diploma"}
            data={data}
          />
        </td>
      </tr>
    </>
  );
};

export default DiplomaCard;
