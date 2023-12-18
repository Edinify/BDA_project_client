import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  lessonTableModalOpen: "",
};

export const lessonTableModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL:
      return {
        ...state,
        lessonTableModalOpen: action.payload,
      };
    default:
      return state;
  }
};
