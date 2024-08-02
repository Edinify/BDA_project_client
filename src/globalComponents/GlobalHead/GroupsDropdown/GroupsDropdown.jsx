import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow-down-dropdown.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/Checkbox.svg";
import {
  DROPDOWN_GROUP_ACTIONS_TYPE,
} from "../../../redux/actions-type";
import {
  getGroupsAction,
  getGroupsWithMentorAction,
  getGroupsWithStudentAction,
  getGroupsWithTeacherAction,
} from "../../../redux/actions/groupsActions";
// import { getLessonTablePaginationAction } from "../../../redux/actions/lessonTableActions";
// import { useLocation } from "react-router-dom";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const GroupsDropdown = ({ deviceType = "", page }) => {
  const dispatch = useDispatch();
  const { groupData: dataList } = useSelector(
    (state) => state.groupsPagination
  );
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  // const location = useLocation();
  const [groupStatus, setGroupStatus] = useState(
    page === "lesson-table" ? "current" : "all"
  );

  const getCourse = (group) => {
    setDropdownOpen(false);
    dispatch({
      type: DROPDOWN_GROUP_ACTIONS_TYPE.SELECT_GROUP,
      payload: group,
    });
  };

  useEffect(() => {
    if (user?.role === "teacher") {
      dispatch(getGroupsWithTeacherAction(user._id));
    } else if (user?.role === "mentor") {
      dispatch(getGroupsWithMentorAction(user._id));
    } else if (user?.role === "student") {
      dispatch(getGroupsWithStudentAction(user._id));
    } else {
      dispatch(getGroupsAction(groupStatus));
    }
  }, [groupStatus]);

  useEffect(() => {
    return () => {
      dispatch({
        type: DROPDOWN_GROUP_ACTIONS_TYPE.CLEAR_GROUP,
      });
    };
  }, [dispatch]);

  const handleSelectAll = () => {
    setDropdownOpen(false);
    dispatch({
      type: DROPDOWN_GROUP_ACTIONS_TYPE.SELECT_GROUP,
      payload: "",
    });
  };

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
        {page === "lesson-table" &&
          (user?.role === "super-admin" || user?.role === "worker") && (
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 20,
                },
                "& .MuiFormControlLabel-label": {
                  fontSize: 12,
                },
                width: "100%",
                display: "flex",
                justifyContent: "center",
                p: 1,
                boxSizing: "border-box",
                borderBottom: "1px solid #dddddd",
              }}
            >
              <FormControlLabel
                value="current"
                control={<Radio checked={groupStatus === "current"} />}
                label="Mövcud"
                onClick={() => {
                  setGroupStatus("current");
                }}
              />
              <FormControlLabel
                value="ended"
                control={<Radio checked={groupStatus === "ended"} />}
                label="Bitmiş"
                onClick={() => {
                  setGroupStatus("ended");
                }}
              />
            </RadioGroup>
          )}
        <ul>
          {page !== "lesson-table" && <li onClick={handleSelectAll}>Hamısı</li>}
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
