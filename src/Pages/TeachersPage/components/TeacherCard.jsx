import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TEACHERS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteTeacherAction } from "../../../redux/actions/teachersActions";
const TeacherCard = ({ data, mode, cellNumber, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const { teachers, lastPage } = useSelector((state) => state.teachersPagination);
  const { teachersSearchValues } = useSelector((state) => state.searchValues);
  const { teacherStatus } = useSelector((state) => state.teacherStatus);

  let courses =
    Array.isArray(data.courses) && data.courses.length > 0
      ? data.courses
          .map((course) => {
            return course.name;
          })
          .join(", ")
      : "boş";

  const updateItem = (modalType) => {
    const {
      fullName,
      courses,
      email,
      password,
      salary,
      status,
      _id,
      createdAt,
      sector,
      birthday,
      fin,
      seria,
      phone,
      workExperience,
      maritalStatus,
      disability,
      healthStatus,
    } = data;
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: {
        data: {
          fullName,
          courses,
          email,
          password,
          salary,
          status,
          _id,
          createdAt,
          sector,
          birthday,
          fin,
          seria,
          phone,
          workExperience,
          maritalStatus,
          disability,
          healthStatus,
        },
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (teachers.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = teachersSearchValues;
    const status = teacherStatus ? teacherStatus : 'all';
    dispatch(deleteTeacherAction({_id, pageNumber, searchQuery, status}));
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
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{courses}</div>
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
          <td className="salary">
            {data.salary?.value}{" "}
            {data.salary.monthly === true ? "aylıq" : " saatlıq"}
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
                <span className="type">Fənn:</span>
                <p>{courses}</p>
              </li>
              <li>
                <span className="type">Email:</span>
                <p>{data.email ? data.email : "boş"}</p>
              </li>
              <li>
                <span className="type">Telefon nömrəsi:</span>
                <p>{data.phone ? data.phone : "boş"}</p>
              </li>
              <li>
                <span className="type">Əmək haqqı:</span>
                <p>
                  {data.salary.value ? data.salary.value : "boş"}{" "}
                  {data.salary.hourly === true ? "(saatlıq)" : "(aylıq)"}{" "}
                </p>
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

export default TeacherCard;
