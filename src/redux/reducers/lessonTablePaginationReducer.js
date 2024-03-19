import { LESSON_TABLE_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  lessonTableData: [],
  confirmedCount: 0,
  cancelledCount: 0,
  unviewedCount: 0,
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
        confirmedCount: action.payload.confirmedCount,
        cancelledCount: action.payload.cancelledCount,
        unviewedCount: action.payload.unviewedCount,
      };

    case LESSON_TABLE_ALL_ACTIONS_TYPE.CREATE_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: [action.payload],
        hasMore: false,
        unviewedCount: state.unviewedCount + 1,
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: state.lessonTableData.map((lesson) =>
          lesson._id === action.payload.lesson._id
            ? action.payload.lesson
            : lesson
        ),
        confirmedCount: action.payload.confirmedCount,
        cancelledCount: action.payload.cancelledCount,
        unviewedCount: action.payload.unviewedCount,
      };
    case LESSON_TABLE_ALL_ACTIONS_TYPE.RESET_LESSON_TABLE:
      return {
        ...state,
        lessonTableData: [],
        hasMore: true,
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
