import { STUDENTS_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  students: [],
  studentsByCourse: [],
  studentsByMore: [],
  totalLength: 0,
  hasMore: true,
  lastPage: "",
  loading: false,
  loadingAll: false,
};

export const StudentsPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE_ADD:
      console.log("student reducer test 1");
      return {
        ...state,
        studentsByCourse: action.payload?.students,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_BY_COURSE:
      console.log("student reducer test 2");
      return {
        ...state,
        studentsByCourse: [
          ...state.studentsByCourse,
          ...action.payload?.students,
        ],
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL_ADD:
      console.log("student reducer test 3");
      return {
        ...state,
        studentsByMore: action.payload?.students,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENTS_ALL:
      console.log("student reducer test 4");
      return {
        ...state,
        studentsByMore: [...state.studentsByMore, ...action.payload?.students],
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_PAGINATION:
      console.log("student reducer test 5");
      return {
        ...state,
        students: [...state.students, ...action.payload.students],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.students.length < 10),
      };
    case STUDENTS_ALL_ACTIONS_TYPE.RESET_STUDENT_PAGINATION:
      console.log("student reducer test 6");
      return {
        ...state,
        students: [],
        totalLength: 0,
        hasMore: true,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.STUDENT_LOADING:
      console.log("student reducer test 7");
      return {
        ...state,
        loading: action.payload,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.STUDENT_LOADING_ALL:
      console.log("student reducer test 8");
      return {
        ...state,
        loadingAll: action.payload,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.CREATE_STUDENT:
      console.log("student reducer test 9");
      return {
        ...state,
        students: [action.payload, ...state.students],
        totalLength: state.totalLength + 1,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT:
      console.log("student reducer test 10");
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case STUDENTS_ALL_ACTIONS_TYPE.DELETE_STUDENT:
      console.log("student reducer test 11");
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
        totalLength: state.totalLength - 1,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_LAST_PAGE:
      console.log("student reducer test 12");
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
