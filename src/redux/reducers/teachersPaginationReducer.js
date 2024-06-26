import { TEACHER_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  teachers: [],
  totalLength: 0,
  hasMore: true,
  teacherLessonStatistics: {},
  teacherConfirmedLessons: "",
  teacherCancelledLessons: "",
  teacherUnviewedLessons: "",
  teacherLeaderboardOrder: {},
  loading: false,
};

export const teacherPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER:
      return {
        ...state,
        teachers: action.payload,
        // loading: false,
      };
    case TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
        loading: false,
      };
    case TEACHER_ALL_ACTIONS_TYPE.TEACHER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER_PAGINATION:
      return {
        ...state,
        teachers: [...state.teachers, ...action.payload.teachers],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.teachers.length < 20),
      };
    case TEACHER_ALL_ACTIONS_TYPE.RESET_TEACHER_PAGINATION:
      return {
        ...state,
        teachers: [],
        totalLength: 0,
        hasMore: true,
      };
    case TEACHER_ALL_ACTIONS_TYPE.CREATE_TEACHER:
      return {
        ...state,
        teachers: [action.payload, ...state.teachers],
        totalLength: state.totalLength + 1,
      };
    case TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case TEACHER_ALL_ACTIONS_TYPE.DELETE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(
          (teacher) => teacher._id !== action.payload
        ),
        totalLength: state.totalLength - 1,
      };
    case TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    case TEACHER_ALL_ACTIONS_TYPE.GET_LESSON_STATISTICS:
      return {
        ...state,
        teacherLessonStatistics: action.payload,
      };
    case TEACHER_ALL_ACTIONS_TYPE.GET_CONFIRMED_LESSONS:
      return {
        ...state,
        teacherConfirmedLessons: action.payload,
      };
    case TEACHER_ALL_ACTIONS_TYPE.GET_CANCELLED_LESSONS:
      return {
        ...state,
        teacherCancelledLessons: action.payload,
      };
    case TEACHER_ALL_ACTIONS_TYPE.GET_UNVIEWED_LESSONS:
      return {
        ...state,
        teacherUnviewedLessons: action.payload,
      };
    case TEACHER_ALL_ACTIONS_TYPE.GET_LEADERBOARD_ORDER:
      return {
        ...state,
        teacherLeaderboardOrder: action.payload,
      };
    default:
      return state;
  }
};
