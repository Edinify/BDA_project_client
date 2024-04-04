import React from "react";
import { LuDownload } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { downloadExcelAction } from "../../redux/actions/studentsActions";
import "./excel-export.css";
import LoadingExcelBtn from "../Loading/components/LoadingExcelBtn/LoadingExcelBtn";
import { downloadTeachersExcelAction } from "../../redux/actions/teachersActions";
import { useLocation } from "react-router-dom";

const ExcelExportBtn = ({ pageName }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.downloadExcel);

  const handleDownloadExcel = () => {
    switch (pageName) {
      case "student":
        dispatch(downloadExcelAction());
        break;
      case "teacher":
        let role =
          location.pathname === "/teachers/mentors" ? "mentor" : "teacher";
        dispatch(downloadTeachersExcelAction(role));
        break;
    }
  };

  return (
    <button className="excel-export-btn">
      {loading ? (
        <LoadingExcelBtn />
      ) : (
        <LuDownload onClick={handleDownloadExcel} className="excel-download" />
      )}
    </button>
  );
};

export default ExcelExportBtn;
