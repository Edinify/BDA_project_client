import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import DiplomaCard from "./DiplomaCard";

const DiplomaData = () => {
  const { diplomaData } = useSelector((state) => state.diplomaData);

  const tableHead = [
    "Tələbənin adı",
    "Qrup nömrəsi",
    "Dərəcə",
    "Tarix",
    "Seriya",
    "Status",
    "",
  ];
  return (
    <div className="diploma-table-container">
      {/* <InfiniteScroll
          dataLength={careerData?.length}
          next={getNextCareers}
          hasMore={hasMore}
          loader={<SmallLoading />}
          endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
          height={scrollHeight}
          scrollThreshold={0.7}
        > */}
      <table className="details-table diploma-table">
        <thead>
          <tr>
            {tableHead.map((head, i) => (
              <th key={i}>{head}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {diplomaData?.map((career, i) => (
            <DiplomaCard
              key={i}
              data={career}
              mode="desktop"
              cellNumber={i + 1}
            />
          ))}
        </tbody>
      </table>
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default DiplomaData;
