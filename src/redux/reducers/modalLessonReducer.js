import { MODAL_LESSON_ACTION_TYPE } from "../actions-type";

const initialState = {
  modalLesson: {},
  openMainPageModal: false,
  lessonModalLoading: false,
  lessonDeleteModalLoading: false,
};

export const modalLessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON:
      return {
        modalLesson: action.payload.modalLesson,
        openMainPageModal: action.payload.openModal,
        lessonModalLoading: false,
        lessonDeleteModalLoading: false,
      };
    case MODAL_LESSON_ACTION_TYPE.LESSON_MODAL_LOADING:
      return {
        ...state,
        lessonModalLoading: action.payload,
      };
    case MODAL_LESSON_ACTION_TYPE.LESSON_DELETE_MODAL_LOADING:
      return {
        ...state,
        lessonDeleteModalLoading: action.payload,
      };
    default:
      return state;
  }
};
