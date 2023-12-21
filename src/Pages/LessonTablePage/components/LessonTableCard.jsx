import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteLessonTableAction } from "../../../redux/actions/lessonTableActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
const LessonTableCard = ({ data, mode, cellNumber }) => {
  const { generalProfileList, generalProfilePowerList } = useCustomHook();
  const dispatch = useDispatch();
  const { lessonTableData, lastPage } = useSelector((state) => state.lessonTablePagination);
  const { lessonTableSearchValues } = useSelector((state) => state.searchValues);
  let profiles =
    Array.isArray(data.profiles) && data.profiles.length > 0
      ? data.profiles
          .map((item) => {
            return `${
              generalProfileList.find((profile) => profile.key === item.profile)
                .name
            } - ${
              generalProfilePowerList.find(
                (profile) => profile.key === item.power
              ).name
            }`;
          })
          .join(", ")
      : "boş";
  const updateItem = (modalType) => {
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
      payload: {
        data: data,
        openModal: true,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (lessonTableData.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = lessonTableSearchValues;
    dispatch(deleteLessonTableAction({ _id, pageNumber, searchQuery }));
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
              <div className="table-scroll-text">{data.position}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text profiles">{profiles}</div>
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
              <li>
                <span>Profil:</span>
                <p className="profiles">{profiles}</p>
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

export default LessonTableCard;
