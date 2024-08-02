import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/Checkbox.svg";
import {
  SYLLABUS_ALL_ACTIONS_TYPE,
  STUDENT_STATUS_FILTER_ACTION_TYPE,
} from "../../../redux/actions-type";
import { getAllCoursesAction } from "../../../redux/actions/coursesActions";
import { getSyllabusPaginationAction } from "../../../redux/actions/syllabusActions";
import { getStudentsPaginationAction } from "../../../redux/actions/studentsActions";
// import { useLocation } from "react-router-dom";

export const CoursesDropdown = ({ deviceType = "" }) => {
  const dispatch = useDispatch();
  const { allCourses: dataList } = useSelector((state) => state.allCourses);
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // const location = useLocation();

  useEffect(() => {
    return () => {
      dispatch({
        type: SYLLABUS_ALL_ACTIONS_TYPE.CLEAR_COURSE,
      });

      dispatch({
        type: STUDENT_STATUS_FILTER_ACTION_TYPE.CLEAR_STUDENT_COURSEID,
      });
    };
  }, [dispatch]);




  const getCourse = (course) => {
    // console.log(course)
    setDropdownOpen(false);
    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.SELECT_COURSE_FOR_SYLLABUS,
      payload: course,
    });
    dispatch({
      type: STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_COURSEID,
      payload: course._id,
    });

    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.RESET_SYLLABUS_PAGINATION,
    });

    dispatch(getSyllabusPaginationAction(0, "", course._id));
  };

  const handleAllCourse = () => {
    dispatch({
      type: STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_COURSEID,
      payload: "",
    });
    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.SELECT_COURSE_FOR_SYLLABUS,
      payload: null,
    });
    setDropdownOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCoursesAction());
  }, [dispatch]);

  const handleChangeDrop = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div className="dropdown-head" onClick={handleChangeDrop}>
        <h2>{selectedCourse ? selectedCourse.name : "İxtisaslar"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          <li onClick={handleAllCourse}>Hamısı</li>
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
