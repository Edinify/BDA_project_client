import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";

const StudentCard = ({ data, mode, cellNumber, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const { students, lastPage } = useSelector(
    (state) => state.studentsPagination
  );
  const { studentSearchValues } = useSelector((state) => state.searchValues);
  const { studentStatus } = useSelector((state) => state.studentStatus);
  let courses =
    Array.isArray(data.courses) && data.courses.length > 0
      ? data.courses
          .map((course) => {
            return `${course.course.name} (${course.lessonAmount} dərs)`;
          })
          .join(", ")
      : "boş";
  const listData = [
    { key: "Ixtisas", value: courses , },
    { key: "Qrup", value: courses , },
    {
      key: "Email",
      value: data.email ? data.email : "boş",
    },
    {
      key: "Mobil nömrə",
      value: data.motherPhone ? data.motherPhone : "boş",
    },
    {
      key: "Fin kod",
      value: data.fin ? data.fin : "boş",
    },
    {
      key: "Status",
      value: data.status ? data.status : "boş",
    },
  ];

  const updateItem = (modalType) => {
    const {
      fullName,
      motherName,
      fatherName,
      birthday,
      motherPhone,
      fatherPhone,
      email,
      password,
      courses,
      lessonAmount,
      status,
      _id,
      createdAt,
      payment,
      sector,
      whereComing,
      educationalInstitution,
      educationDegree,
      healthStatus,
      emergencyPhone,
      whereFrom,
      fin,
      seria,
    } = data;

    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: {
        data: {
          fullName,
          motherName,
          fatherName,
          birthday,
          motherPhone,
          fatherPhone,
          email,
          password,
          courses,
          lessonAmount,
          status,
          _id,
          createdAt,
          payment,
          sector,
          whereComing,
          educationalInstitution,
          educationDegree,
          healthStatus,
          emergencyPhone,
          whereFrom,
          fin,
          seria,
        },
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (students.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = studentSearchValues;
    const status = studentStatus ? studentStatus : "all";
    dispatch(deleteStudentAction({ _id, pageNumber, searchQuery, status }));
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
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{courses}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.email}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.motherPhone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.fin}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.status}</div>
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
              {listData.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}:</span>
                  <p>{item.value}</p>
                </li>
              ))}
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

export default StudentCard;
