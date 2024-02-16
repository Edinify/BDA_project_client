import React, { useState } from "react";
import { TextField } from "@mui/material";
import { ReactComponent as MinusIcon } from "../../../../../../assets/icons/minus-cirlce.svg";
import { ReactComponent as CheckIcon } from "../../../../../../assets/icons/Checkbox.svg";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";

const ProfileInput = ({
  data,
  index,
  deleteClass,
  modalData,
  updateModalState,
}) => {
  const { generalProfileList, generalProfilePowerList } = useCustomHook();
  const [openDropdown, setOpenDropdown] = useState(false);
  const profileName = generalProfileList.find(
    (item) => item.key === data.profile
  )?.name;

  console.log(generalProfileList, "generalProfileList");
  const addPower = (selectedPower) => {
    const profileData = [...modalData?.profiles];
    profileData[index] = { ...profileData[index], power: selectedPower };
    updateModalState("profiles", profileData);
    setOpenDropdown(false);
  };

  console.log(data, 'rehman')

  return (
    <li>
      <div className="top">
        {`${index + 1}. ${profileName}`}
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteClass(index)}
          />
        </div>
      </div>
      <div className="dropdown-input">
        <div className="input-box">
          <TextField
            sx={{
              "& input": { fontSize: "12px", marginRight: "32px" },
              marginTop: "16px",
            }}
            InputLabelProps={{
              style: { fontSize: "12px", color: "#3F3F3F" },
              shrink: data.power ? true : false,
            }}
            fullWidth
            label="Səlahiyyət"
            autoComplete="off"
            type="text"
            value={
              generalProfilePowerList.find((item) => item.key === data.power)
                ?.name || ""
            }
            disabled
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
          {generalProfilePowerList.map((item, i) => (
            <li key={i} onClick={() => addPower(item.key)}>
              {modalData?.profiles[index].power === item.key ? (
                <CheckIcon />
              ) : null}
              <h4>{item.name}</h4>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default ProfileInput;
