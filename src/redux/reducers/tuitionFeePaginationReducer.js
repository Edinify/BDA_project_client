import { TUITION_FEE_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  tuitionFeeData: [],
  tuitionFeeDataByMore: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
  loadingAll: false,
};

export const tuitionFeeDataPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TUITION_FEE_ALL_ACTIONS_TYPE.GET_MORE_TUITION_FEE_ALL_ADD:
      return {
        ...state,
        tuitionFeeDataByMore: action.payload?.tuitionFeeData,
      };
    case TUITION_FEE_ALL_ACTIONS_TYPE.GET_MORE_TUITION_FEE_ALL:
      return {
        ...state,
        tuitionFeeDataByMore: [...state.tuitionFeeDataByMore, ...action.payload?.tutionFees],
      };
    case TUITION_FEE_ALL_ACTIONS_TYPE.GET_TUITION_FEE_PAGINATION:
      return {
        ...state,
        tuitionFeeData: action.payload.tutionFees,
        totalPages: action.payload.totalPages,
      };
    case TUITION_FEE_ALL_ACTIONS_TYPE.TUITION_FEE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TUITION_FEE_ALL_ACTIONS_TYPE.TUITION_FEE_LOADING_ALL:
      return {
        ...state,
        loadingAll: action.payload,
      };
    case TUITION_FEE_ALL_ACTIONS_TYPE.CREATE_TUITION_FEE:
      return {
        ...state,
        tuitionFeeData: [...state.tuitionFeeData, action.payload],
      };
    case TUITION_FEE_ALL_ACTIONS_TYPE.UPDATE_TUITION_FEE:
      return {
        ...state,
        tuitionFeeData: state.tuitionFeeData.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case TUITION_FEE_ALL_ACTIONS_TYPE.DELETE_TUITION_FEE:
      return {
        ...state,
        tuitionFeeData: state.tuitionFeeData.filter(
          (student) => student._id !== action.payload
        ),
      };
    case TUITION_FEE_ALL_ACTIONS_TYPE.GET_TUITION_FEE_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
