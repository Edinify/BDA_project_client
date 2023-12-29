import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";
import moment from "moment";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";

const TuitionFeeCard = ({ mode, setOpenMoreModal, data, cellNumber }) => {
  const dispatch = useDispatch();
  const { discountReasonList } = useCustomHook();
  const { tuitionFeeData, lastPage } = useSelector(
    (state) => state.tuitionFeePagination
  );
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);

  const listData = [
    // { key: "Fin kodu", value: data.fin },
    // { key: "Seriya", value: data.seria },
    // { key: "Mobil Nömrə", value: data.phone },
    { key: "Status", value: data.status ? "Davam edir" : "Məzun" },

    { key: "Qrup", value: data.group.name },
    { key: "Məbləğ", value: data.amount },
    { key: "Yekun Məbləğ", value: data.totalAmount },
    { key: "Ödənişlər", value: "0%" },
    { key: "Endirim %", value: data.discount },
    {
      key: "Endirim növü",
      value: discountReasonList.find(
        (item) => item.key === data?.discountReason
      )?.name || '',
    },
    {
      key: "Müqavilə başlama tarixi",
      value: data?.contractStartDate
        ? moment(data?.contractStartDate).locale("az").format("DD MMMM YYYY")
        : "",
    },
    {
      key: "Müqavilə bitmə tarixi",
      value: data?.contractEndDate
        ? moment(data?.contractEndDate).locale("az").format("DD MMMM YYYY")
        : "",
    },
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
      lastPage > 1 ? (tuitionFeeData.length > 1 ? lastPage : lastPage - 1) : 1;
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
            <h3>{data.fullName}</h3>
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
