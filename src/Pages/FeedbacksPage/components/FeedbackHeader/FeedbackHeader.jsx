import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const FeedbackHeader = () => {
  const [selectedType,setSelectedType] = useState("Teacher")
  const location = useLocation()
  return (
    <div className="stimulation-head">
      <div className="stimulation-head-content ">
        <ul>
          <li>
            <Link onClick={()=>setSelectedType("Teacher")} to="/feedback/teacher" className={`data-type ${
                location.pathname === "/feedback/teacher" ? "active" : ""
              }`} >Müəllim</Link>
          </li>

          <li>
            <Link onClick={()=>setSelectedType("Student")} to="/feedback/student" className={`data-type ${
                location.pathname === "/feedback/student" ? "active" : ""
              }`}  >Tələbə</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeedbackHeader;
