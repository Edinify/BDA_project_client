import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../globalComponents/Table/Table";
import { getCopyMainToCurrentButton } from "../../redux/actions/currentLessonsDataAction";
import { getCurrentLessonsDataAction } from "../../redux/actions/currentLessonsDataAction";
import { getMainLessonsDataAction } from "../../redux/actions/mainLessonsDataAction";
import { clearLessonsFilter } from "../../redux/actions/clearLessonsFilterAction";
import TableHead from "./components/TableHead";
import UpdatedSuccesModal from "./components/UpdatedSuccesModal";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const TablePage = () => {
  const dispatch = useDispatch();
  const { changeMainPageType, changeTableType} = useCustomHook();
  const [tableModal, setTableModal] = useState(false);
  const { openTablePageModal } = useSelector((state) => state.currentLessonsData);
  const { dropdownName } = useSelector((state) => state.dropdownName);

  const getCurrentLessons = () => {
    dispatch(getCurrentLessonsDataAction(dropdownName._id));
  };
  const getMainLessons = () => {
    dispatch(getMainLessonsDataAction(dropdownName._id));
  };


  useEffect(() => {
    changeMainPageType("teacher")
    changeTableType("main")
    dispatch(clearLessonsFilter());
    dispatch(getCopyMainToCurrentButton());
  }, []);

  useEffect(() => {
    if (tableModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [tableModal]);


  return (
    <div className="table-page">
      <TableHead />

      {openTablePageModal && <UpdatedSuccesModal />}

      <Table getCurrentLessons={getCurrentLessons} getMainLessons={getMainLessons} />
    </div>
  );
};

export default TablePage;
