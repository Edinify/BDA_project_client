import { DIPLOMA_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  diplomaData: [],
  currentLength: 0,
  hasMore: true,
  loading: false,
};

export const diplomaPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case DIPLOMA_ALL_ACTIONS_TYPE.GET_DIPLOMA_PAGINATION:
      return {
        ...state,
        diplomaData: [...state.diplomaData, ...action.payload.diplomas],
        currentLength: action.payload.currentLength,
        hasMore: !(action.payload.diplomas.length < 20),
      };

    case DIPLOMA_ALL_ACTIONS_TYPE.UPDATE_DIPLOMA:
      return {
        ...state,
        diplomaData: state.diplomaData.map((diploma) =>
          diploma._id === action.payload._id ? action.payload : diploma
        ),
      };
  

    case DIPLOMA_ALL_ACTIONS_TYPE.RESET_DIPLOMA_PAGINATION:
      return {
        ...state,
        diplomaData: [],
        hasMore: true,
        currentLength: 0,
      };
    case DIPLOMA_ALL_ACTIONS_TYPE.DIPLOMA_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
