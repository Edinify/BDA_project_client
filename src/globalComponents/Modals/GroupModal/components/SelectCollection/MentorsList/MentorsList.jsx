import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ReactComponent as CheckIcon } from "../../../../../../assets/icons/Checkbox.svg";
import MentorInput from "./MentorInput";
import { getActiveTeachersAction } from "../../../../../../redux/actions/teachersActions";

const MentorsList = ({ formik, updateModalState, modalData }) => {
  const dispatch = useDispatch();
  const { teachers: dataList } = useSelector(
    (state) => state.teachersPagination
  );
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [profileErrMessage, setProfileErrMessage] = useState(false);

  const deleteItem = (_id) => {
    if (modalData.mentors.length === 1) {
      updateModalState("mentors", []);
    } else {
      const mentorsData = modalData.mentors.filter(
        (teacher) => teacher._id !== _id
      );
      updateModalState("mentors", mentorsData);
    }
  };
  const addItem = () => {
    if (modalData.mentors) {
      // the same element can't be added twice
      if (modalData.mentors.find((item) => item._id === selectedItem._id)) {
        setProfileErrMessage(true);
      } else {
        const mentorsData = [...modalData?.mentors, selectedItem];
        setProfileErrMessage(false);
        updateModalState("mentors", mentorsData);
      }
    } else {
      const mentorsData = [selectedItem];
      setProfileErrMessage(false);
      updateModalState("mentors", mentorsData);
    }
    setSelectedItem("");
    setOpenDropdown(false);
  };

  useEffect(() => {
    dispatch(getActiveTeachersAction());
  }, []);

  return (
    <div>
      <div className="dropdown-input courses">
        <div className="left">
          <div className="input-box">
            <TextField
              sx={{
                "& input": { fontSize: "12px", marginRight: "32px" },
                marginTop: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Mentorlar"
              autoComplete="off"
              value={selectedItem?.fullName || ""}
              disabled
              onClick={() => setOpenDropdown(!openDropdown)}
            />

            <div
              className="dropdown-icon"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <svg
                className={!openDropdown ? "down" : "up"}
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07999 9.4502"
                  stroke="#5D5D5D"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <ul className={`dropdown-body ${openDropdown ? "active" : ""}`}>
            {dataList?.map((item, index) => (
              <li key={item._id} onClick={() => setSelectedItem(item)}>
                {modalData?.mentors?.find((obj) => obj._id === item._id) ? (
                  <CheckIcon />
                ) : null}
                <h4>{item.fullName}</h4>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <button
            disabled={!selectedItem}
            onClick={() => addItem()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>

      {formik.errors.mentors && formik.touched.mentors && (
        <small className="validation-err-message">
          {formik.errors.mentors}
        </small>
      )}

      <ul className="category-list courses-li">
        {profileErrMessage ? (
          <small className="category-error-message">
            İxtisas artıq mövcuddur.
          </small>
        ) : null}

        {modalData?.mentors?.map((item, index) => (
          <MentorInput
            key={index}
            index={index}
            data={item}
            deleteItem={deleteItem}
            modalData={modalData}
            updateModalState={updateModalState}
          />
        ))}
      </ul>
    </div>
  );
};

export default MentorsList;
