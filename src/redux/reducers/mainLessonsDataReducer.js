import { MAIN_LESSONS_DATA_ACTION_TYPE } from "../actions-type";

const mainLessonsDataReducer = (state = { mainLessonsData: [] }, action) => {
  switch (action.type) {
    case MAIN_LESSONS_DATA_ACTION_TYPE.GET_MAIN_LESSONS_DATA:
      return {
        ...state,
        mainLessonsData: action.payload,
      };
    case MAIN_LESSONS_DATA_ACTION_TYPE.CREATE_MAIN_LESSONS_DATA:
      return {
        ...state,
        mainLessonsData: [...state.mainLessonsData, action.payload],
      };
      case MAIN_LESSONS_DATA_ACTION_TYPE.UPDATE_MAIN_LESSONS_DATA:
        return{
          ...state,
          mainLessonsData:state.mainLessonsData.map(lesson=>lesson._id===action.payload._id ? action.payload :lesson)
        }
    case MAIN_LESSONS_DATA_ACTION_TYPE.DELETE_MAIN_LESSONS_DATA:
      return {
        ...state,
        mainLessonsData: state.mainLessonsData.filter(
          (tabledata) => tabledata._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default mainLessonsDataReducer;
