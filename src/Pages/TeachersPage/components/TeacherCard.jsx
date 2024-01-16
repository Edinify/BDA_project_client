import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TEACHERS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteTeacherAction } from "../../../redux/actions/teachersActions";
const TeacherCard = ({ data, mode, cellNumber, setOpenMoreModal, teacher }) => {
  const dispatch = useDispatch();
  const { teachers, lastPage } = useSelector(
    (state) => state.teachersPagination
  );

  // console.log(teacher,"teacher")
  const { teachersSearchValues } = useSelector((state) => state.searchValues);
  const { teacherStatus } = useSelector((state) => state.teacherStatus);
  let courses =
    Array.isArray(data.courses) && data.courses.length > 0
      ? data.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "boş";

  const listData = [
    { key: "Fənn", value: courses },
    { key: "Email", value: data.email },
    { key: "Telefon nömrəsi", value: data.phone },
    { key: "Email", value: data.email },
  ];

  const updateItem = (modalType) => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (teachers.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data?._id;
    const searchQuery = teachersSearchValues;
    const status = teacherStatus ? teacherStatus : "all";
    dispatch(deleteTeacherAction({ _id, pageNumber, searchQuery, status }));
  };
  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const openConfirmModal = () => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.OPEN_TEACHER_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data?.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{courses}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="email">
            <div className="td-con">
              <div className="table-scroll-text">{data?.email}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data?.phone}</div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              state={teacher}
              openConfirmModal={openConfirmModal}
              openMoreModal={openMoreModal}
              profil={"teachers"}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data?.fullName}</h3>
            <ul>
              {listData.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}:</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          {teacher.power === "only-show" ? (
            <div className="more-content">
              <span onClick={openMoreModal}>Ətraflı</span>
            </div>
          ) : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                state={teacher}
                openConfirmModal={openConfirmModal}
                profil={"teachers"}
                openMoreModal={openMoreModal}
              />
              {/* <div className="more-content">
                <span onClick={openMoreModal}>Ətraflı</span>
              </div> */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TeacherCard;
