import { useDispatch, useSelector } from "react-redux";
import { COURSES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteCoursesAction } from "../../../redux/actions/coursesActions";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";

const CourseCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const { courses, lastPage } = useSelector((state) => state.coursesPagination);
  const { coursesSearchValues } = useSelector((state) => state.searchValues);
  const updateItem = () => {
    const { name, _id, status } = data;
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: { data: { name, _id, status }, openModal: true },
    });
  };
  const deleteItem = () => {
    const pageNumber = lastPage > 1 ? (courses.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = coursesSearchValues;
    dispatch(deleteCoursesAction({ _id, pageNumber, searchQuery }));
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr className="class-table">
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data.name}</div>
              <div className="right-fade"></div>
            </div>
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
            <h3 className="name">{data.name}</h3>
          </div>

          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
