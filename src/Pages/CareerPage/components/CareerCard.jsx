import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CAREER_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteCareerAction } from "../../../redux/actions/careerActions";
const CareerCard = ({ data, mode, cellNumber, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const { careerData, lastPage } = useSelector((state) => state.careerPagination);
  const { careerSearchValues } = useSelector((state) => state.searchValues);

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
      type: CAREER_MODAL_ACTION_TYPE.GET_CAREER_MODAL,
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
      lastPage > 1 ? (careerData.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = careerSearchValues;
    dispatch(deleteCareerAction({ _id, pageNumber, searchQuery }));
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
              <div className="table-scroll-text phone">{data.role}</div>
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
                <span className="type">Rol:</span>
                <p>{data.role ? data.role : "boş"}</p>
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

export default CareerCard;
