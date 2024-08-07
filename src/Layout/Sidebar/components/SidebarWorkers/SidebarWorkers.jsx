import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCustomHook } from "../../../../globalComponents/GlobalFunctions/globalFunctions";

const SidebarWorker = ({ closeSidebar, profiles }) => {
  const location = useLocation();
  const { generalProfileList } = useCustomHook();

  const groupsNav = ["/groups/current", "/groups/waiting", "/groups/ended"];

  const isActive = (profile) => {
    if (profile === "groups") {
      return groupsNav.includes(location.pathname) ? "active" : "";
    } else {
      return "";
    }
  };

  return (
    <ul className="sidebar-nav-list">
      {generalProfileList.map((data) => {
        const { name, key, icon, id } = data;

        const checkProfile = profiles.find((item) => item.profile === key);

        if (checkProfile) {
          return (
            <li key={id}>
              <NavLink
                className={isActive(key)}
                to={key === "groups" ? `/${key}/waiting` : key}
                onClick={closeSidebar}
              >
                <span key={id}>
                  {icon}
                  {name}
                </span>
              </NavLink>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default SidebarWorker;
