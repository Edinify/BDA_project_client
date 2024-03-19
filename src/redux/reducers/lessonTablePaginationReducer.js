import { LESSON_TABLE_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  lessonTableData: [],
  confirmedCount: 0,
  cancelledCount: 0,
  unviewedCount: 0,
  totalCount: 0,
  hasMore: true,
  loading: false,
  status: "",
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
        lessonTableData: [...state.lessonTableData, ...action.payload.lessons],
        hasMore: !(action.payload.lessons.length < 10),
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
    case LESSON_TABLE_ALL_ACTIONS_TYPE.RESET_LESSON_TABLE:
      return initialState;
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
