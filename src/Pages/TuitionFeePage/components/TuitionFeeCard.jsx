import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";
import moment from "moment";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Select } from "antd";

const TuitionFeeCard = ({ mode, setOpenMoreModal, data, cellNumber }) => {
  const dispatch = useDispatch();
  const { discountReasonList } = useCustomHook();
  const { tuitionFeeData, lastPage } = useSelector(
    (state) => state.tuitionFeePagination
  );
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const [currentPayment, setCurrentPayment] = useState(null);

  const listData = [
    { key: "Qrup", value: `${data.group.name} - ${data.group.course.name}` },
    { key: "Məbləğ", value: data.amount },
    { key: "Yekun Məbləğ", value: data.totalAmount },
    { key: "Ödəniş növü:", value: `${data.paymentType} hissəli` },
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
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL,
      payload: {
        data: data,
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

  const openConfirmModal = () => {
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: data,
        openModal: false,
        openConfirmModal: true,
      },
    });
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  useEffect(() => {
    const currentDate = new Date();

    for (let paymentItem of data.payments) {
      const paymentDate = new Date(paymentItem.paymentDate);

      if (
        paymentDate.getMonth() === currentDate.getMonth() &&
        paymentDate.getFullYear() === currentDate.getFullYear()
      ) {
        setCurrentPayment({
          ...paymentItem,
          paymentDate: moment(paymentDate).format("DD.MM.YYYY"),
        });
        break;
      }
    }
  }, []);

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
              <div className="table-scroll-text no-wrap">
                {data.group.name} - {data.group.course.name}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.amount ? data.amount + " AZN" : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.totalAmount ? data?.totalAmount + " AZN" : ""}
              </div>
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
                {data.discount || 0}%
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.payment?.paymentType || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                <p>
                  {currentPayment?.status === "wait"
                    ? " ödənilməyib"
                    : currentPayment?.status === "paid"
                    ? "ödənildi"
                    : currentPayment?.status === "confirm"
                    ? "təstiqləndi"
                    : currentPayment?.status === "cancel"
                    ? "ləğv edildi"
                    : ""}
                </p>
                <p>
                  {currentPayment?.payment
                    ? currentPayment?.payment + " AZN"
                    : ""}
                </p>
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openMoreModal={openMoreModal}
              openConfirmModal={openConfirmModal}
              profil={"tuitionFee"}
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
            <td>
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openMoreModal={openMoreModal}
                openConfirmModal={openConfirmModal}
                profil={"tuitionFee"}
              />
            </td>
          </div>
        </div>
      )}
    </>
  );
};

export default TuitionFeeCard;
