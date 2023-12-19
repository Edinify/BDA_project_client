import { CAREER_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  careerData: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const careerPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAREER_ALL_ACTIONS_TYPE.GET_ALL_CAREERS:
      return {
        ...state,
        careerData: action.payload,
        // loading: false,
      };
    case CAREER_ALL_ACTIONS_TYPE.GET_ACTIVE_CAREER:
      return {
        ...state,
        careerData: action.payload,
        loading: false,
      };
    case CAREER_ALL_ACTIONS_TYPE.CAREER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CAREER_ALL_ACTIONS_TYPE.GET_CAREER_PAGINATION:
      return {
        ...state,
        ...action.payload,
      };

    case CAREER_ALL_ACTIONS_TYPE.CREATE_CAREER:
      return {
        ...state,
        careerData: [...state.careerData, action.payload],
      };
    case CAREER_ALL_ACTIONS_TYPE.UPDATE_CAREER:
      return {
        ...state,
        careerData: state.careerData.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case CAREER_ALL_ACTIONS_TYPE.DELETE_CAREER:
      return {
        ...state,
        careerData: state.careerData.filter(
          (teacher) => teacher._id !== action.payload
        ),
      };
    case CAREER_ALL_ACTIONS_TYPE.GET_CAREER_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
