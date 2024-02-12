import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";

const StudentCard = ({
  data,
  mode,
  cellNumber,
  setOpenMoreModal,
  setOpenConfirmModal,
  student,
}) => {
  const dispatch = useDispatch();
  const { students, lastPage } = useSelector(
    (state) => state.studentsPagination
  );
  const { studentSearchValues } = useSelector((state) => state.searchValues);
  const { studentStatus } = useSelector((state) => state.studentStatus);
  let courses =
    Array.isArray(data.courses) && data.courses.length > 0
      ? data.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "boş";
  const listData = [
    { key: "Ixtisas", value: courses },
    {
      key: "Mobil nömrə",
      value: data.phone ? data.phone : "boş",
    },
  ];

  let groupName =
    Array.isArray(data.groups) && data.groups.length > 0
      ? data.groups
          .map((group) => {
            return `${group.group.name}`;
          })
          .join(",")
      : "boş";

  const updateItem = (modalType) => {
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (students.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = studentSearchValues;
    const status = studentStatus ? studentStatus : "all";
    dispatch(deleteStudentAction({ _id, pageNumber, searchQuery, status }));
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const openConfirmModal = () => {
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.OPEN_STUDENT_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  // console.log(data.groups, "hhdddddddddddddddddd");
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
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{courses}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.phone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {groupName}
                {/* {data.groups.map((item) => (
                  <p key={item.group._id}>
                    {item.group.name} <br />
                  </p>
                ))} */}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              setOpenConfirmModal={setOpenConfirmModal}
              state={student}
              openConfirmModal={openConfirmModal}
              openMoreModal={openMoreModal}
              profil="students"
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
                  <span className="type">{item.key}:</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
            <div className="groups-list">
              <h2>Qruplar</h2>
              <ul>
                {data.groups.map((groupsData) => (
                  <li key={groupsData.group._id}>
                    <span>Qrup adı: {groupsData?.group?.name}</span>
                    Qrup ixtisası: {groupsData.group?.course?.name} <br />
                    Ümumi ödəniş: {groupsData.totalAmount} <br />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {student.power === "only-show" ? (
            <div className="more-content">
              <span onClick={openMoreModal}>Ətraflı</span>
            </div>
          ) : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                state={student}
                setOpenConfirmModal={setOpenConfirmModal}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"students"}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentCard;
