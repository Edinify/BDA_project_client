import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteGroupAction } from "../../../redux/actions/groupsActions";
import { useLocation } from "react-router-dom";
import moment from "moment";
import GroupStudentsDropdown from "./GroupStudentsDropdown";
const GroupCard = ({ data, mode, cellNumber, group, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { groupData, lastPage } = useSelector(
    (state) => state.groupsPagination
  );
  const { groupsSearchValues } = useSelector((state) => state.searchValues);
  let teachers =
    Array.isArray(data?.teachers) && data?.teachers.length > 0
      ? data?.teachers
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";
  let mentors =
    Array.isArray(data?.mentors) && data?.mentors.length > 0
      ? data?.mentors
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";

  let students =
    data && data.students && data.students.length > 0 ? (
      data.students.map((item) => (
        <span key={item._id}>
          {item.fullName}
          <br />
        </span>
      ))
    ) : (
      <span>boş</span>
    );

  let lessonDates = data.lessonDate.map((item, index) => (
    <span className="lesson-date" key={index}>
      gün: {item.day}, saat: {item.time} {item.practical ? "(Praktika)" : ""}{" "}
      <br />
    </span>
  ));

  const listData = [
    { key: "Qrup adı", value: data?.name },
    { key: "İxtisas", value: data?.course?.name },
    { key: "Təlimçilər", value: teachers },
    {
      key: "Başlama tarixi",
      value: moment(data.startDate).locale("az").format("DD MMMM YYYY"),
    },
    {
      key: "Bitmə tarixi",
      value: moment(data.endDate).locale("az").format("DD MMMM YYYY"),
    },
    { key: "Dərs günləri", value: lessonDates },
  ];
  const updateItem = (modalType) => {
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (groupData.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data?._id;
    const searchQuery = groupsSearchValues;
    const completed = location.pathname === "/groups/current" ? true : false;
    dispatch(deleteGroupAction({ _id, pageNumber, searchQuery, completed }));
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const openConfirmModal = () => {
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.OPEN_GROUP_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };
  // console.log(group, "grouppp");

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data?.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text">{data?.course?.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text phone">{teachers}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text phone">{mentors}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{width:"250px"}} >
              <GroupStudentsDropdown data={data} />
            </div>
          </td>
          <td>
            <div
              className="td-con"
              style={{ width: "250px", whiteSpace: "nowrap" }}
            >
              <div className="table-scroll-text">{lessonDates}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text">
                {moment(data.startDate).locale("az").format("DD MMMM YYYY")}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text">
                {moment(data.endDate).locale("az").format("DD MMMM YYYY")}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {data.status === "waiting"
                  ? "Yığılan"
                  : data.status === "current"
                  ? "Mövcud"
                  : data.status === "ended"
                  ? "Bitmiş"
                  : null}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openConfirmModal={openConfirmModal}
              openMoreModal={openMoreModal}
              state={group}
              profil={"groups"}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data?.name}</h3>
            <ul>
              {listData.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}:</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          {group.power === "only-show" ? null : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openConfirmModal={openConfirmModal}
                state={group}
                openMoreModal={openMoreModal}
                profil={"groups"}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GroupCard;
