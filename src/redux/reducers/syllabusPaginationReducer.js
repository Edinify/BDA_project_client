import { SYLLABUS_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  syllabusData: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const syllabusPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYLLABUS_ALL_ACTIONS_TYPE.GET_ALL_SYLLABUS:
      return {
        ...state,
        syllabusData: action.payload,
        // loading: false,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.GET_ACTIVE_SYLLABUS:
      return {
        ...state,
        syllabusData: action.payload,
        loading: false,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.SYLLABUS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.GET_SYLLABUS_PAGINATION:
      return {
        ...state,
        ...action.payload,
      };

    case SYLLABUS_ALL_ACTIONS_TYPE.CREATE_SYLLABUS:
      return {
        ...state,
        syllabusData: [...state.syllabusData, action.payload],
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.UPDATE_SYLLABUS:
      return {
        ...state,
        syllabusData: state.syllabusData.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.DELETE_SYLLABUS:
      return {
        ...state,
        syllabusData: state.syllabusData.filter(
          (teacher) => teacher._id !== action.payload
        ),
      };
    case SYLLABUS_ALL_ACTIONS_TYPE.GET_SYLLABUS_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
