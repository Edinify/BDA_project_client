import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteLessonTableAction } from "../../../redux/actions/lessonTableActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import moment from "moment";
const LessonTableCard = ({
  data,
  mode,
  cellNumber,
  setOpenStudentModal,
  setStudents,
  setOpenConfirmModal,
}) => {
  const { weeksArrFullName, lessonStatusList } = useCustomHook();
  const dispatch = useDispatch();
  const { lessonTableData, lastPage } = useSelector(
    (state) => state.lessonTablePagination
  );
  const { lessonTableSearchValues } = useSelector(
    (state) => state.searchValues
  );
  const lessonDay = data.date
    ? `${moment(data.date).locale("az").format("DD MMMM YYYY")}, ${
        weeksArrFullName[moment(new Date(data.date)).day()]
      },`
    : "";

  // let students =
  //   Array.isArray(data.students) && data.students.length > 0
  // ? data.students
  //         .map((item) => {
  //           return `${item.student.fullName} `;
  //         })
  //         .join(", ")
  //     : "boş";

  // console.log(students, "students");
  const listData = [
    { key: "İxtisas", value: data.group.course.name },
    {
      key: "Mövzu",
      value: `${data?.topic?.orderNumber}. ${data?.topic?.name}`,
    },
    { key: "Müəllim", value: data.teacher.fullName },
    {
      key: "Dərs günü",
      value: lessonDay,
    },
    { key: "Dərs saatı", value: data.time },
    {
      key: "Status",
      value:
        lessonStatusList.find((item) => item.key === data.status).name || "",
    },
    { key: "Tələbələr", value: "students" },
  ];
  const updateItem = (modalType) => {
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (lessonTableData.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = lessonTableSearchValues;
    dispatch(deleteLessonTableAction({ _id, pageNumber, searchQuery }));
  };

  const openConfirmModal = () => {
    setOpenConfirmModal(true);
    updateItem("more");
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
              <div className="table-scroll-text">{`${
                data?.topic?.orderNumber || ""
              }. ${data?.topic?.name || ""}`}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.teacher.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text profiles">{lessonDay}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.time}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {lessonStatusList.find((item) => item.key === data.status)
                  .name || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="student-length">
            <div
              onClick={() => {
                setStudents(data.students);
                setOpenStudentModal(true);
              }}
              className="td-con"
            >
              <div className="table-scroll-text">{data.students.length}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="confirm" onClick={openConfirmModal}>
            Təsdiqlə
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
            <h3>{data.group.name}</h3>
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
            <div className="more-content">
              <span onClick={openConfirmModal}>Təsdiqlə</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LessonTableCard;
