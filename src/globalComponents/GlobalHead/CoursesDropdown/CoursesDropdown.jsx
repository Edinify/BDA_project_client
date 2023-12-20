import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/Checkbox.svg";
import {
  STUDENT_STATUS_FILTER_ACTION_TYPE,
  TEACHER_STATUS_FILTER_ACTION_TYPE,
  SYLLABUS_ALL_ACTIONS_TYPE,
} from "../../../redux/actions-type";
import { getAllCoursesAction } from "../../../redux/actions/coursesActions";
import { getSyllabusPaginationAction } from "../../../redux/actions/syllabusActions";

export const CoursesDropdown = ({ deviceType = "" }) => {
  const dispatch = useDispatch();
  const { allCourses: dataList } = useSelector((state) => state.allCourses);
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getCourse = (course) => {
    setDropdownOpen(false);
    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.SELECT_COURSE_FOR_SYLLABUS,
      payload: course,
    });
    dispatch(getSyllabusPaginationAction(1, "", course._id));
  };

  useEffect(() => {
    dispatch(getAllCoursesAction());
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
        <h2>{selectedCourse ? selectedCourse.name : "Ixtisaslar"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {dataList.map((item) => (
            <li key={item._id} onClick={() => getCourse(item)}>
              {selectedCourse === item._id && <CheckIcon />}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
