import "./components/table.css";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
import React from "react";

export const Table = () => {
  return (
    <div className="table-container">
      {/* <div className="container"> */}
      <div className="scrolling">
        <table>
          <TableHead />
          <TableBody />
        </table>
      </div>
      {/* </div> */}
    </div>
  );
};
