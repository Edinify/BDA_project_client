import React from "react";
import { ReactComponent as LogoTabletIcon } from "../../assets/icons/sidebar/Logo-tablet.svg";
import { useSelector, useDispatch } from "react-redux";
import SidebarAdmin from "./components/SidebarAdmin/SidebarAdmin";
import SidebarSuperAdmin from "./components/SidebarSuperAdmin/SidebarSuperAdmin";
import SidebarTeacher from "./components/SidebarTeacher/SidebarTeacher";
import { SIDEBAR_ACTION_TYPE } from "../../redux/actions-type";
import SidebarHead from "./components/SidebarHead/SidebarHead";
import SidebarStudent from "./components/SidebarStudent/SidebarStudent";
import { profileGetImage } from "../../redux/actions/profileImageAction";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { openSidebar } = useSelector((state) => state.openSidebar);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_ACTION_TYPE.SIDEBAR_OPEN_MODAL, payload: false });
    dispatch(profileGetImage())
  };
  const openFullSidebar = () => {
    dispatch({ type: SIDEBAR_ACTION_TYPE.SIDEBAR_OPEN_MODAL, payload: true });
  };

  return (
    <div className={`main-sidebar ${openSidebar ? "active" : ""}`}>
      <div className="main-sidebar-con">
        <div className="main-sidebar-con-con">
          <SidebarHead closeSidebar={closeSidebar} />

          <div className="sidebar-head-tablet">
            <LogoTabletIcon onClick={openFullSidebar} />
          </div>

          {userData?.role === "super-admin" && (
            <SidebarSuperAdmin closeSidebar={closeSidebar} />
          )}
          {userData?.role === "admin" && (
            <SidebarAdmin closeSidebar={closeSidebar} />
          )}
          {userData?.role === "teacher" && (
            <SidebarTeacher closeSidebar={closeSidebar} />
          )}
          {userData?.role === "student" && (
            <SidebarStudent closeSidebar={closeSidebar} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
