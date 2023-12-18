import { FEEDBACK_PAGE_TYPE_ACTION_TYPE } from "../actions-type";


export const feedbackTypeReducer=(state={feedbackType:"teacher"},action)=>{
    switch(action.type){
        case FEEDBACK_PAGE_TYPE_ACTION_TYPE.GET_FEEDBACK_PAGE_TYPE:
            return{
                ...state,
                feedbackType:action.payload
            }
            default:
                return state;
    }
}