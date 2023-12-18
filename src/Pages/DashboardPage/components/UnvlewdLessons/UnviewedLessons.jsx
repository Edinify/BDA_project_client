import React, { useState, useEffect } from "react";
import "./unviewedLessons.css";
import { useSelector, useDispatch } from "react-redux";
import UnviewedLessonCard from "./UnviewedLessonCard";
import MainTeacherModal from "../../../../globalComponents/Modals/MainTeacherModal/MainTeacherModal";
import { useCustomHook } from "../../../../globalComponents/GlobalFunctions/globalFunctions";

const UnviewedLessons = ({ setUnviewedLessons }) => {
  const dispatch = useDispatch();
  const { createLessonModal } = useCustomHook();
  const { unviewedLessonsData } = useSelector((state) => state.dashboardData);
  const { modalLesson, openMainPageModal } = useSelector((state) => state.modalLesson);

  const openModal = ({
    time = "",
    week = "",
    getLesson = "",
    startWeek = "",
  }) => {
    createLessonModal({ modalLesson: {time, week, getLesson, startWeek}, openModal: true })
  };


  return (
    <>
      <div className="unviewed-lessons-modal">
        <div className="unviewed-lessons-con">
          <div className="top">
            <h3 className="modal-title">Baxılmamış dərslər</h3>
            <svg
              onClick={() => setUnviewedLessons(false)}
              className="close-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#1E1E1E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="bottom">
            <table>
              <thead>
                <tr>
                  <th>Müəllim adı</th>
                  <th>
                    <div className="cell-con">
                      <div className="cell short">Tarix</div>
                      <div className="cell short">Həftə</div>
                      <div className="cell">Vaxt</div>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {unviewedLessonsData?.map((data, index) => (
                  <UnviewedLessonCard
                    openModal={openModal}
                    key={index}
                    data={data}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openMainPageModal && (
        <MainTeacherModal
          showModal={openMainPageModal}
          handleClose={() => createLessonModal({ modalLesson: {}, openModal: false })}
        />
      )}
    </>
  );
};

export default UnviewedLessons;
