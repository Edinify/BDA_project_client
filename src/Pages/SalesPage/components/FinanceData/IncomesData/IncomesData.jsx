import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IncomesCard from "./IncomesCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { getIncomePaginationAction } from "../../../../../redux/actions/incomeActions";

const IncomesData = () => {
  const dispatch = useDispatch();
  const {
    financeMonthsFilter,
    financeChooseDate,
    financeIncomeCategory,
    financeIncomeSorting,
  } = useSelector((state) => state.financeDateFilter);
  const {
    incomes,
    totalPages,
    loading,
    lastPage: incomesPageNum,
  } = useSelector((state) => state.incomes);
  const dataHead = [
    { id: 1, label: "Lead sayı" },
    { id: 2, label: "tarix" },
    { id: 6, label: "" },
  ];

  const getPageNumberIncomes = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        getIncomePaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "", //month
          financeIncomeCategory
            ? financeIncomeCategory !== "all"
              ? financeIncomeCategory.key
              : ""
            : "",
          financeIncomeSorting ? financeIncomeSorting.key : "oldest"
        )
      );
    } else {
      dispatch(
        getIncomePaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1, //month
          financeIncomeCategory
            ? financeIncomeCategory !== "all"
              ? financeIncomeCategory.key
              : ""
            : "",
          financeIncomeSorting ? financeIncomeSorting.key : "oldest"
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
              {incomes?.map((income, i) => (
                <IncomesCard
                  key={i}
                  data={income}
                  mode="desktop"
                  cellNumber={i + 1 + (incomesPageNum - 1) * 10}
                />
              ))}

              <tr>
                <td>
                  <div className="td-con">
                    <div className="table-scroll-text">47</div>
                    <div className="right-fade"></div>
                  </div>
                </td>
                <td>
                  <div className="td-con">
                    <div className="table-scroll-text">16.01.2024</div>
                    <div className="right-fade"></div>
                  </div>
                </td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <div className="td-con">
                    <div className="table-scroll-text">40</div>
                    <div className="right-fade"></div>
                  </div>
                </td>
                <td>
                  <div className="td-con">
                    <div className="table-scroll-text">17.01.2024</div>
                    <div className="right-fade"></div>
                  </div>
                </td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <div className="td-con">
                    <div className="table-scroll-text">90</div>
                    <div className="right-fade"></div>
                  </div>
                </td>
                <td>
                  <div className="td-con">
                    <div className="table-scroll-text">18.01.2024</div>
                    <div className="right-fade"></div>
                  </div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="details-list-tablet incomes-page  ">
            {incomes?.map((income, i) => (
              <IncomesCard
                key={i}
                data={income}
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

export default IncomesData;
