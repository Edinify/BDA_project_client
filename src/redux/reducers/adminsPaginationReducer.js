import { ADMIN_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  admins: [],
  loading: false,
};

export const adminPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_ALL_ACTIONS_TYPE.GET_ADMIN:
      return {
        ...state,
        admins: action.payload,
        // loading: false,
      };
    case ADMIN_ALL_ACTIONS_TYPE.ADMIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADMIN_ALL_ACTIONS_TYPE.CREATE_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };
    case ADMIN_ALL_ACTIONS_TYPE.UPDATE_ADMIN:
      return {
        ...state,
        admins: state.admins.map((admin) =>
          admin._id === action.payload._id ? action.payload : admin
        ),
      };
    case ADMIN_ALL_ACTIONS_TYPE.DELETE_ADMIN:
      return {
        ...state,
        admins: state.admins.filter(
          (admin) => admin._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
