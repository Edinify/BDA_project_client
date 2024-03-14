import { COURSES_ALL_ACTIONS_TYPE } from "../actions-type";


const initialState={
    courses:[],
    totalLength: 0,
    totalPages:1,
    lastPage: '',
    loading:false
}

export const coursesPaginationReducer=(state=initialState,action)=>{
    switch(action.type){
      case COURSES_ALL_ACTIONS_TYPE.GET_COURSE:
        return {
          ...state,
          courses: action.payload,
          // loading:action.payload.loading
        };
        case COURSES_ALL_ACTIONS_TYPE.COURSE_LOADING:
          return{
            ...state,
            loading:action.payload
          }
        case COURSES_ALL_ACTIONS_TYPE.GET_COURSES_PAGINATION:
          return {
            ...state,
            courses: [...state.courses, ...action.payload.courses],
            totalLength: action.payload.totalLength,
          };
        case COURSES_ALL_ACTIONS_TYPE.CREATE_COURSE:
          return {
            ...state,
            teachers:  [action.payload, ...state.teachers],
            totalLength: state.totalLength + 1,
          };
        case COURSES_ALL_ACTIONS_TYPE.RESET_COURSES_PAGINATION:
          return {
            ...state,
            teachers: [],
            totalLength: 0,
          };
          
        case COURSES_ALL_ACTIONS_TYPE.UPDATE_COURSE:
          return {
              ...state,
              courses: state.courses.map((course) =>
              course._id === action.payload._id ? action.payload : course
            ),
          };
        case COURSES_ALL_ACTIONS_TYPE.DELETE_COURSE:
          return {
              ...state,
            courses: state.courses.filter(
              (course) => course._id !== action.payload
            ),
          };
        case COURSES_ALL_ACTIONS_TYPE.GET_COURSES_LAST_PAGE:
          return{
            // ...state,
            lastPage: action.payload,
          };
        default:
            return state;
    }
}