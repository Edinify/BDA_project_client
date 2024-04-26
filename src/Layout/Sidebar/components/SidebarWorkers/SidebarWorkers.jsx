import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCustomHook } from "../../../../globalComponents/GlobalFunctions/globalFunctions";

const SidebarWorker = ({ closeSidebar, profiles }) => {
  const location = useLocation();
  const { generalProfileList } = useCustomHook();

  const consultationNav = [
    "/consultation/appointed",
    "/consultation/completed",
  ];
  const groupsNav = ["/groups/current", "/groups/waiting", "/groups/ended"];

  const isActive = (profile) => {
    if (profile === "consultation") {
      return consultationNav.includes(location.pathname) ? "active" : "";
    } else if (profile === "groups") {
      return groupsNav.includes(location.pathname) ? "active" : "";
    } else {
      return "";
    }
  };

  return (
    <ul className="sidebar-nav-list">
      {profiles.map((data) => {
        const { profile, _id } = data;
        // // console.log(data)
        return (
          <li key={_id}>
            <NavLink
              className={isActive(profile)}
              // className={profile==="consultation" ? (consultationNav.includes(location.pathname) )? "active" : "" : profile==="groups" ? groupsNav.includes(location.pathname) ? "active" : "" :""}
              to={
                profile === "consultation"
                  ? `/${profile}/appointed`
                  : profile === "groups"
                  ? `/${profile}/current`
                  : profile
              }
              onClick={closeSidebar}
            >
              {generalProfileList.map((data) => {
                const { name, key, icon, id } = data;
                if (key === profile) {
                  return (
                    <span key={id}>
                      {icon}
                      {name}
                    </span>
                  );
                }
              })}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarWorker;
