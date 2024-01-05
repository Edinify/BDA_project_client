import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  lessonTableModalData: {},
  lessonTableOpenModal: false,
  lessonTableModalLoading: false,
};

export const lessonTableModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL:
      console.log(action.payload, "--bla bla bla");
      return {
        ...state,
        lessonTableModalData: action.payload.data,
        lessonTableOpenModal: action.payload.openModal,
      };
    case LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL:
      return {
        ...state,
        lessonTableOpenModal: action.payload,
      };
    case LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_MODAL_LOADING:
      return {
        ...state,
        lessonTableModalLoading: action.payload,
      };
    default:
      return state;
  }
};
