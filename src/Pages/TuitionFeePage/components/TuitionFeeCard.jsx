import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";

const TuitionFeeCard = ({ mode, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const { students, lastPage } = useSelector(
    (state) => state.tuitionFeePagination
  );
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const data = {
    groupNumber: 1,
    instructor: "kimse",
    studentName: "kimseler",
    status: "Active",
    contractType: "technset",
    price: 20,
    discount: 5,
    finalPrice: 1,
    amountPaid: 0,
    remainder: 0,
    fin: 0,
    phone: 0,
    startDate: 0,
  };

  const listData = [
    { key: "Tələbənin adı", value: "Nurməmməd Nurməmmədli" },
    { key: "Qrup Nömrəsi", value: "Camp" },
    { key: "İnstruktor", value: "Emil" },
    { key: "Status", value: "Aktiv" },
    { key: "Müqavilə növü", value: "Tam ödəniş" },
    { key: "Məbləğ", value: "700" },
    { key: "Endirim %", value: "0%" },
    { key: "Yekun Məbləğ", value: "700" },
    { key: "Ödənilmiş məbləğ", value: "0" },
    { key: "Qalıq", value: "700" },
    { key: "Fin kodu", value: "" },
    { key: "Nömrəsi", value: "" },
    { key: "Dərs baş. tarixi", value: "11/23/2023" },
  ];

  const updateItem = (modalType) => {
    const {
      groupNumber,
      instructor,
      studentName,
      status,
      contractType,
      price,
      discount,
      finalPrice,
      amountPaid,
      remainder,
      fin,
      phone,
      startDate,
    } = data;

    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL,
      payload: {
        data: {
          groupNumber,
          instructor,
          studentName,
          status,
          contractType,
          price,
          discount,
          finalPrice,
          amountPaid,
          remainder,
          fin,
          phone,
          startDate,
        },
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (students.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = tuitionFeeSearchValues;
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
          <td>Camp</td>
          <td>Emil</td>
          <td>Aktiv</td>
          <td>Tam ödəniş</td>
          <td>700</td>
          <td>0%</td>
          <td>700</td>
          <td>0</td>
          <td>700</td>
          <td>Nurməmməd Nurməmmədli</td>
          <td></td>
          <td></td>
          <td>11/23/2023</td>
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

export default TuitionFeeCard;
