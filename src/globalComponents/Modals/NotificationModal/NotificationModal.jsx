import React, { useEffect } from "react";
import "./notificationModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationsAdminAction,
  getNotificationsTeacherAction,
  getNotificationsStudentAction,
  viewedAllNotifications,
  getNotifications,
} from "../../../redux/actions/notificationsActions";
import "moment/locale/az";
import SuperAdminNotification from "./components/SuperAdminNotification/SuperAdminNotification";
import AdminNotification from "./components/AdminNotification/AdminNotification";
import TeacherNotification from "./components/TeacherNotification/TeacherNotification";
import StudentNotification from "./components/StudentNotification/StudentNotification";
const NotificationModal = ({
  openNotModal,
  setOpenNotModal,
  setChangeNotificationIcon,
  setNewNotification,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token && openNotModal) {
      dispatch(getNotifications());
      return () => {
        dispatch(viewedAllNotifications());
      };
    }
  }, [user, openNotModal, dispatch]);

  useEffect(() => {
    setNewNotification(false);
  }, []);
  return (
    <>
      {user.role === "admin" && (
        <AdminNotification
          openNotModal={openNotModal}
          setOpenNotModal={setOpenNotModal}
          setChangeNotificationIcon={setChangeNotificationIcon}
        />
      )}

      {user.role === "super-admin" && (
        <SuperAdminNotification
          openNotModal={openNotModal}
          setOpenNotModal={setOpenNotModal}
          setChangeNotificationIcon={setChangeNotificationIcon}
        />
      )}
      {user.role === "teacher" && (
        <TeacherNotification
          openNotModal={openNotModal}
          setOpenNotModal={setOpenNotModal}
          setChangeNotificationIcon={setChangeNotificationIcon}
        />
      )}

      {user.role === "student" && (
        <StudentNotification
          openNotModal={openNotModal}
          setOpenNotModal={setOpenNotModal}
          setChangeNotificationIcon={setChangeNotificationIcon}
        />
      )}
    </>
  );
};

export default NotificationModal;
