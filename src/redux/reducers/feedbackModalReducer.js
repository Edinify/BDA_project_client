import { FEEDBACK_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  feedbackModalData: { student: "", teacher: "", feedback: "" },
  feedbackOpenModal: false,
  feedbackModalLoading:false
};

export const feedbackModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_MODAL_ACTION_TYPE.GET_FEEDBACK_MODAL:
      return {
        ...state,
        feedbackModalData: action.payload.data,
        feedbackOpenModal: action.payload.openModal,
      };
    case FEEDBACK_MODAL_ACTION_TYPE.FEEDBACK_OPEN_MODAL:
      return {
        ...state,
        feedbackOpenModal: action.payload,
      };
      case FEEDBACK_MODAL_ACTION_TYPE.FEEDBACK_MODAL_LOADING:
        return{
            ...state,
            feedbackModalLoading:action.payload

        }

    default:
      return state;
  }
};
