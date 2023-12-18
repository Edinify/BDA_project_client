import { FEEDBACKS_BY_TEACHER_ACTION_TYPE } from "../actions-type";

const initialState = {
  feedbacksByTeacherData: [],
};

export const feedbacksByTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACKS_BY_TEACHER_ACTION_TYPE.GET_FEEDBACKS_BY_TEACHER:
      return {
        ...state,
        feedbacksByTeacherData: action.payload,
      };

    case FEEDBACKS_BY_TEACHER_ACTION_TYPE.CREATE_FEEDBACKS_BY_TEACHER:
      return {
        ...state,
        feedbacksByTeacherData: [
         ...state.feedbacksByTeacherData,
          action.payload,
        ],
      };
    case FEEDBACKS_BY_TEACHER_ACTION_TYPE.UPDATE_FEEDBACKS_BY_TEACHER:
      return {
        ...state,
        feedbacksByTeacherData: state.feedbacksByTeacherData.map((feedback) =>
          feedback._id === action.payload.feedback._id
            ? action.payload.feedback
            : feedback
        ),
      };
    case FEEDBACKS_BY_TEACHER_ACTION_TYPE.DELETE_FEEDBACKS_BY_TEACHER:
      return {
        ...state,
        feedbacksByTeacherData: state.feedbacksByTeacherData.filter(
          (feedback) => feedback._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
