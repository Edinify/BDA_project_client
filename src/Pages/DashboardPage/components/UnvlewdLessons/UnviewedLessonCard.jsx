import React, { useState } from "react";
import { ReactComponent as ArrowRightICon } from "../../../../assets/icons/dashboard/arrow-narrow-right.svg";
import moment from 'moment';
import "moment/locale/az";

const UnviewedLessonCard = ({ data, openModal }) => {
  const weeks = [
    {
      week: "",
      day: ""
    },
    {
      week: "B.e",
      day: 1
    },
    {
      week: "Ç.a",
      day: 2
    },
    {
      week: "Ç.",
      day: 3
    },
    {
      week: "C.a",
      day: 4
    },
    {
      week: "C.",
      day: 5
    },
    {
      week: "Ş.",
      day: 6
    },
    {
      week: "B.",
      day: 7
    },
  ];


  return (
    <tr>
      <td className="name">
        <div>{data?.teacher?.fullName}</div>
        {data?.teacher?.fullName?.length > 15 && <p>{data?.teacher?.fullName}</p>}
      </td>
      <td>
        {data?.lessons.map((lesson, index) => (
          <div key={index} className="cell-con">
            <div className="cell short">{lesson?.createdAt && moment(lesson?.date).locale('az').format('DD MMM')}</div>
            <div className="cell short">{weeks.find((week) => week.day === lesson?.day).week }</div>
            <div className="cell">
              {lesson?.time}
              <div className="arrow-icon" onClick={() =>  openModal({getLesson: [lesson]})}>
                <ArrowRightICon />
                <p className="change-status">Statusu dəyiş</p>
              </div>
            </div>
          </div>
        ))}
      </td>
    </tr>
  );
};

export default UnviewedLessonCard;
