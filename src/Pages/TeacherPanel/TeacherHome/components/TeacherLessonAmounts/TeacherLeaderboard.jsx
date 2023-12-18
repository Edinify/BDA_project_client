import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CupIcon } from "../../../../../assets/icons/teacherHome/trophy-01.svg";
import { getTeacherLeaderboradOrderAction } from "../../../../../redux/actions/teachersActions";
import DateDropdown from "../../../../../globalComponents/DateDropdown/DateDropdown"

const TeacherLeaderboard = () => {
  const dispatch = useDispatch();
  const { teacherLeaderboardOrder } = useSelector((state) => state.teachersPagination);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDropdownCalendar, setOpenDropdownCalendar] = useState(false);
  const [openDropdownStars, setOpenDropdownStars] = useState(false);
  const [byFilter, setByFilter] = useState('lessonCount')


      
  const applyFilterStars = (type) => {
    setByFilter(type.key)
    dispatch(getTeacherLeaderboradOrderAction("","",1,type.key))
    setOpenCalendar(false);
    setOpenDropdownCalendar(false);
    setOpenDropdownStars(false);
  };

  useEffect(() => {
    dispatch(getTeacherLeaderboradOrderAction("", "", 1, byFilter));
  }, []);


  return (
    <div className="content-box leaderboard-order">
      <div className="left orange">
        <CupIcon />
      </div>

      <div className="right">
        <div className="top">
          <h2 className="title">Uğur lövhəsi</h2>
          <DateDropdown
            optionType={"stars"}
            setOpenCalendar={setOpenCalendar}
            openCalendar={openCalendar}
            openDropdown={openDropdownStars}
            setOpenDropdown={setOpenDropdownStars}
            applyFilterStars={applyFilterStars}
          />
        </div>
        <p className="amount">
          #{teacherLeaderboardOrder?.teacherOrder || 0}/
          {teacherLeaderboardOrder?.teacherCount || 0}
        </p>
      </div>
    </div>
  );
};

export default TeacherLeaderboard;
