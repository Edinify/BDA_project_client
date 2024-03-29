import React from 'react';
import { LuDownload } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { downloadExcelAction } from '../../redux/actions/studentsActions';
import "./excel-export.css";
import LoadingExcelBtn from '../Loading/components/LoadingExcelBtn/LoadingExcelBtn';

const ExcelExportBtn = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.studentsPagination);

  const handleDownloadExcel = () => {
    dispatch(downloadExcelAction());
  };

  return (
    <button className='excel-export-btn' onClick={handleDownloadExcel}>
      {loading ? <LoadingExcelBtn /> : <LuDownload />}
    </button>
  );
};

export default ExcelExportBtn;
