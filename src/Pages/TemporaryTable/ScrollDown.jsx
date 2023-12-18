import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCoursesPaginationAction } from '../../redux/actions/coursesActions';

const ScrollableData = () => {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const scrollableElementRef = useRef(null);
  const dispatch = useDispatch();
  const { courses, totalPages, lastPage, loading } = useSelector((state) => state.coursesPagination);

  const scrollableElement = scrollableElementRef.current;

  const handleScroll = () => {
    // const scrollableElement = scrollableElementRef.current;
    if ((scrollableElement.scrollHeight - scrollableElement.scrollTop) === scrollableElement.clientHeight) {
      // if(lastPage < totalPages) {
        // dispatch(getCoursesPaginationAction(lastPage + 1, ""));
      // }
    }
  };

  useEffect(() => {
    setData([...data, ...courses])
  }, [courses])


  useEffect(() => {
    // const scrollableElement = scrollableElementRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastPage]);

  useEffect(() => {
    dispatch(getCoursesPaginationAction(1, ""));
  }, [])
  

  return (
    <div
      ref={scrollableElementRef}
      style={{
        width: '300px',
        height: '200px',
        overflow: 'auto',
        border: '1px solid #ccc',
        backgroundColor: 'red'
      }}
    >
      { data.map((item, index) => (
        <h2 key={index}>{item?.name}</h2>
      ))}
      {loading && <h3>loading...</h3>}

    </div>
  );
};

export default ScrollableData;
