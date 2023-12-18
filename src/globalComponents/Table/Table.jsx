import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./components/table.css";
import MainTeacherModal from "../Modals/MainTeacherModal/MainTeacherModal";
import MainStudentModal from "../Modals/MainStudentModal/MainStudentModal";
import TablePageModal from "../Modals/TablePageModal/TablePageModal";
import TablePageModalTemp from "../Modals/TablePageModalTemp/TablePageModalTemp";
import TableHead from "./components/TableHead";
import { clearLessonsFilter } from "../../redux/actions/clearLessonsFilterAction";
import TablePagination from "./components/TablePagination";
import { useCustomHook } from "../GlobalFunctions/globalFunctions";
import TableBody from "./components/TableBody";

export const Table = ({
  getMainPageLessons = () => {},
  getCurrentLessons = () => {},
  getMainLessons = () => {},
  getTemporaryPageLessons = () => {},
  getTeacherLessons = () => {},
  getStudentLessons = () => {},
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { clearLessonModal } = useCustomHook();
  const { user } = useSelector((state) => state.user);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { dropdownName } = useSelector((state) => state.dropdownName);
  const { tableType } = useSelector((state) => state.tableType);
  const { lessonStatus } = useSelector((state) => state.lessonStatus);
  const { studentAttendance } = useSelector((state) => state.studentAttendance);
  const {  openMainPageModal } = useSelector((state) => state.modalLesson);

  useEffect(() => {
    return () => {
      dispatch(clearLessonsFilter());
    };
  }, []);

  useEffect(() => {
    if (dropdownName) {
      switch (tableType) {
        case "main page":
          getMainPageLessons();
          break;
        case "temporary page":
          getTemporaryPageLessons();
          break;
        case "current":
          getCurrentLessons();
          break;
        case "main":
          getMainLessons();
          break;
        default:
      }
    }
  }, [dropdownName, tableType, mainpageType, lessonStatus, studentAttendance]);

  useEffect(() => {
    if (user?.role === "teacher") {
      getTeacherLessons();
    } else if (user?.role === "student") {
      getStudentLessons();
    }
  }, [user]);

  return (
    <div className="table-container">
      <div className="container">
        <div className="scrolling">
          <table>
            <TableHead />
            <TableBody />
          </table>
        </div>

        {tableType === "main page" && <TablePagination />}
        {/* temporary table */}
        {tableType === "temporary page" && <TablePagination />}
      </div>

      {/* temporary table */}
      {location.pathname === "/temporary-table" && openMainPageModal && (
        <TablePageModalTemp />
      )}

      {(tableType === "main" || tableType === "current") && openMainPageModal && (
        <TablePageModal />
      )}

      {tableType === "main page" && openMainPageModal && (
        <>
          {mainpageType === "teacher" && <MainTeacherModal showModal={openMainPageModal} handleClose={() => clearLessonModal()} /> }
          {mainpageType === "student" && <MainStudentModal showModal={openMainPageModal} handleClose={() => clearLessonModal()} />}
        </>
      )}
    </div>
  );
};
