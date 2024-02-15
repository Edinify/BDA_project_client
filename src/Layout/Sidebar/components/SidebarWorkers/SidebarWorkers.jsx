import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCustomHook } from "../../../../globalComponents/GlobalFunctions/globalFunctions";

const SidebarStudent = ({ closeSidebar,profiles }) => {
  const location = useLocation();
  const { generalProfileList } = useCustomHook();
  
  return (
    <ul className="sidebar-nav-list">
      {
        profiles.map((data) =>{
          const {profile,_id} = data
          // // console.log(data)
          return(
            <li key={_id}>
              <NavLink to={ 
                profile === "consultation" ? `/${profile}/appointed`:
                profile === "groups" ? `/${profile}/current`: profile
                } onClick={closeSidebar}>
                {
                  generalProfileList.map((data) =>{
                    
                    const {name,key,icon,id} = data
                    if(key == profile){
                      return(
                        <span key={id}>
                          {icon}
                          {name} 
                        </span>
                      )
                    }
                  })
                }
              </NavLink>
            </li>
          )
        })
      }
    </ul>
  );
};

export default SidebarStudent;
