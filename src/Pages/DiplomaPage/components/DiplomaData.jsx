import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import DiplomaCard from "./DiplomaCard";
import { useEffect, useState } from "react";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const DiplomaData = ({ getNextDiplomas }) => {
  const { diplomaData, hasMore } = useSelector(
    (state) => state.diplomaPagination
  );

  const [scrollHeight, setScrollHeight] = useState(1);

  useEffect(() => {
    const mainHeader = document.querySelector(".main-header");
    const detailsHeader = document.querySelector(".details-header");

    const handleResize = () => {
      setScrollHeight(
        window.innerHeight -
          mainHeader.offsetHeight -
          detailsHeader.offsetHeight
      );
    };

    setScrollHeight(
      window.innerHeight - mainHeader.offsetHeight - detailsHeader.offsetHeight
    );

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(diplomaData, "diplomaaa");

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
      <InfiniteScroll
        dataLength={diplomaData?.length}
        next={getNextDiplomas}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={scrollHeight}
        scrollThreshold={0.7}
      >
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
      </InfiniteScroll>
    </div>
  );
};

export default DiplomaData;
