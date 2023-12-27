import { GROUP_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  groupData: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const groupsPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS:
      return {
        ...state,
        groupData: action.payload,
        // loading: false,
      };
    case GROUP_ALL_ACTIONS_TYPE.GROUP_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GROUP_ALL_ACTIONS_TYPE.GET_GROUP_PAGINATION:
      return {
        ...state,
        groupData: action.payload.groups,
        totalPages: action.payload.totalPages
      };

    case GROUP_ALL_ACTIONS_TYPE.CREATE_GROUP:
      return {
        ...state,
        groupData: [...state.groupData, action.payload],
      };
    case GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP:
      return {
        ...state,
        groupData: state.groupData.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case GROUP_ALL_ACTIONS_TYPE.DELETE_GROUP:
      return {
        ...state,
        groupData: state.groupData.filter(
          (teacher) => teacher._id !== action.payload
        ),
      };
    case GROUP_ALL_ACTIONS_TYPE.GET_GROUP_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
