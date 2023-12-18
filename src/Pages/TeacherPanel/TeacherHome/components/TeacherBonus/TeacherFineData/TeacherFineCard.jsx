import React, { useState } from "react";
import moment from "moment";
import { useCustomHook } from "../../../../../../globalComponents/GlobalFunctions/globalFunctions";

const TeacherFineCard = ({ fine }) => {
  const {fineTypeList} = useCustomHook()
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="context-con">
      <div className="top">
        <h2 className="title">{fineTypeList.find((item) => item.key === fine.fineType)?.name}</h2>
        <p className="date">{fine?.createdAt && moment(fine.createdAt).format("DD.MM.YYYY")}</p>
      </div>

      <div className="bottom">
        {fine?.comment.length > 170 ? (
          <p className="description">
            {showFull
              ? `${fine?.comment}...`
              : `${fine?.comment.slice(0, 170)}...`}

            <span className="read-more" onClick={() => setShowFull(!showFull)}>
              {showFull ? "Daha az" : "Daha çox"}
            </span>
          </p>
        ) : (
          <p className="description">{fine?.comment}</p>
        )}
      </div>
    </div>
  );
};

export default TeacherFineCard;
