import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import EventCard from "./EventCard";

const EventsData = ({ userData, eventPageNum, getPageNumber }) => {
  const { events, totalPages } = useSelector((state) => state.eventsPagination);
  const { loading } = useSelector((state) => state.eventsPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.coursesModal);
  const tableHead = [
    { id: 1, label: "Tədbir adı" },
    { id: 2, label: "Tarix" },
    { id: 3, label: "Saat" },
    { id: 4, label: "Qonaq" },
    { id: 5, label: "Spiker" },
    { id: 6, label: "İştirakçı sayı" },
    { id: 7, label: "status" },
    { id: 8, label: "" },
  ];
  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  // console.log(userData);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openMoreModal && (
            <MoreModal
              setOpenMoreModal={setOpenMoreModal}
              type="event"
              userData={userData}
            />
          )}

          {openConfirmModal && <ConfirmModal type="courses" />}

          <table
            className={`details-table   ${
              userData.power === "only-show" ? "only-show" : "update"
            } `}
          >
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {events.map((event, i) => (
                <EventCard
                  key={i}
                  data={event}
                  userData={userData}
                  mode="desktop"
                  cellNumber={i + 1 + (eventPageNum - 1) * 10}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet course-list-mobile">
            <h3 className="details-list-title">Tədbir adı</h3>
            {events.map((event, i) => (
              <EventCard
                key={i}
                data={event}
                userData={userData}
                mode="mobile"
                cellNumber={i + 1 + (eventPageNum - 1) * 10}
                setOpenMoreModal={setOpenMoreModal}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={eventPageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EventsData;
