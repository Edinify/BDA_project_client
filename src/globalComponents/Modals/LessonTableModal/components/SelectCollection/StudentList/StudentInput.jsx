import React, { useState } from "react";
import { ReactComponent as MinusIcon } from "../../../../../../assets/icons/minus-cirlce.svg";

const StudentInput = ({
  data,
  index,
  deleteItem,
}) => {
  return (
    <li>
      <div className="top">
        {`${index + 1}. ${data.student?.fullName}`}
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteItem(data._id)}
          />
        </div>
      </div>
    </li>
  );
};

export default StudentInput;
