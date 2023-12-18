import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { CONSULTATION_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";
import { ReactComponent as EditIcon } from "../../../assets/icons/more-modal/edit-02.svg";
import Checkbox from "@mui/material/Checkbox";

const ConsultationCard = ({ mode, setOpenMoreModal, data }) => {
  const dispatch = useDispatch();
  const { students, lastPage } = useSelector(
    (state) => state.consultationPagination
  );
  const { consultationSearchValues } = useSelector(
    (state) => state.searchValues
  );
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const listData = [
    { key: "Ad Soyad", value: data.firstStepData.studentName },
    { key: "Əlaqə tarixi", value: data.firstStepData.contactDate },
    { key: "Mənbə", value: data.firstStepData.source },
    { key: "Tel No", value: data.firstStepData.phone },
    { key: "İxtisas", value: data.firstStepData.department },
    { key: "Kons tarix", value: data.firstStepData.constDate },
    { key: "Kons saat", value: data.firstStepData.constTime },
    {
      key: "Təyin edildi",
      value: (
        <Checkbox
          {...label}
          defaultChecked
          color="success"
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 36 },
          }}
        />
      ),
    },
  ];

  const updateItem = (modalType) => {
    const {
      studentName,
      contactDate,
      source,
      phone,
      department,
      constDate,
      constTime,
    } = data.firstStepData;

    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: {
        data: {
          studentName,
          contactDate,
          source,
          phone,
          department,
          constDate,
          constTime,
        },
        openModal: modalType !== "more" ? true : false,
        firstStep: true,
        secondStep: false,
      },
    });
  };

  const updateSecondStepItem = (modalType) => {
    const {
      department,
      constDate,
      constTime,
      teacher,
      persona,
      knowledge,
      sale,
      cancellReason,
      saleType,
      additionalInfo
    } = data.secondStepData;

    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: {
        data: {
          department,
          constDate,
          constTime,
          teacher,
          persona,
          knowledge,
          sale,
          cancellReason,
          saleType,
          additionalInfo
        },
        openModal: modalType !== "more" ? true : false,
        firstStep: false,
        secondStep: true,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (students.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = consultationSearchValues;
    const status = "all";
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
          <td>{data.firstStepData.studentName}</td>
          <td>{data.firstStepData.contactDate}</td>
          <td>{data.firstStepData.source}</td>
          <td>{data.firstStepData.phone}</td>
          <td>{data.firstStepData.department}</td>
          <td>{data.firstStepData.constDate}</td>
          <td>{data.firstStepData.constTime}</td>
          <td className="check">
            <div className="check-icon">
              <Checkbox
                {...label}
                checked={data.firstStepDone ? true : false}
                color="success"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 36 },
                }}
              />
            </div>
          </td>
          <td>
            {data.secondStepDone ? (
              <div onClick={() => updateSecondStepItem()}>
                <Checkbox
                  {...label}
                  checked={data.firstStepDone ? true : false}
                  color="success"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 36 },
                  }}
                />
              </div>
            ) : (
              <div className="edit-icon">
                <EditIcon />
              </div>
            )}
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
            <h3>Nurməmməd Nurməmmədli</h3>
            <ul>
              {listData.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}</span>
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

export default ConsultationCard;
