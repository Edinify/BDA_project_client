import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IncomesCard from "./LeadCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { getIncomePaginationAction } from "../../../../../redux/actions/incomeActions";
import LeadCard from "./LeadCard";
import { getLeadPaginationAction } from "../../../../../redux/actions/leadActions";

const LeadData = () => {
  const dispatch = useDispatch();
  const {
    financeMonthsFilter,
    financeChooseDate,
    financeIncomeCategory,
    financeIncomeSorting,
  } = useSelector((state) => state.financeDateFilter);
  const {
    leads,
    totalPages,
    loading,
    lastPage: incomesPageNum,
  } = useSelector((state) => state.leads);

  const dataHead = [
    { id: 1, label: "Lead sayı" },
    { id: 2, label: "tarix" },
    { id: 6, label: "" },
  ];

  const getPageNumberIncomes = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        getLeadPaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "" //month
        )
      );
    } else {
      dispatch(
        getLeadPaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1 //month
        )
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table incomes-table">
            <thead>
              <tr>
                {dataHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads?.map((lead, i) => (
                <LeadCard
                  key={i}
                  data={lead}
                  mode="desktop"
                  cellNumber={i + 1 + (incomesPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet incomes-page  ">
            {leads?.map((lead, i) => (
              <LeadCard
                key={i}
                data={lead}
                mode="tablet"
                cellNumber={i + 1 + (incomesPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={incomesPageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumberIncomes}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LeadData;
