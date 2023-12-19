import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ReactComponent as CheckIcon } from "../../../../../../assets/icons/Checkbox.svg";
import ProfileInput from "./ProfileInput";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";

const ProfileList = ({
  formik,
  updateModalState,
  modalData,
}) => {
  const dispatch = useDispatch();
  const { generalProfileList } = useCustomHook();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileErrMessage, setProfileErrMessage] = useState(false);

  const deleteClass = (index) => {
    if (modalData.profiles.length === 1) {
      updateModalState("profiles", []);
    } else {
      const profileData = [...modalData.profiles];
      profileData.splice(index, 1);
      updateModalState("profiles", profileData);
    }
  };
  const addProfile = () => {
    if (modalData.profiles) {
      // the same element can't be added twice
      if (
        modalData.profiles.find((item) => item.profile === selectedProfile.key)
      ) {
        setProfileErrMessage(true);
      } else {
        const profileData = [
          ...modalData?.profiles,
          { profile: selectedProfile.key, power: "" },
        ];
        setProfileErrMessage(false);
        updateModalState("profiles", profileData);
      }
    } else {
      const profileData = [{ profile: selectedProfile.key, power: "" }];
      setProfileErrMessage(false);
      updateModalState("profiles", profileData);
    }
    setSelectedProfile("");
    setOpenDropdown(false);
  };

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
              label="Profillər"
              autoComplete="off"
              value={selectedProfile?.name || ""}
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
            {generalProfileList.map((item, index) => (
              <li key={index} onClick={() => setSelectedProfile(item)}>
                {modalData?.profiles?.find(
                  (obj) => obj.profile === item.key
                ) ? (
                  <CheckIcon />
                ) : null}
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <button
            disabled={!selectedProfile}
            onClick={() => addProfile()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>

      {formik.errors.profiles && formik.touched.profiles && (
        <small className="validation-err-message">
          {formik.errors.profiles}
        </small>
      )}

      <ul className="category-list courses-li">
        {profileErrMessage ? (
          <small className="category-error-message">
            Fənn artıq mövcuddur.
          </small>
        ) : null}

        {modalData?.profiles?.map((item, index) => (
          <ProfileInput
            key={index}
            index={index}
            data={item}
            deleteClass={deleteClass}
            modalData={modalData}
            updateModalState={updateModalState}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
