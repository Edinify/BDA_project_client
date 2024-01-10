import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SYLLABUS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteSyllabusAction } from "../../../redux/actions/syllabusActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
const SyllabusCard = ({ data, mode, cellNumber, setOpenConfirmModal,syllabus }) => {
  const dispatch = useDispatch();
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);

  const { syllabusData, lastPage } = useSelector(
    (state) => state.syllabusPagination
  );
  const { syllabusSearchValues } = useSelector((state) => state.searchValues);


  console.log(syllabus.power,"powerfff")
  const updateItem = (modalType) => {
    dispatch({
      type: SYLLABUS_MODAL_ACTION_TYPE.GET_SYLLABUS_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (syllabusData.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = syllabusSearchValues;
    const courseId = selectedCourse._id;
    dispatch(deleteSyllabusAction({ _id, pageNumber, searchQuery, courseId }));
  };

  const openConfirmModal = () => {
    setOpenConfirmModal(true);
    updateItem("more");
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>{data.orderNumber}</td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          {/* {syllabus.power} */}

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              state={syllabus}
              openConfirmModal={openConfirmModal}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              <li>
                <span>No:</span>
                <p>{data.orderNumber ? data.orderNumber : "boş"}</p>
              </li>
              <li>
                <span>Mövzu:</span>
                <p>{data.name ? data.name : "boş"}</p>
              </li>
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              state={syllabus}
              openConfirmModal={openConfirmModal}
            />
           
          </div>
        </div>
      )}
    </>
  );
};

export default SyllabusCard;
