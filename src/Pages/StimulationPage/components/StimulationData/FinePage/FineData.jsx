import { useDispatch, useSelector } from "react-redux";
import FineCard from "./FineCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { useEffect, useState } from "react";
import { getFinePaginationAction } from "../../../../../redux/actions/fineActions";
import { clearSearchValue } from "../../../../../redux/actions/clearSearchValueAction";

const FineData = ({ finePageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { fineData, totalPages, loading } = useSelector(
    (state) => state.fineData
  );
  const { fineSearchValues } = useSelector((state) => state.searchValues);
  const dataHead = [
    { id: 1, label: "Müəllim adı" },
    { id: 2, label: "Cərimə növü" },
    { id: 3, label: "Rəy" },
    { id: 4, label: "Tarix" },
    { id: 5, label: "" },
  ];
  useEffect(() => {
    if (fineSearchValues) {
      dispatch(getFinePaginationAction(1, fineSearchValues, "", ""));
    } else {
      dispatch(getFinePaginationAction(1, "", "", "all"));
    }
    return () => {
      dispatch(clearSearchValue());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table fine-table">
            <thead>
              <tr>
                {dataHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fineData?.map((bonus, i) => (
                <FineCard
                  key={i}
                  data={bonus}
                  mode="desktop"
                  cellNumber={i + 1 + (finePageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {fineData?.map((bonus, i) => (
              <FineCard
                key={i}
                data={bonus}
                mode="tablet"
                cellNumber={i + 1 + (finePageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={finePageNum}
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

export default FineData;
