import React from "react";

const DropdownIcon = ({ setOpenDropdown, openDropdown }) => {
  return (
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
  );
};

export default DropdownIcon;
