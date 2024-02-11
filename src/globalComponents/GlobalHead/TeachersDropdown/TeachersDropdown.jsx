import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/Checkbox.svg";
import {
  DROPDOWN_TEACHER_ACTIONS_TYPE,
} from "../../../redux/actions-type";
import {
  getGroupsWithTeacherAction,
} from "../../../redux/actions/groupsActions";
import { getLessonTablePaginationAction } from "../../../redux/actions/lessonTableActions";
import { getAllTeachersAction } from "../../../redux/actions/teachersActions";

export const TeachersDropdown = ({ deviceType = "" }) => {
  const dispatch = useDispatch();
  const { groupData: dataList } = useSelector(
    (state) => state.groupsPagination
  );
  const { selectedTeacher } = useSelector((state) => state.dropdownTeacher);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const { teachers } = useSelector((state) => state.teachersPagination);

  const getTeacher = (teacher) => {
    console.log(teacher,"teacher");
    setDropdownOpen(false);
    dispatch({ type: DROPDOWN_TEACHER_ACTIONS_TYPE, payload: teacher });
    dispatch(getLessonTablePaginationAction(1, "", teacher._id));
  };

  //   const getCourse = (group) => {
  //     setDropdownOpen(false);
  //     dispatch({
  //       type: DROPDOWN_GROUP_ACTIONS_TYPE.SELECT_GROUP,
  //       payload: group,
  //     });
  //     dispatch(getLessonTablePaginationAction(1, "", group._id));
  //   };

  useEffect(() => {
    if (user?.role === "teacher") {
      dispatch(getGroupsWithTeacherAction(user._id));
    } else {
      dispatch(getAllTeachersAction());
    }
  }, []);

  return (
    <div
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <h2>{selectedTeacher ? selectedTeacher.fullName : "Təlimçilər"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {teachers.map((item) => (
            <li key={item._id} onClick={() => getTeacher(item)}>
              {selectedTeacher === item._id && <CheckIcon />}
              {item.fullName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
