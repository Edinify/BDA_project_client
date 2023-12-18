import React, {useState} from "react";
import moment from "moment";


const TeacherBonusCard = ({bonus}) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="context-con">
      <div className="top">
        <h2 className="title">{bonus?.amount}</h2>
        <p className="date">{bonus?.createdAt && moment(bonus.createdAt).format("DD.MM.YYYY")}</p>
      </div>

      <div className="bottom">
        {bonus.comment.length > 170 ? (
          <p className="description">
            {showFull
              ? `${bonus?.comment}...`
              : `${bonus?.comment.slice(0, 170)}...`}

            <span className="read-more" onClick={() => setShowFull(!showFull)}>
              {showFull ? "Daha az" : "Daha çox"}
            </span>
          </p>
        ) : (
          <p className="description">{bonus?.comment}</p>
        )}
      </div>
    </div>
  );
};

export default TeacherBonusCard;
