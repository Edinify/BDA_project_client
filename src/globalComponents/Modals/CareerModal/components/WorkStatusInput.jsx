import React, { useState } from "react";
import { ReactComponent as MinusIcon } from "../../../../assets/icons/minus-cirlce.svg";

const WorkStatusInput = ({ data, index, deleteWorkStatus }) => {
  return (
    <li>
      <div className="top">
        {`${index + 1}. ${data.name}`}
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteWorkStatus(data.key)}
          />
        </div>
      </div>
    </li>
  );
};

export default WorkStatusInput;
