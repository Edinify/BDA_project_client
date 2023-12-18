import { STUDENT_ATTENDACE_ACTION_TYPE } from "../actions-type";



export const studentAttendanceTypeReducer=(state={studentAttendance:"all"},action)=>{
    switch(action.type){
        case STUDENT_ATTENDACE_ACTION_TYPE.GET_STUDENT_ATTENDANCE_TYPE:
            return{
                studentAttendance:action.payload
            }
            default:
                return state;
    }
}