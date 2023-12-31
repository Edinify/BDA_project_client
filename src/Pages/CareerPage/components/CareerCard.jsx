import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CAREER_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteCareerAction } from "../../../redux/actions/careerActions";
import moment from "moment";
const CareerCard = ({ data, mode, cellNumber, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const { careerData, lastPage } = useSelector(
    (state) => state.careerPagination
  );
  const { careerSearchValues } = useSelector((state) => state.searchValues);
  const listData = [
    { key: "Qrup", value: data.group.name },
    { key: "Ixtisas", value: data.group.course.name },
    // { key: "Tələbənin adı", value: data.fullName },
    { key: "Portfolio linki", value: "" },
    { key: "CV linki", value: "" },
    { key: "Mobil Nömrə", value: data.phone },
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
    { key: "Status", value: data.status ? "Davam edir" : "Məzun" },
    { key: "Diplom", value: "" },
  ];

  const updateItem = (modalType) => {
    dispatch({
      type: CAREER_MODAL_ACTION_TYPE.GET_CAREER_MODAL,
      payload: {
        data: data,
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
              <div className="table-scroll-text">{data.group.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="email">
            <div className="td-con">
              <div className="table-scroll-text">{data.group.course.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone"></div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone"></div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data.phone}</div>
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
              <div className="table-scroll-text no-wrap"></div>
              <div className="right-fade"></div>
            </div>
          </td>
          {/* <td className="more" onClick={() => openMoreModal()}>
            Ətraflı
          </td>
          <td>
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

export default CareerCard;
