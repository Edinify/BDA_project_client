import { TEACHER_FEEDBACK_ACTION_TYPE } from "../actions-type";


const initialState={
    teacherFeedback:[]
}


export const teacherFeedbackReducer=(state=initialState,action)=>{
    switch(action.type){
        case TEACHER_FEEDBACK_ACTION_TYPE.GET_TEACHER_FEEDBACK:
            return{
                ...state,
                teacherFeedback:action.payload

            }
            default:
                return state;
    }
}