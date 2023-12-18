import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentFeedbackCard from "./StudentFeedbackCard";
import { getFeedbackPaginationAction } from "../../../../../redux/actions/generalfeedbackActions";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { clearSearchValue } from "../../../../../redux/actions/clearSearchValueAction";

export const StudentFeedbackData = ({ feedbackPageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { studentFeedbackSearchValues } = useSelector((state) => state.searchValues);
  const { feedbackData, totalPages, loading } = useSelector(
    (state) => state.feedbackData
  );

  const student = [
    { id: 1, label: "Tələbə adı" },
    { id: 2, label: "Kim haqqında (Müəllim)" },
    { id: 3, label: "Rəy" },
    { id: 4, label: "Tarix" },
    { id: 5, label: "" },
  ];

  useEffect(() => {
    if (studentFeedbackSearchValues) {
      dispatch(
        getFeedbackPaginationAction(1, "", "", studentFeedbackSearchValues, "student")
      );
    } else {
      dispatch(getFeedbackPaginationAction(1, "", "", "", "student"));
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
          <table className="details-table incomes-table">
            <thead>
              <tr>
                {student.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feedbackData?.map((feedback, i) => (
                <StudentFeedbackCard
                  key={i}
                  data={feedback}
                  mode="desktop"
                  cellNumber={i + 1 + (feedbackPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet">
            {feedbackData?.map((feedback, i) => (
              <StudentFeedbackCard
                key={i}
                data={feedback}
                mode="tablet"
                cellNumber={i + 1 + (feedbackPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={feedbackPageNum}
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
