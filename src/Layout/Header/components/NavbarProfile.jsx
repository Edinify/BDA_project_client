import React, { useEffect, useRef } from "react";
import { viewedAllNotifications } from "../../..//redux/actions/notificationsActions";
import { useState } from "react";
import NotificationModal from "../../..//globalComponents/Modals/NotificationModal/NotificationModal";
import { ReactComponent as NotificationIcon } from "../../..//assets/icons/header/bell-02.svg";
import { ReactComponent as NotificationBlueIcon } from "../../..//assets/icons/header/notification-blue-icon.svg";
import { ReactComponent as UserProfileIcon } from "../../..//assets/icons/header/user-02.svg";
import { ReactComponent as UserProfileBlueIcon } from "../../..//assets/icons/header/change-user-icon.svg";
import { ReactComponent as HelpIcon } from "../../..//assets/icons/help-circle.svg";
import { ReactComponent as ChangePasswordIcon } from "../../..//assets/icons/password-check.svg";
import { ReactComponent as LogoutIcon } from "../../..//assets/icons/log-out-03.svg";
import { ReactComponent as UserProfileChangeIcon } from "../../..//assets/icons/user-square.svg";
import { ReactComponent as StudentLessonIcon } from "../../..//assets/icons/student-home/book-open-01.svg";
import { ReactComponent as StudentLessonBlueIcon } from "../../..//assets/icons/student-home/book-open-02.svg";
import { logoutAction } from "../../..//redux/actions/auth";
import { profileUpdateImage } from "../../..//redux/actions/profileImageAction";
import { useDispatch } from "react-redux";
import { ChangePasswordModal } from "../../..//globalComponents/Header/ChangePasswordModal/ChangePasswordModal";
import HowToUse from "../../..//globalComponents/HowToUse/HowToUse";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const NavbarProfile = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openNotModal, setOpenNotModal] = useState(false);
  const [openLessonModal, setOpenLessonModal] = useState(false);
  const [changeNoficitaionIcon, setChangeNotificationIcon] = useState(false);
  const [changeLessonAmountIcon, setChangeLessonAmountIcon] = useState(false);
  const [changeUserIcon, setChangeUserIcon] = useState(false);
  const [howToUse, setHowToUse] = useState(false);
  const inputRef = useRef(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [newNotification, setNewNotification] = useState(false);

  const navigateExit = () => {
    // window.location = "/login";
    // navigate("/login");
    dispatch(logoutAction());
  };
  const handleInputClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(",")[1];

      dispatch(profileUpdateImage({ profileImage: base64Image }));
    };
    reader.readAsDataURL(file);
  };

  window.onclick = function () {
    setIsOpen(false);
    setOpenNotModal(false);
    setChangeNotificationIcon(false);
    setChangeUserIcon(false);

    if (openNotModal) {
      dispatch(viewedAllNotifications());
    }
  };

  const handleActive = (e) => {
    setIsOpen(!isOpen);
    setOpenNotModal(false);
    setChangeUserIcon(!changeUserIcon);
    setChangeNotificationIcon(false);
    setOpenLessonModal(false);

    e.stopPropagation();
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
    setIsOpen(false);
  };

  const handleNotOpenModal = (e) => {
    if (openNotModal) {
      dispatch(viewedAllNotifications());
    }
    setOpenNotModal(!openNotModal);
    setIsOpen(false);
    setChangeNotificationIcon(!changeNoficitaionIcon);
    setChangeUserIcon(false);
    e.stopPropagation();
    setOpenLessonModal(false);
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflowY = "hidden";
    } else if (howToUse) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openModal, howToUse]);

  useEffect(() => {
    socket.on("newEvent", (newEvent) => {
      console.log("new event in notification", newEvent);

      if (newEvent) {
        setNewNotification(true);
      }
    });
  }, []);

  return (
    <>
      <div className="main-nav-icons">
        {/* {userData?.role === "student" && (
          <div
            className="student-amount"
            onClick={() => {
              setChangeLessonAmountIcon(!changeLessonAmountIcon);
              setOpenLessonModal(!openLessonModal);
            }}
          >
            {changeLessonAmountIcon ? (
              <div className="change-student-lesson-icon">
                <StudentLessonBlueIcon />
              </div>
            ) : (
              <div className="student-lesson-icon">
                <StudentLessonIcon />
              </div>
            )}
          </div>
        )} */}
        <div className="notification-con">
          {/* {userData?.role === "super-admin" && (
            <div className="help-icon" onClick={() => setHowToUse(true)}>
              <HelpIcon />
            </div>
          )} */}
          <div
            className="notification-icon"
            onClick={(e) => handleNotOpenModal(e)}
          >
            {newNotification && (
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "blue",
                  position: "absolute",
                  left: "5px",
                  top: "5px",
                }}
              ></div>
            )}
            {changeNoficitaionIcon ? (
              <div className="change-notif-icon">
                <NotificationBlueIcon />
              </div>
            ) : (
              <div className="notification-icon-head">
                <NotificationIcon />
              </div>
            )}
            <NotificationModal
              setOpenNotModal={setOpenNotModal}
              openNotModal={openNotModal}
              setChangeNotificationIcon={setChangeNotificationIcon}
              setNewNotification = {setNewNotification}
            />
          </div>
        </div>
        <div className="profile-img-con">
          <div className="profile-img" onClick={(e) => handleActive(e)}>
            {changeUserIcon ? (
              <div className="change-user-icon">
                <UserProfileBlueIcon />
              </div>
            ) : (
              <div className="user-icon-head">
                <UserProfileIcon />
              </div>
            )}
          </div>
          <div className={`user-modal-con ${isOpen ? "active" : ""}`}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="user-modal"
            >
              <div className="user-func">
                <div onClick={handleInputClick} className="profile-change-img">
                  <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    type="file"
                    onChange={(event) => handleFileChange(event)}
                    accept=".jpeg, .png, .jpg"
                  />
                  <UserProfileChangeIcon />
                  <p>Profil şəkli</p>
                </div>
                <div className="password-change-func">
                  <ChangePasswordIcon />
                  <p onClick={handleOpenModal}>Şifrəni dəyiş</p>
                </div>
                <div className="logout-func" onClick={navigateExit}>
                  <LogoutIcon />
                  <p>Çıxış</p>
                </div>
              </div>
            </div>

            <div className="user-modal-bg"></div>
          </div>
        </div>
      </div>
      {howToUse && <HowToUse setHowToUse={setHowToUse} howToUse={howToUse} />}
      {openModal && <ChangePasswordModal setOpenModal={setOpenModal} />}
    </>
  );
};

export default NavbarProfile;
