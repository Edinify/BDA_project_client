import { COURSES_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  coursesModalData: { name: "" },
  coursesOpenModal: false,
  coursesModalLoading: false,
  openConfirmModal: false,
};

export const coursesModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL:
      return {
        ...state,
        coursesModalData: action.payload.data,
        coursesOpenModal: action.payload.openModal,
              };
    case COURSES_MODAL_ACTION_TYPE.COURSE_OPEN_MODAL:
      return {
        ...state,
        coursesOpenModal: action.payload,
      };
    case COURSES_MODAL_ACTION_TYPE.COURSE_MODAL_LOADING:
      return {
        ...state,
        coursesModalLoading: action.payload,
      };
    case COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL:
      return {
        ...state,
        ...initialState,
      };
    case COURSES_MODAL_ACTION_TYPE.OPEN_COURSE_CONFIRM_MODAL:
      return {
        ...state,
        coursesModalData: action.payload.data,
        coursesOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    default:
      return state;
  }
};
