import { LEAD_ACTION_TYPE } from "../actions-type";

const initialState = {
  leads: [],
  loading: false,
  totalPages: 1,
  lastPage: 1,
};

export const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    // case INCOME_ACTION_TYPE.GET_INCOME:
    //   return {
    //     ...state,
    //     leads: action.payload.leads,
    //     totalPages: action.payload.totalPages,
    // loading:false
    //   };
    case LEAD_ACTION_TYPE.GET_LEAD_PAGINATION:
      return {
        ...state,
        leads: action.payload.leads,
        totalPages: action.payload.totalPages,
      };

    case LEAD_ACTION_TYPE.UPDATE_LEAD:
      // console.log(action.payload, "payloooooad");
      return {
        ...state,
        leads: state.leads.map((lead) =>
          lead._id === action.payload._id ? action.payload : lead
        ),
      };
    case LEAD_ACTION_TYPE.CREATE_LEAD:
      return {
        ...state,
        leads: [...state?.leads, action.payload],
      };
    case LEAD_ACTION_TYPE.DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead._id !== action.payload._id),
      };
    case LEAD_ACTION_TYPE.LEAD_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LEAD_ACTION_TYPE.GET_LEAD_LAST_PAGE:
      return {
        ...state,
        loading: false,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
