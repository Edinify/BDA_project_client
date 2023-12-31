import {  
  DATEPICKER_ACTION_TYPE, 
  LESSON_STATUS_ACTION_TYPE, 
  STUDENT_ATTENDACE_ACTION_TYPE, 
  DROPDOWN_NAME_ACTION_TYPE, 
  WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE,
  MAINPAGE_LESSONS_ACTION_TYPE,
  PAGINATION_PAGE_NUMBER_ACTION_TYPE,
  MAIN_LESSONS_DATA_ACTION_TYPE,
  CURRENT_LESSONS_DATA_ACTION_TYPE,
} from "../actions-type";


export const clearLessonsFilter = () => {
    return (dispatch)=>{
    dispatch({type:DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN,payload:''})
    dispatch({type:DATEPICKER_ACTION_TYPE.START_DATE, payload: '' });
    dispatch({type:DATEPICKER_ACTION_TYPE.END_DATE, payload: '' });
    dispatch({type:WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE.GET_SELECTED_DATES,payload:[]});
    dispatch({type:PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,payload:0});

    dispatch({type:LESSON_STATUS_ACTION_TYPE.UPDATE_LESSON_STATUS, payload: 'all'})
    dispatch({type:STUDENT_ATTENDACE_ACTION_TYPE.GET_STUDENT_ATTENDANCE_TYPE,payload: 'all'})


    dispatch({type:MAINPAGE_LESSONS_ACTION_TYPE.GET_MAINPAGE_LESSONS,payload:[]});
    dispatch({type:MAIN_LESSONS_DATA_ACTION_TYPE.GET_MAIN_LESSONS_DATA,payload:[]});
    dispatch({type:CURRENT_LESSONS_DATA_ACTION_TYPE.GET_CURRENT_LESSONS_DATA,payload:[]})
    }
  };





  