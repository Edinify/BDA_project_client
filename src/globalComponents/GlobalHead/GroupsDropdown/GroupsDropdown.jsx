import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/Checkbox.svg";
import {
  DROPDOWN_GROUP_ACTIONS_TYPE,
} from "../../../redux/actions-type";
import { getGroupsAction } from "../../../redux/actions/groupsActions";
import { getLessonTablePaginationAction } from "../../../redux/actions/lessonTableActions";

export const GroupsDropdown = ({ deviceType = "" }) => {
  const dispatch = useDispatch();
  const { groupData: dataList } = useSelector((state) => state.groupsPagination);
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getCourse = (group) => {
    setDropdownOpen(false);
    dispatch({
      type: DROPDOWN_GROUP_ACTIONS_TYPE.SELECT_GROUP,
      payload: group,
    });
    dispatch(getLessonTablePaginationAction(1, "", group._id));
  };

  useEffect(() => {
    dispatch(getGroupsAction());
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
        <h2>{selectedGroup ? selectedGroup.name : "Qruplar"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {dataList.map((item) => (
            <li key={item._id} onClick={() => getCourse(item)}>
              {selectedGroup === item._id && <CheckIcon />}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
