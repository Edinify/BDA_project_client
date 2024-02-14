import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { CONSULTATION_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import moment from "moment";
import { deleteConsultationAction } from "../../../redux/actions/consultationsActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import { useLocation } from "react-router-dom";

const ConsultationCard = ({ mode, setOpenMoreModal, data, consultation }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { constStatusList } = useCustomHook();
  const { students, lastPage } = useSelector(
    (state) => state.consultationPagination
  );
  const { consultationSearchValues } = useSelector(
    (state) => state.searchValues
  );
  const listData = [
    { key: "Təlimçi", value: data?.teacher?.fullName },

    { key: "Mobil nömrə", value: data?.studentPhone },
    { key: "İxtisas", value: data?.course?.name },
    {
      key: "Əlaqə tarixi",
      value: data?.contactDate
        ? moment(data?.contactDate).locale("az").format("DD MMMM YYYY")
        : "",
    },
    {
      key: "Konsultasiya tarixi",
      value: data?.constDate
        ? moment(data?.constDate).locale("az").format("DD MMMM YYYY")
        : "",
    },
    { key: "Konsultasiya saatı", value: data?.constTime },
    {
      key: "Status",
      value:
        constStatusList.find((item) => item.key === data.status)?.name || "",
    },
  ];

  const updateItem = (modalType) => {
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
        firstStep: true,
        secondStep: false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (students.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data?._id;
    const searchQuery = consultationSearchValues;
    const status =
      location.pathname === "/consultation/appointed"
        ? "appointed"
        : "completed";
    dispatch(
      deleteConsultationAction({ _id, pageNumber, searchQuery, status })
    );
  };
  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const openConfirmModal = () => {
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.OPEN_CONSULTATION_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  // console.log(constStatusList, "consttttttttttt");
  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>{data?.studentName}</td>
          <td>{data?.teacher?.fullName}</td>
          <td>{data?.studentPhone}</td>
          <td>{data?.course?.name}</td>
          <td>
            {data?.contactDate
              ? moment(data?.contactDate).locale("az").format("DD MMMM YYYY")
              : ""}
          </td>
          <td>
            {data?.constDate
              ? moment(data?.constDate).locale("az").format("DD MMMM YYYY")
              : ""}
          </td>
          <td>{data?.constTime}</td>
          <td
            style={
              data?.status === "sold"
                ? { backgroundColor: "#d4ffbf" }
                : data?.status === "cancelled"
                ? { backgroundColor: "#ffced1" }
                : { backgroundColor: "#d2c3fe" }
            }
          >
            {constStatusList.find((item) => item.key === data.status)?.name ||
              ""}
          </td>
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openConfirmModal={openConfirmModal}
              openMoreModal={openMoreModal}
              profil={"consultation"}
              state={consultation}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data?.studentName}</h3>
            <ul>
              {listData?.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}:</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          {consultation.power === "only-show" ? (
            <div className="more-content">
              <span onClick={openMoreModal}>Ətraflı</span>
            </div>
          ) : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openConfirmModal={openConfirmModal}
                state={consultation}
                openMoreModal={openMoreModal}
                profil={"consultation"}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConsultationCard;
