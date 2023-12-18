import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TeacherFeedbackCard from "./TeacherFeedbackCard"
import { getFeedbackPaginationAction } from '../../../../../redux/actions/generalfeedbackActions';
import { Pagination } from 'antd';
import Loading from '../../../../../globalComponents/Loading/Loading';
import { clearSearchValue } from '../../../../../redux/actions/clearSearchValueAction';

const TeacherFeedbackData = ({feedbackPageNum,getPageNumber}) => {
  const dispatch = useDispatch();
  const {feedbackData,totalPages,loading} = useSelector(state=>state.feedbackData)
  const { feedbackSearchValues } = useSelector((state) => state.searchValues);

  const teacherHead = [
    { id: 1, label: "Müəllim adı" },
    { id: 2, label: "Kim haqqında (Tələbə)" },
    { id: 3, label: "Rəy" },
    { id: 4, label: "Tarix" },
    { id: 5, label: "" },
  ];

  useEffect(()=>{
    if(feedbackSearchValues){
      dispatch(getFeedbackPaginationAction(1,"","",feedbackSearchValues,"teacher"))
    }
    else {
      dispatch(getFeedbackPaginationAction(1,"","","","teacher"))
    }
    return ()=>{
      dispatch(clearSearchValue())
    }
  },[dispatch])
  return (
    <>
    {loading ?
    <Loading/>
    :
    <>
          <table className="details-table incomes-table">
            <thead>
              <tr>
                {teacherHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feedbackData?.map((feedback, i) => (
                <TeacherFeedbackCard
                  key={i}
                  data={feedback}
                  mode="desktop"
                  cellNumber={i + 1 + (feedbackPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet tablet-more-page ">
            {feedbackData?.map((feedback, i) => (
              <TeacherFeedbackCard
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
    }
    </>
       
  )
}

export default TeacherFeedbackData