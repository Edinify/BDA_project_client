import React, { useState } from "react";
import "./moreModal.css";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as EditIcon } from "../../assets/icons/more-modal/edit-02.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/more-modal/x-close.svg";
import {
  TEACHERS_MODAL_ACTION_TYPE,
  STUDENTS_MODAL_ACTION_TYPE,
  CONSULTATION_MODAL_ACTION_TYPE,
  WORKER_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
import "moment/locale/az";
import TeacherMoreModal from "./components/TeacherMoreModal/TeacherMoreModal";
import StudentMoreModal from "./components/StudentMoreModal/StudentMoreModal";
import ConsultationMoreModal from "./components/ConsultationMoreModal/ConsultationMoreModal";
import TuitionFeeMoreModal from "./components/TuitionFeeMoreModal/TuitionFeeMoreModal";
import WorkersMoreModal from "./components/WorkersMoreModal/WorkersMoreModal";
const MoreModal = ({ setOpenMoreModal, type, userData }) => {
  const dispatch = useDispatch();
  const { teachersModalData } = useSelector((state) => state.teachersModal);
  const { studentsModalData } = useSelector((state) => state.studentsModal);
  const { tuitionFeeModalData } = useSelector((state) => state.tuitionFeeModal);
  const { workerModalData } = useSelector((state) => state.workerModal);
  const { consultationModalData } = useSelector(
    (state) => state.consultationModal
  );
  const { user } = useSelector((state) => state.user);

  console.log(userData?.power === "only-show", "user Dataaaa");
  console.log(user.role === "super-admin");
  console.log(type, "user data more modal");

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
    } else if (type === "consultation") {
      dispatch({
        type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
        payload: {
          data: {
            ...consultationModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "worker") {
      dispatch({
        type: WORKER_MODAL_ACTION_TYPE.GET_WORKER_MODAL,
        payload: {
          data: {
            ...workerModalData,
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
          {type === "teacher" ||
          type === "student" ||
          type === "consultation" ||
          type === "tuitionFee" ||
          type === "worker" ? (
            <h2>Şəxsi məlumatlar</h2>
          ) : (
            ""
          )}
          <div className="more-modal-header-icons">
            {(user?.role === "super-admin" ||
              userData?.power !== "only-show") &&
              type !== "tuitionFee" && (
                <div className="header-icon-edit">
                  <EditIcon onClick={() => openUpdateModal()} />
                </div>
              )}

            <div className="header-icon-close">
              <CloseIcon onClick={() => setOpenMoreModal(false)} />
            </div>
          </div>
        </div>

        {type === "teacher" && (
          <TeacherMoreModal teachersModalData={teachersModalData} />
        )}
        {type === "tuitionFee" && (
          <TuitionFeeMoreModal tuitionFeeModalData={tuitionFeeModalData} />
        )}
        {type === "student" && (
          <StudentMoreModal studentsModalData={studentsModalData} />
        )}
        {type === "consultation" && (
          <ConsultationMoreModal
            consultationModalData={consultationModalData}
          />
        )}
        {type === "worker" && (
          <WorkersMoreModal workerModal={workerModalData} />
        )}
      </div>
    </div>
  );
};

export default MoreModal;
