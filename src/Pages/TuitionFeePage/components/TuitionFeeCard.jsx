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
    { key: "Mobil Nömrə", value: data.phone },
    { key: "Status", value: data.status ? "Davam edir" : "Məzun" },

    { key: "Qrup", value: `${data.group.name} - ${data.group.course.name}` },
    { key: "Məbləğ", value: data.amount },
    { key: "Yekun Məbləğ", value: data.totalAmount },
    { key: "Ödəmə növü:", value: `${data.paymentType} hissəli` },
    { key: "Endirim %", value: data.discount },
    {
      key: "Endirim növü",
      value:
        discountReasonList.find((item) => item.key === data?.discountReason)
          ?.name || "",
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
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text no-wrap">{data.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">{data.phone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data.status ? "Davam edir" : "Məzun"}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data.group.name} - {data.group.course.name}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">{data.amount}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data.totalAmount}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data.paymentType} hissəli`
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">{data.discount}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {discountReasonList.find(
                  (item) => item.key === data?.discountReason
                )?.name || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data.payments.map((item, index) => (
                  <p key={index}>
                    Məbləğ: {item.payment} <br /> 
                    Tarix:{" "}
                    {item.paymentDate
                      ? moment(item.paymentDate)
                          .locale("az")
                          .format("DD MMMM YYYY")
                      : ""}{" "}
                    <br /> <br />
                  </p>
                ))}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="overflow-hiiden">
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.contractStartDate
                  ? moment(data?.contractStartDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="overflow-hiiden">
            <div className="td-con">
              <div className="table-scroll-text no-wrap no-wrap">
                {data?.contractEndDate
                  ? moment(data?.contractEndDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          {/* <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </td> */}
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

            <div className="groups-list">
              <h2>Ödənişlər</h2>
              <ul>
                {data.payments.map((item, index) => (
                  <li key={index}>
                    Məbləğ: {item.payment} <br />
                    Tarix:{" "}
                    {item.paymentDate
                      ? moment(item.paymentDate)
                          .locale("az")
                          .format("DD MMMM YYYY")
                      : ""}{" "}
                    <br /> 
                  </li> 
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
            <span onClick={() => openMoreModal()}>Ətraflı</span>
          </div> */}
        </div>
      )}
    </>
  );
};

export default TuitionFeeCard;
