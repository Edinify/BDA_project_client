import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import { changePasswordReducer } from "./reducers/changePasswordReducer";
import datePickerReducer from "./reducers/datepickerReducer";
import notificationsReducer from "./reducers/notificationsReducer";
import { dropdownReducer } from "./reducers/dropdownReducer";
import { dropdownNameErrReducer } from "./reducers/dropdownNameErrReducer";
import { userReducer } from "./reducers/userReducer";
import { teacherPaginationReducer } from "./reducers/teachersPaginationReducer";
import { searchValuesReducer } from "./reducers/searchValuesReducer";
import { StudentsPaginationReducer } from "./reducers/studentsPaginationReducer";
import { coursesPaginationReducer } from "./reducers/coursesPaginationReducer";
import forgotPasswordReducer from "./reducers/forgetPasswordReducer";
import { allCoursesReducer } from "./reducers/allCoursesReducer";
import { funcComponentReducer } from "./reducers/funcComponentReducer";
import { coursesModalReducer } from "./reducers/coursesModalReducer";
import { studentsModalReducer } from "./reducers/studentsModalReducer";
import { teachersModalReducer } from "./reducers/teachersModalReducer";
import { sidebarOpenReducer } from "./reducers/sidebarOpenReducer";
import { tuitionFeeDataPaginationReducer } from "./reducers/tuitionFeePaginationReducer";
import { tuitionFeeModalReducer } from "./reducers/tuitionFeeModalReducer";
import { consultationPaginationReducer } from "./reducers/consultationPaginationReducer";
import { consultationModalReducer } from "./reducers/consultationModalReducer";
import { groupModalReducer } from "./reducers/groupModalReducer";
import { workerModalReducer } from "./reducers/workerModalReducer";
import { workersPaginationReducer } from "./reducers/workersPaginationReducer";
import { profileImageReducer } from "./reducers/profileImagesReducer";
import { financeReducer } from "./reducers/financeReducer";
import { expensesReducer } from "./reducers/expensesPaginationReducer";
import { incomeReducer } from "./reducers/incomeReducer";
import { expensesModalReducer } from "./reducers/expensesModalReducer";
import { incomesModalReducer } from "./reducers/incomesModalReducer";
import { financeFilterReducer } from "./reducers/financeFilterReducer";
import { studentStatusReducer } from "./reducers/studentStatusReducer";
import { teacherStatusReducer } from "./reducers/teacherStatusReducer";
import { careerModalReducer } from "./reducers/careerModalReducer";
import { careerPaginationReducer } from "./reducers/careerPaginationReducer";
import { syllabusModalReducer } from "./reducers/syllabusModalReducer";
import { syllabusPaginationReducer } from "./reducers/syllabusPaginationReducer";
import { syllabusCourseReducer } from "./reducers/syllabusCourseReducer";
import { lessonTableModalReducer } from "./reducers/lessonTableModalReducer";
import { lessonTablePaginationReducer } from "./reducers/lessonTablePaginationReducer";
import { groupsPaginationReducer } from "./reducers/groupsPaginationReducer";
import { dropdownGroupReducer } from "./reducers/dropdownGroupReducer";

const initialState = {};
const reducers = combineReducers({
  teachersPagination: teacherPaginationReducer,
  coursesPagination: coursesPaginationReducer,
  studentsPagination: StudentsPaginationReducer,
  auth: authReducer,
  changePass: changePasswordReducer,
  datepicker: datePickerReducer,
  notifications: notificationsReducer,
  dropdownName: dropdownReducer,
  dropdownNameError: dropdownNameErrReducer,
  user: userReducer,
  profileImg: profileImageReducer,
  searchValues: searchValuesReducer,
  forgetPassword: forgotPasswordReducer,
  allCourses: allCoursesReducer,
  funcComponent: funcComponentReducer,
  coursesModal: coursesModalReducer,
  studentsModal: studentsModalReducer,
  teachersModal: teachersModalReducer,
  openSidebar: sidebarOpenReducer,
  tuitionFeePagination: tuitionFeeDataPaginationReducer,
  tuitionFeeModal: tuitionFeeModalReducer,
  consultationPagination: consultationPaginationReducer,
  consultationModal: consultationModalReducer,
  groupModal: groupModalReducer,
  workerModal: workerModalReducer,
  workersPagination: workersPaginationReducer,
  groupModal: groupModalReducer,
  groupsPagination: groupsPaginationReducer,
  lessonTableModal: lessonTableModalReducer,
  lessonTablePagination: lessonTablePaginationReducer,
  syllabusModal: syllabusModalReducer,
  syllabusPagination: syllabusPaginationReducer,
  syllabusCourse: syllabusCourseReducer,
  careerModal: careerModalReducer,
  careerPagination: careerPaginationReducer,
  financeData: financeReducer,
  expensesData: expensesReducer,
  incomes: incomeReducer,
  expensesModal: expensesModalReducer,
  incomesModal: incomesModalReducer,
  financeDateFilter: financeFilterReducer,
  studentStatus: studentStatusReducer,
  teacherStatus: teacherStatusReducer,
  dropdownGroup: dropdownGroupReducer,
});
// test

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
