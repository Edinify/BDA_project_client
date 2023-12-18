import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./headTabs.css";

const HeadTabs = ({
  firstRoute,
  secondRoute,
  firstPathname,
  secondPathname,
}) => {
  const location = useLocation();
  return (
    <div className="global-head-tabs">
      <Link
        to={firstRoute}
        className={`${location.pathname === firstRoute ? "active" : ""}`}
      >
        {firstPathname}
      </Link>
      <Link
        to={secondRoute}
        className={`${location.pathname === secondRoute ? "active" : ""}`}
      >
        {secondPathname}
      </Link>
    </div>
  );
};

export default HeadTabs;
