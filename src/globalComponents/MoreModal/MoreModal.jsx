import React, { useState } from "react";
import "./moreModal.css";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as EditIcon } from "../../assets/icons/more-modal/edit-02.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/more-modal/x-close.svg";
import {
  TEACHERS_MODAL_ACTION_TYPE,
  STUDENTS_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
import "moment/locale/az";
import TeacherMoreModal from "./components/TeacherMoreModal/TeacherMoreModal";
import StudentMoreModal from "./components/StudentMoreModal/StudentMoreModal";
const MoreModal = ({ setOpenMoreModal, type }) => {
  const dispatch = useDispatch();
  const { teachersModalData } = useSelector((state) => state.teachersModal);
  const { studentsModalData } = useSelector((state) => state.studentsModal);

  const openUpdateModal = () => {
    if (type === "teacher") {
      dispatch({
        type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
        payload: {
          data: {
            ...teachersModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "student") {
      dispatch({
        type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
        payload: {
          data: {
            ...studentsModalData,
          },
          openModal: true,
        },
      });
    }
    setOpenMoreModal(false);
  };

  return (
    <div className="more-modal">
      <div className="more-modal-con">
        <div className="more-modal-header">
          {type === "teacher" || type === "student" ? (
            <h2>Şəxsi məlumatlar</h2>
          ) : (
            ""
          )}
          <div className="more-modal-header-icons">
            <div className="header-icon-edit">
              <EditIcon onClick={() => openUpdateModal()} />
            </div>
            <div className="header-icon-close">
              <CloseIcon onClick={() => setOpenMoreModal(false)} />
            </div>
          </div>
        </div>

        {type === "teacher" && (
          <TeacherMoreModal teachersModalData={teachersModalData} />
        )}
        {type === "student" && (
          <StudentMoreModal studentsModalData={studentsModalData} />
        )}
      </div>
    </div>
  );
};

export default MoreModal;
