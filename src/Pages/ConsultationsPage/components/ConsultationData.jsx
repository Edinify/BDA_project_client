import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConsultationCard from "./ConsultationCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";

const ConsultationData = ({ pageNum, getPageNumber }) => {
  const { totalPages } = useSelector(
    (state) => state.consultationPagination
  );
  const consultationData = [
    {
      firstStepData: {
        studentName: 'Eli eliyev',
        contactDate: '20.12.2000',
        source: 'instagramStandart',
        phone: 34555,
        department: '3d',
        constDate: '22.12.2000',
        constTime: '15:00',
      },
      secondStepData: {
        department: '3d',
        constDate: '22.12.2000',
        constTime: '15:00',
        teacher: "kimse",
        persona: "Həvəsli",
        knowledge: "Sıfır",
        sale: "Satış",
        cancellReason: "Vaxt Uyğunsuzluğu",
        saleType: "Tam ödəniş",
        additionalInfo: ""
      },
      firstStepDone: true,
      secondStepDone: true,
    },
    {
      firstStepData: {
        studentName: 'Eli eliyev',
        contactDate: '20.12.2000',
        source: 'instagramStandart',
        phone: 34555,
        department: '3d',
        constDate: '22.12.2000',
        constTime: '15:00',
      },
      secondStepData: {
        department: '3d',
        constDate: '22.12.2000',
        constTime: '15:00',
        teacher: "kimse",
        persona: "Həvəsli",
        knowledge: "Sıfır",
        sale: "Satış",
        cancellReason: "Vaxt Uyğunsuzluğu",
        saleType: "Tam ödəniş",
        additionalInfo: ""
      },
      firstStepDone: true,
      secondStepDone: false,
    },
    {
      firstStepData: {
        studentName: 'Eli eliyev',
        contactDate: '20.12.2000',
        source: 'instagramStandart',
        phone: 34555,
        department: '3d',
        constDate: '22.12.2000',
        constTime: '15:00',
      },
      secondStepData: {
        department: '3d',
        constDate: '22.12.2000',
        constTime: '15:00',
        teacher: "kimse",
        persona: "Həvəsli",
        knowledge: "Sıfır",
        sale: "Satış",
        cancellReason: "Vaxt Uyğunsuzluğu",
        saleType: "Tam ödəniş",
        additionalInfo: ""
      },
      firstStepDone: false,
      secondStepDone: false,
    }
  ]
  const { loading } = useSelector((state) => state.consultationPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const tableHead = [
    "Ad Soyad",
    "Əlaqə tarixi",
    "Mənbə",
    "Tel No",
    "İxtisas",
    "Kons tarix",
    "Kons saat",
    "Təyin edildi",
    "Baş tutdu",
    "",
  ];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openMoreModal && (
            <MoreModal
              data={consultationData}
              setOpenMoreModal={setOpenMoreModal}
              type="student"
            />
          )}
          <div className="table-con">
            <table className="details-table  student-table">
              <thead>
                <tr>
                  {tableHead.map((head, i) => (
                    <th key={i}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consultationData?.map((student, i) => (
                  <ConsultationCard
                    key={i}
                    data={student}
                    mode="desktop"
                    setOpenMoreModal={setOpenMoreModal}
                    cellNumber={i + 1 + (pageNum - 1) * 10}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="details-list-tablet with-more">
            {consultationData?.map((student, i) => (
              <ConsultationCard
                key={i}
                data={student}
                mode="tablet"
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1 + (pageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={pageNum}
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

export default ConsultationData;
