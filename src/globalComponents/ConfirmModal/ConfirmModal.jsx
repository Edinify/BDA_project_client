import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as CloseIcon } from "../../assets/icons/more-modal/x-close.svg";
import "moment/locale/az";
import StudentConfirmModal from "./components/StudentConfirmModal/StudentConfirmModal";
import TeacherConfirmModal from "./components/TeacherConfirmModal/TeacherConfirmModal";
const ConfirmModal = ({ setOpenConfirmModal, type }) => {
  const dispatch = useDispatch();
  const { teachersModalData } = useSelector((state) => state.teachersModal);
  const { studentsModalData } = useSelector((state) => state.studentsModal);
  const { tuitionFeeModalData } = useSelector((state) => state.tuitionFeeModal);
  const { consultationModalData } = useSelector(
    (state) => state.consultationModal
  );



  return (
    <div className="more-modal">
      <div className="more-modal-con">
        <div className="more-modal-header">
          {type === "teacher" ||
          type === "student" ||
          type === "consultation" ||
          type === "tuitionFee" ? (
            <h2>Şəxsi məlumatlar</h2>
          ) : (
            ""
          )}
          <div className="more-modal-header-icons">
            <div className="header-icon-close">
              <CloseIcon onClick={() => setOpenConfirmModal(false)} />
            </div>
          </div>
        </div>

        {type === "student" && (
            <StudentConfirmModal studentsModalData={studentsModalData} />
        )}
        {type==="teacher" && (
          <TeacherConfirmModal teachersModalData={teachersModalData} />
        )}

        {/* {type === "teacher" && (
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
        )} */}
         <div className="confirm-btns">
        <button className="cancel" >Ləğv et</button>
        <button className="confirm">Təsdiqlə</button>
      </div>
      </div>
     
    </div>
  );
};

export default ConfirmModal;
