import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";
import { useDispatch, useSelector } from "react-redux";
import { getAllSyllabusAction } from "../../../../../redux/actions/syllabusActions";

const Topic = ({ formik, modalData, updateModalState }) => {
  const dispatch = useDispatch()
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const { syllabusData: dataList } = useSelector(
    (state) => state.syllabusPagination
  );
  const inputValue =  modalData.topic ? `${modalData.topic.orderNumber}. ${modalData.topic.name}` : ''
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("topic", item)
    setOpenDropdown(false)
  };

  useEffect(() => {
    dispatch(getAllSyllabusAction(selectedGroup.course))
  }, [])

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
              label="Mövzu"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("topic", true)}
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
            {dataList.map((item) => (
              <li key={item._id} onClick={() => addData(item)}>
                <h4>{item.orderNumber}. {item.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.topic && formik.touched.topic && (
        <small className="validation-err-message">
          {formik.errors.topic}
        </small>
      )}
    </>
  );
};

export default Topic;
