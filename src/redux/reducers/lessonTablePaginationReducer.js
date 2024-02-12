import { LESSON_TABLE_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  lessonTableData: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
  status:""
};

export const lessonTablePaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LESSON_TABLE_ALL_ACTIONS_TYPE.LESSON_TABLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_PAGINATION:
      return {
        ...state,
        lessonTableData: action.payload.lessons,
        totalPages: action.payload.totalPages
      };

    case LESSON_TABLE_ALL_ACTIONS_TYPE.CREATE_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: [...state.lessonTableData, action.payload],
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: state.lessonTableData.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.DELETE_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: state.lessonTableData.filter(
          (teacher) => teacher._id !== action.payload
        ),
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
