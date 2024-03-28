import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentCard from "./StudentCard";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const StudentsData = ({ studentPageNum, userData, getNextStudents }) => {
  const { students, hasMore } = useSelector(
    (state) => state.studentsPagination
  );
 
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.studentsModal);
  const tableHead = [
    "Tələbə adı",
    "Fin",
    "Seriya",
    "Doğum günü",
    "Mobil nömrə",
    "Bizi haradan eşidiblər?",
    "Haradan gəliblər",
    "İxtisas",
    "Qrup",
    "Q/B",
    "",
  ];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  // // console.log(hasMore,"has more")

  return (
    <>
      {openMoreModal && (
        <MoreModal
          setOpenMoreModal={setOpenMoreModal}
          type="student"
          userData={userData}
        />
      )}

      {openConfirmModal && <ConfirmModal type="student" />}

      <InfiniteScroll
        dataLength={students.length}
        next={getNextStudents}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={550}
        scrollThreshold={0.7}
      >
        <table
          style={{ marginBottom: "50px" }}
          className={`details-table  student-table ${
            userData.power === "only-show" ? "only-show" : "update"
          } `}
        >
          <thead>
            <tr>
              {tableHead.map((head, i) => (
                <th key={i}>{head}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students?.map((student, i) => (
              <StudentCard
                key={i}
                data={student}
                mode="desktop"
                student={userData}
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1}
              />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      <div className="details-list-tablet with-more">
        {students?.map((student, i) => (
          <StudentCard
            key={i}
            data={student}
            mode="tablet"
            student={userData}
            setOpenMoreModal={setOpenMoreModal}
            cellNumber={i + 1}
          />
        ))}
      </div>
    </>
  );
};

export default StudentsData;
