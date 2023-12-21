import { GROUP_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  groupModalData: {},
  groupOpenModal: false,
  groupModalLoading: false,
};

export const groupModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL:
      return {
        ...state,
        groupModalData: action.payload.data,
        groupOpenModal: action.payload.openModal,
      };
    case GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL:
      return {
        ...state,
        groupOpenModal: action.payload,
      };
    case GROUP_MODAL_ACTION_TYPE.GROUP_MODAL_LOADING:
      return {
        ...state,
        groupModalLoading: action.payload,
      };
    default:
      return state;
  }
};
