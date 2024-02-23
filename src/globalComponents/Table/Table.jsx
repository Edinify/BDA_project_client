
import "./components/table.css";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
import React from "react";
import { useSelector } from "react-redux";

export const Table = () => {


  const {
    dashboardweek
  } = useSelector((state) => state.dashboardData);

  return (
    <div className="table-container">
      <div className="container">
        <div className="scrolling">
          <table>
            <TableHead />
            <TableBody />
          </table>
        </div>
      </div>
    </div>
  );
};
