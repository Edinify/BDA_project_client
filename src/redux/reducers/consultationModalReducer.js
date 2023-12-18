import { CONSULTATION_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  consultationModalData: {},
  consultationOpenModal: false,
  consultationModalLoading: false,
  firstStep: true,
  secondStep: false
};

export const consultationModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL:
      return {
        ...state,
        consultationModalData: action.payload.data,
        consultationOpenModal: action.payload.openModal,
        firstStep: action.payload.firstStep,
        secondStep: action.payload.secondStep
      };
    case CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_OPEN_MODAL:
      return {
        ...state,
        consultationOpenModal: action.payload,
      };
    case CONSULTATION_MODAL_ACTION_TYPE.CONSULTATION_MODAL_LOADING:
      return {
        ...state,
        consultationModalLoading: action.payload,
      };
    default:
      return state;
  }
};
