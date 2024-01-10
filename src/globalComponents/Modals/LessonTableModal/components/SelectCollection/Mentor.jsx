import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTeachersAction } from "../../../../../redux/actions/teachersActions";

const Mentor = ({ formik, modalData, updateModalState }) => {
  const dispatch = useDispatch();
  const { mentors } = useSelector((state) => state.dropdownGroup.selectedGroup);

  const inputValue =
    mentors.find((mentor) => mentor._id == modalData.mentor)?.fullName || "";

  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("mentor", item._id);
    setOpenDropdown(false);
  };

  useEffect(() => {
    // dispatch(getActiveTeachersAction())
  }, []);

  return (
    <>
      <div className="class-input">
        <div className="dropdown-input">
          <div className="input-box">
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
                // marginBottom: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Mentor"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("teacher", true)}
            />
            <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul
            className={`dropdown-body where-coming ${
              openDropdown ? "active" : ""
            }`}
          >
            {mentors.map((item) => (
              <li key={item._id} onClick={() => addData(item)}>
                <h4>{item.fullName}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.teacher && formik.touched.teacher && (
        <small className="validation-err-message">
          {formik.errors.teacher}
        </small>
      )}
    </>
  );
};

export default Mentor;
