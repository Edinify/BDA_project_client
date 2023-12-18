import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import { changePasswordReducer } from "./reducers/changePasswordReducer";
import datePickerReducer from "./reducers/datepickerReducer";
import mainLessonsDataReducer from "./reducers/mainLessonsDataReducer"
import notificationsReducer from "./reducers/notificationsReducer";
import { modalLessonReducer } from "./reducers/modalLessonReducer";
import { dropdownReducer } from "./reducers/dropdownReducer";
import { dropdownNameErrReducer } from "./reducers/dropdownNameErrReducer";
import { lessonStatusReducer } from "./reducers/lessonStatusReducer";
import { TableTypeReducer } from "./reducers/TableTypeReducer";
import { mainPageTypeReducer } from "./reducers/mainPageTypeReducer";
import {currentLessonsDataReducer} from "./reducers/currentLessonsDataReducer"
import { userReducer } from "./reducers/userReducer";
import { studentAttendanceTypeReducer } from "./reducers/studentAttendanceTypeReducer";
import { weeksBetweenSelectedDatesReducer } from "./reducers/weeksBetweenSelectedDatesReducer";
import { paginationPageNumberReducer } from "./reducers/paginationPageNumberReducer";
import { profileImageReducer } from "./reducers/profileImagesReducer";
import { teacherPaginationReducer } from "./reducers/teachersPaginationReducer";
import { adminPaginationReducer } from "./reducers/adminsPaginationReducer";
import {  searchValuesReducer } from "./reducers/searchValuesReducer";
import { StudentsPaginationReducer } from "./reducers/studentsPaginationReducer";
import { coursesPaginationReducer } from "./reducers/coursesPaginationReducer";
import { salaryPaginationReducer } from "./reducers/salaryPaginationReducer";
import { dashBoardreducer } from "./reducers/dashboardReducer";
import forgotPasswordReducer from "./reducers/forgetPasswordReducer";
import { expensesReducer } from "./reducers/expensesPaginationReducer";
import { allCoursesReducer } from "./reducers/allCoursesReducer";
import { incomeReducer } from "./reducers/incomeReducer";
import { funcComponentReducer } from "./reducers/funcComponentReducer";
import { coursesModalReducer } from "./reducers/coursesModalReducer";
import { studentsModalReducer } from "./reducers/studentsModalReducer";
import { teachersModalReducer } from "./reducers/teachersModalReducer";
import { adminsModalReducer } from "./reducers/adminsModalReducer";
import {expensesModalReducer} from "./reducers/expensesModalReducer"
import { incomesModalReducer } from "./reducers/incomesModalReducer";
import { sidebarOpenReducer } from "./reducers/sidebarOpenReducer";
import { stimulationTypeReducer } from "./reducers/stimulationTypeReducer";
import { bonusPaginationReducer } from "./reducers/bonusPagionationReducer";
import { bonusModalReducer } from "./reducers/bonusModalReducer";
import { feedbackModalReducer } from "./reducers/feedbackModalReducer";
import { finePaginationReducer } from "./reducers/finePaginationReducer";
import {fineModalReducer} from "./reducers/fineModalReducer"
import { feedbackTypeReducer } from "./reducers/feedbackTypeReducer";
import { feedbackPaginationReducer } from "./reducers/feedbackPaginationReducer";
import { financeFilterReducer } from "./reducers/financeFilterReducer";
import { feedbacksByTeacherReducer } from "./reducers/feedbacksByTeacherReducer";
import { fineFilterReducer } from "./reducers/fineReducer";
import { teacherBonusReducer } from "./reducers/teacherBonusReducer";
import { lessonTableModalReducer } from "./reducers/lessonTableModalReducer";
import { financeReducer } from "./reducers/financeReducer";
import { teacherStatusReducer } from "./reducers/teacherStatusReducer";
import { studentStatusReducer } from "./reducers/studentStatusReducer";
import { tuitionFeeDataPaginationReducer } from "./reducers/tuitionFeePaginationReducer";
import { tuitionFeeModalReducer } from "./reducers/tuitionFeeModalReducer";
import { consultationPaginationReducer } from "./reducers/consultationPaginationReducer";
import { consultationModalReducer } from "./reducers/consultationModalReducer";
import { groupModalReducer } from "./reducers/groupModalReducer";


const initialState={};
const reducers = combineReducers({
teachersPagination:teacherPaginationReducer,
adminsPagination:adminPaginationReducer,
coursesPagination:coursesPaginationReducer,
studentsPagination:StudentsPaginationReducer,
auth:authReducer,
changePass:changePasswordReducer,
salaryPagination:salaryPaginationReducer,
datepicker:datePickerReducer,
mainLessonsData:mainLessonsDataReducer,
notifications:notificationsReducer,
modalLesson: modalLessonReducer,
dropdownName:dropdownReducer,
dropdownNameError:dropdownNameErrReducer,
lessonStatus:lessonStatusReducer,
tableType:TableTypeReducer,
mainpageType:mainPageTypeReducer,
currentLessonsData:currentLessonsDataReducer,
user:userReducer,
studentAttendance:studentAttendanceTypeReducer,
weeksBetweenSelectedDates:weeksBetweenSelectedDatesReducer,
pageNumber:paginationPageNumberReducer,
profileImg:profileImageReducer,
searchValues:searchValuesReducer,
dashboardData:dashBoardreducer,
financeData: financeReducer,
forgetPassword:forgotPasswordReducer,
expensesData:expensesReducer,
allCourses:allCoursesReducer,
incomes:incomeReducer,
funcComponent:funcComponentReducer,
coursesModal: coursesModalReducer,
studentsModal: studentsModalReducer,
teachersModal: teachersModalReducer,
adminsModal: adminsModalReducer,
expensesModal:expensesModalReducer,
incomesModal:incomesModalReducer,
bonusModal:bonusModalReducer,
feedbackModal:feedbackModalReducer,
fineModal:fineModalReducer,
openSidebar:sidebarOpenReducer,
bonusData:bonusPaginationReducer,
fineData:finePaginationReducer,
stimulationType:stimulationTypeReducer,
feedbackType:feedbackTypeReducer,
feedbackData:feedbackPaginationReducer,
feedbacksByTeacherData:feedbacksByTeacherReducer,
financeDateFilter: financeFilterReducer,
fineCategory:fineFilterReducer,
teacherBonus:teacherBonusReducer,
lessonTableModal: lessonTableModalReducer,
teacherStatus:teacherStatusReducer,
studentStatus:studentStatusReducer,
tuitionFeePagination: tuitionFeeDataPaginationReducer,
tuitionFeeModal: tuitionFeeModalReducer,
consultationPagination: consultationPaginationReducer,
consultationModal: consultationModalReducer,
groupModal: groupModalReducer,
})
// test

const store = createStore(
reducers,
initialState,
composeWithDevTools(applyMiddleware(thunk))

)
export default store;