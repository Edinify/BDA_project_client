import { WORKER_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  workers: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const workersPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKER_ALL_ACTIONS_TYPE.GET_ALL_WORKERS:
      return {
        ...state,
        workers: action.payload,
        // loading: false,
      };
    case WORKER_ALL_ACTIONS_TYPE.GET_ACTIVE_WORKER:
      return {
        ...state,
        workers: action.payload,
        loading: false,
      };
    case WORKER_ALL_ACTIONS_TYPE.WORKER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case WORKER_ALL_ACTIONS_TYPE.GET_WORKER_PAGINATION:
      return {
        ...state,
        ...action.payload,
      };

    case WORKER_ALL_ACTIONS_TYPE.CREATE_WORKER:
      return {
        ...state,
        workers: [...state.workers, action.payload],
      };
    case WORKER_ALL_ACTIONS_TYPE.UPDATE_WORKER:
      return {
        ...state,
        workers: state.workers.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        ),
      };
    case WORKER_ALL_ACTIONS_TYPE.DELETE_WORKER:
      return {
        ...state,
        workers: state.workers.filter(
          (teacher) => teacher._id !== action.payload
        ),
      };
    case WORKER_ALL_ACTIONS_TYPE.GET_WORKER_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
