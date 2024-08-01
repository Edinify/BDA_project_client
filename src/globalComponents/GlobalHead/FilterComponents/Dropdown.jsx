import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";
import { FILTER_ACTION_TYPE } from "../../../redux/actions-type";
import { getAllCoursesAction } from "../../../redux/actions/coursesActions";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";

export const Dropdown = ({ deviceType = "", type }) => {
  const dispatch = useDispatch();
  const {
    course,
    status,
    whereComing,
    startDate,
    endDate,
    group,
    teacher,
    paymentType,
  } = useSelector((state) => state.filter);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const { allCourses } = useSelector((state) => state.allCourses);
  const { constStatusList } = useCustomHook();
  const { whereComingList } = useCustomHook();

  const [selectedOption, setSelectedOption] = useState();

  const handleClick = (item) => {
    setDropdownOpen(false);

    switch (type) {
      case "course": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { course: item },
        });
        return;
      }
      case "status": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { status: item?.key || "" },
        });
        return;
      }
      case "whereComing": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { whereComing: item?.key || "" },
        });
        return;
      }
      default:
        return;
    }
  };

  const handleChangeDrop = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (dropdownOpen) {
      switch (type) {
        case "course": {
          dispatch(getAllCoursesAction());
        }
      }
    }
  }, [dropdownOpen]);

  useEffect(() => {
    switch (type) {
      case "course": {
        setDataList(allCourses);
        return;
      }
      case "status": {
        setDataList(constStatusList);
        return;
      }
      case "whereComing": {
        setDataList(whereComingList);
        return;
      }
      default:
        return;
    }
  }, [allCourses]);

  useEffect(() => {
    switch (type) {
      case "course": {
        setSelectedOption(course?.name || "İxtisaslar");
        return;
      }
      case "status": {
        setSelectedOption(
          constStatusList.find((item) => item.key === status)?.name ||
            "Statuslar"
        );
        return;
      }
      case "whereComing": {
        setSelectedOption(
          whereComingList.find((item) => item.key === whereComing)?.name ||
            "Bizi haradan eşidiblər"
        );
        return;
      }
      default:
        return;
    }
  }, [
    course,
    status,
    whereComing,
    startDate,
    endDate,
    group,
    teacher,
    paymentType,
  ]);

  console.log(type, "type");
  console.log({
    course,
    status,
    whereComing,
    startDate,
    endDate,
    group,
    teacher,
    paymentType,
  });

  return (
    <div
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div className="dropdown-head" onClick={handleChangeDrop}>
        <h2>{selectedOption}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          <li onClick={() => handleClick("")}>Hamısı</li>
          {(type === "course" &&
            dataList.map((item) => (
              <li key={item._id} onClick={() => handleClick(item)}>
                {item.name}
              </li>
            ))) ||
            dataList.map((item, i) => (
              <li key={i} onClick={() => handleClick(item)}>
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
