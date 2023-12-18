import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import MoreModal from "../../../../../globalComponents/MoreModal/MoreModal";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteFeedbackAction } from "../../../../../redux/actions/generalfeedbackActions";

const StudentFeedbackCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const [openMoreModal, setOpenMoreModal] = useState(false);

  const deleteItem = () => {
    dispatch(deleteFeedbackAction(data._id));
  };
  const openMoreModalFunc = () => {
    setOpenMoreModal(true);
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data?.student.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>{data.teacher.fullName}</td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.feedback}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {data.createdAt
                  ? moment(data.createdAt).format("DD-MM-YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <UpdateDeleteModal
              deleteItem={deleteItem}
              data={data}
              dataType="feedback"
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.student.fullName}</h3>
            <ul>
              <li>
                <span className="type">Kim haqqında:</span>
                <p>{data.teacher?.fullName ? data.teacher.fullName : "boş"}</p>
              </li>
              <li>
                <span className="type">Rəy:</span>
                <p>{data.feedback ? data.feedback : "boş"}</p>
              </li>
              <li>
                <span className="type"> Tarix:</span>
                <p>
                  {data.createdAt
                    ? moment(data.createdAt).format("YYYY-MM-DD")
                    : "boş"}
                </p>
              </li>
            </ul>
          </div>
          <div className="right">
            <span onClick={() => openMoreModalFunc()}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Icons/Line/Arrows/chevron-right">
                  <path
                    id="Icon"
                    d="M9 18L15 12L9 6"
                    stroke="#717171"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </span>

            {openMoreModal && (
              <MoreModal
                setOpenMoreModal={setOpenMoreModal}
                type="feedback-student"
                data={data}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StudentFeedbackCard;
