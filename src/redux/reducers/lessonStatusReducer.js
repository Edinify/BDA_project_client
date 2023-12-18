import { LESSON_STATUS_ACTION_TYPE } from "../actions-type";


export const lessonStatusReducer = (state = { lessonStatus: 'all' }, action) => {
  switch (action.type) {
      case LESSON_STATUS_ACTION_TYPE.UPDATE_LESSON_STATUS:
          return {
              ...state,
              lessonStatus: action.payload,
          };
        default:
          return state; 
      }
}