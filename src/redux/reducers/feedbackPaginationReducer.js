import { FEEDBACK_PAGINATION_ACTION_TYPE } from "../actions-type";

const initialState = {
  feedbackData: [],
  totalPages: 1,
  lastPage: "",
  loading:false
};

export const feedbackPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_PAGINATION_ACTION_TYPE.GET_FEEDBACK:
      return {
        ...state,
        feedbackData: action.payload.feedbacks,
        totalPages: action.payload.totalPages,
      };
    case FEEDBACK_PAGINATION_ACTION_TYPE.DELETE_FEEDBACK:
      return {
        ...state,
        feedbackData: state.feedbackData.filter(
          (feedback) => feedback._id !== action.payload._id
        ),
      };

    case FEEDBACK_PAGINATION_ACTION_TYPE.GET_FEEDBACK_LAST_PAGE:
      return {
        ...state,
        lastPage: action.payload,
      };

      case FEEDBACK_PAGINATION_ACTION_TYPE.FEEDBACK_LOADING:
        return{
            ...state,
            loading:action.payload
        }
    default:
      return state;
  }
};
