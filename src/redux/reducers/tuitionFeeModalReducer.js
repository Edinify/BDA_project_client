import { TUITION_FEE_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  tuitionFeeModalData: {

  },
  tuitionFeeOpenModal: false,
  tuitionFeeModalLoading: false,
};

export const tuitionFeeModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL:
      return {
        ...state,
        tuitionFeeModalData: action.payload.data,
        tuitionFeeOpenModal: action.payload.openModal,
      };
    case TUITION_FEE_MODAL_ACTION_TYPE.TUITION_FEE_OPEN_MODAL:
      return {
        ...state,
        tuitionFeeOpenModal: action.payload,
      };
    case TUITION_FEE_MODAL_ACTION_TYPE.TUITION_FEE_MODAL_LOADING:
      return {
        ...state,
        tuitionFeeModalLoading: action.payload,
      };
    default:
      return state;
  }
};
