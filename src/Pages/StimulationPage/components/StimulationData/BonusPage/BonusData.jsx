import { useDispatch, useSelector } from "react-redux";
import BonusCard from "./BonusCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { useEffect, useState } from "react";
import { getBonusPaginationAction } from "../../../../../redux/actions/bonusActions";
import { clearSearchValue } from "../../../../../redux/actions/clearSearchValueAction";

const BonusData = ({ bonusPageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { bonusData, totalPages, loading } = useSelector(
    (state) => state.bonusData
  );
  const { bonusSearchValues } = useSelector((state) => state.searchValues);
  const dataHead = [
    { id: 1, label: "Müəllim adı" },
    { id: 2, label: "Rəy" },
    { id: 3, label: "Bonus" },
    { id: 4, label: "Tarix" },
    { id: 5, label: "" },
  ];
  useEffect(() => {
    if (bonusSearchValues) {
      dispatch(getBonusPaginationAction(1, bonusSearchValues, "", ""));
    } else {
      dispatch(getBonusPaginationAction(1, "", "", ""));
    }
    return () => {
      dispatch(clearSearchValue());
    };
  }, [dispatch]);

  //
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table bonus-table">
            <thead>
              <tr>
                {dataHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bonusData?.map((bonus, i) => (
                <BonusCard
                  key={i}
                  data={bonus}
                  mode="desktop"
                  cellNumber={i + 1 + (bonusPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {bonusData?.map((bonus, i) => (
              <BonusCard
                key={i}
                data={bonus}
                mode="tablet"
                cellNumber={i + 1 + (bonusPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={bonusPageNum}
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

export default BonusData;
