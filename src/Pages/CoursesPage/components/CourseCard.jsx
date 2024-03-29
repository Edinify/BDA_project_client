import { useDispatch, useSelector } from "react-redux";
import { COURSES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteCoursesAction } from "../../../redux/actions/coursesActions";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";

const CourseCard = ({
  data,
  mode,
  course,
  cellNumber,
  setOpenConfirmModal,
  setOpenMoreModal,
}) => {
  const dispatch = useDispatch();
  const { courses, lastPage } = useSelector((state) => state.coursesPagination);
  const { coursesSearchValues } = useSelector((state) => state.searchValues);
  const updateItem = (modalType) => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (courses.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = coursesSearchValues;
    dispatch(deleteCoursesAction({ _id, pageNumber, searchQuery }));
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };
  const openConfirmModal = () => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.OPEN_COURSE_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  const wholePayment = data.payments.find(
    (payment) => payment.paymentType === "Tam"
  );
  const teachingPeriodPayment = data.payments.find(
    (payment) => payment.paymentType === "Tədris müddəti"
  );
  const partPayment = data.payments.find(
    (payment) => payment.paymentType === "10 hissəli"
  );

  return (
    <>
      {mode === "desktop" ? (
        <tr className="class-table">
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{cellNumber}. {data.name}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {`${
                  wholePayment?.payment ? `${wholePayment?.payment} AZN` : ""
                }`}{" "}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {" "}
                {`${
                  teachingPeriodPayment?.payment
                    ? `${teachingPeriodPayment?.payment} AZN - ${teachingPeriodPayment.part} hissəli`
                    : ""
                }`}{" "}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {`${partPayment?.payment ? `${partPayment?.payment} AZN` : ""}`}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          {course?.power !== "only-show" ? (
            <td>
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                state={course}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"courses"}
              />
            </td>
          ) : null}
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3 className="name">{data.name}</h3>
          </div>

          {course.power === "only-show" ? null : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                state={course}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"courses"}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CourseCard;
