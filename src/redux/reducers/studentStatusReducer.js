import { STUDENT_STATUS_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  studentStatus: "",
  courseId:""
};

export const studentStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_STATUS:
      return {
        ...state,
        studentStatus: action.payload,
      };
      case STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_COURSEID:
      return {
        ...state,
        courseId: action.payload,
      };
    default:
      return state;
  }
};
