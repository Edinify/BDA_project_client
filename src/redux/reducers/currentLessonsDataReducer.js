import {
  CURRENT_LESSONS_DATA_ACTION_TYPE,
  MAINPAGE_LESSONS_ACTION_TYPE
} from "../actions-type";

const initialState = {
  currentLessonsData: [],
  mainpageLessonData: [],
  copyMainToCurrentButton: false,
  openTablePageModal: false,
};

export const currentLessonsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_LESSONS_DATA_ACTION_TYPE.GET_CURRENT_LESSONS_DATA:
      return {
        ...state,
        currentLessonsData: action.payload,
      };
    case CURRENT_LESSONS_DATA_ACTION_TYPE.CREATE_CURRENT_LESSONS_DATA:
      return {
        ...state,
        currentLessonsData: [...state.currentLessonsData, action.payload],
      };

    /* temporary table */
    case MAINPAGE_LESSONS_ACTION_TYPE.CREATE_TEMPORARY_LESSONS:
      return {
        ...state,
        mainpageLessonData: [...state.mainpageLessonData, action.payload],
      };
    case CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_CURRENT_LESSONS_DATA:
      return {
        ...state,
        currentLessonsData: state.currentLessonsData.map((currentData) =>
          currentData._id === action.payload._id ? action.payload : currentData
        ),
      };

    /* temporary table */
    case MAINPAGE_LESSONS_ACTION_TYPE.UPDATE_TEMPORARY_LESSONS:
      return {
        ...state,
        mainpageLessonData: state.mainpageLessonData.map((mainpageData) =>
          mainpageData._id === action.payload._id
            ? action.payload
            : mainpageData
        ),
      };
    case CURRENT_LESSONS_DATA_ACTION_TYPE.DELETE_CURRENT_LESSONS_DATA:
      return {
        ...state,
        currentLessonsData: state.currentLessonsData.filter(
          (currentData) => currentData._id !== action.payload
        ),
      };
         /* temporary table */
      case MAINPAGE_LESSONS_ACTION_TYPE.DELETE_TEMPORARY_LESSONS:
        return {
          ...state,
          mainpageLessonData: state.mainpageLessonData.filter(
            (mainpageData) => mainpageData._id !== action.payload
          ),
        };
    case MAINPAGE_LESSONS_ACTION_TYPE.GET_MAINPAGE_LESSONS:
      return {
        ...state,
        mainpageLessonData: action.payload,
      };
    case MAINPAGE_LESSONS_ACTION_TYPE.UPDATE_MAINPAGE_LESSONS:
      return {
        ...state,
        mainpageLessonData: state.mainpageLessonData.map((mainpageData) =>
          mainpageData._id === action.payload._id
            ? action.payload
            : mainpageData
        ),
      };
    case CURRENT_LESSONS_DATA_ACTION_TYPE.COPY_MAIN_CURRENT_BUTTON:
      return {
        ...state,
        copyMainToCurrentButton: action.payload.disabled,
      };
    case CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_OPEN_MODAL:
      return {
        ...state,
        openTablePageModal: action.payload,
      };
    default:
      return state;
  }
};
