export const TEACHER_ALL_ACTIONS_TYPE = {
  GER_TEACHERI: "GET_TEACHER",
  GET_ACTIVE_TEACHERS: "GET_ACTIVE_TEACHERS",
  CREATE_TEACHER: "CREATE-TEACHER",
  GET_TEACHER_PAGINATION: "GET_TEACHER_PAGINATION",
  UPDATE_TEACHER: "UPDATE-TEACHER",
  DELETE_TEACHER: "DELETE-TEACHER",
  TEACHER_MODAL: "TEACHER-MODAL",
  TEACHER_LOADING: "TEAHCER_LOADING",
  GET_TEACHER_LAST_PAGE: "GET_TEACHER_LAST_PAGE",

  GET_LESSON_STATISTICS: "GET_LESSON_STATISTICS",
  GET_CONFIRMED_LESSONS: "GET_CONFIRMED_LESSONS",
  GET_CANCELLED_LESSONS: "GET_CANCELLED_LESSONS",
  GET_UNVIEWED_LESSONS: "GET_UNVIEWED_LESSONS",
  GET_LEADERBOARD_ORDER: "GET_LEADERBOARD_ORDER",
};
export const DROPDOWN_GROUP_ACTIONS_TYPE = {
  SELECT_GROUP: "SELECT_GROUP",
};
export const WORKER_ALL_ACTIONS_TYPE = {
  GET_ALL_WORKERS: "GET_ALL_WORKERS",
  GET_ACTIVE_WORKER: "GET_ACTIVE_WORKER",
  GET_WORKER_PAGINATION: "GET_WORKER_PAGINATION",
  GET_WORKER_LAST_PAGE: "GET_WORKER_LAST_PAGE",
  CREATE_WORKER: "CREATE-WORKER",
  UPDATE_WORKER: "UPDATE-WORKER",
  DELETE_WORKER: "DELETE-WORKER",
  WORKER_LOADING: "WORKER_LOADING",
};
export const GROUP_ALL_ACTIONS_TYPE = {
  GET_ALL_GROUPS: "GET_ALL_GROUPS",
  GET_GROUP_PAGINATION: "GET_GROUP_PAGINATION",
  GET_GROUP_LAST_PAGE: "GET_GROUP_LAST_PAGE",
  GET_MORE_GROUP_ALL: "GET-MORE-GROUP-ALL",
  GET_MORE_GROUP_ALL_ADD: "GET-MORE-GROUP-ALL-ADD",
  GROUP_LOADING_ALL: "GROUP_LOADING_ALL",
  CREATE_GROUP: "CREATE-GROUP",
  UPDATE_GROUP: "UPDATE-GROUP",
  DELETE_GROUP: "DELETE-GROUP",
  GROUP_LOADING: "GROUP_LOADING",
};
export const LESSON_TABLE_ALL_ACTIONS_TYPE = {
  GET_LESSON_TABLE_PAGINATION: "GET_LESSON_TABLE_PAGINATION",
  GET_LESSON_TABLE_LAST_PAGE: "GET_LESSON_TABLE_LAST_PAGE",
  CREATE_LESSON_TABLE: "CREATE-TABLE",
  UPDATE_LESSON_TABLE: "UPDATE-TABLE",
  DELETE_LESSON_TABLE: "DELETE-TABLE",
  LESSON_TABLE_LOADING: "LESSON_TABLE_LOADING",
};
export const SYLLABUS_ALL_ACTIONS_TYPE = {
  GET_ALL_SYLLABUS: "GET_ALL_SYLLABUS",
  GET_ACTIVE_SYLLABUS: "GET_ACTIVE_SYLLABUS",
  GET_SYLLABUS_PAGINATION: "GET_SYLLABUS_PAGINATION",
  GET_SYLLABUS_LAST_PAGE: "GET_SYLLABUS_LAST_PAGE",
  CREATE_SYLLABUS: "CREATE-SYLLABUS",
  UPDATE_SYLLABUS: "UPDATE-SYLLABUS",
  DELETE_SYLLABUS: "DELETE-SYLLABUS",
  SYLLABUS_LOADING: "SYLLABUS_LOADING",
  SELECT_COURSE_FOR_SYLLABUS: "SELECT_COURSE_FOR_SYLLABUS",
};
export const CAREER_ALL_ACTIONS_TYPE = {
  GET_ALL_CAREERS: "GET_ALL_CAREERS",
  GET_ACTIVE_CAREER: "GET_ACTIVE_CAREER",
  GET_CAREER_PAGINATION: "GET_CAREER_PAGINATION",
  GET_CAREER_LAST_PAGE: "GET_CAREER_LAST_PAGE",
  CREATE_CAREER: "CREATE-CAREER",
  UPDATE_CAREER: "UPDATE-CAREER",
  DELETE_CAREER: "DELETE-CAREER",
  CAREER_LOADING: "CAREER_LOADING",
};
export const ADMIN_ALL_ACTIONS_TYPE = {
  GET_ADMIN: "GET-ADMIN",
  CREATE_ADMIN: "CREATE-ADMIN",
  UPDATE_ADMIN: "UPDATE-ADMIN",
  DELETE_ADMIN: "DELETE-ADMIN",
  ADMIN_MODAL: "ADMIN-MODAL",
  ADMIN_LOADING: "ADMIN_LOADING",
};

export const COURSES_ALL_ACTIONS_TYPE = {
  GET_COURSE: "GET-COURSE",
  CREATE_COURSE: "CREATE-COURSE",
  UPDATE_COURSE: "UPDATE-COURSE",
  DELETE_COURSE: "DELETE-COURSE",
  COURSE_MODAL: "COURSE-MODAL",
  GET_COURSES_PAGINATION: "GET_COURSES_PAGINATION",
  COURSE_LOADING: "COURSE_LOADING",
  GET_COURSES_LAST_PAGE: "GET_COURSES_LAST_PAGE",
};

export const ALL_COURSES_ACTION = {
  GET_ALL_COURSE: "GET_ALL_COURSE",
};

export const STUDENTS_ALL_ACTIONS_TYPE = {
  GET_STUDENT_PAGINATION: "GET_STUDENT_PAGINATION",
  CREATE_STUDENT: "CREATE-STUDENT",
  UPDATE_STUDENT: "UPDATE-STUDENT",
  DELETE_STUDENT: "DELETE-STUDENT",
  STUDENT_MODAL: "STUDENT-MODAL",
  GET_MORE_STUDENTS_BY_COURSE: "GET-MORE-STUDENT-BY-COURSE",
  GET_MORE_STUDENTS_ALL: "GET-MORE-STUDENTS-ALL",
  GET_MORE_STUDENTS_ALL_ADD: "GET-MORE-STUDENTS-ALL-ADD",
  STUDENT_LOADING: "STUDENT_LOADING",
  STUDENT_LOADING_ALL: "STUDENT_LOADING_ALL",
  GET_STUDENT_LAST_PAGE: "GET_STUDENT_LAST_PAGE",
  GET_MORE_STUDENTS_BY_COURSE_ADD: "GET_MORE_STUDENTS_BY_COURSE_ADD",
};

export const TUITION_FEE_ALL_ACTIONS_TYPE = {
  GET_TUITION_FEE_PAGINATION: "GET_TUITION_FEE_PAGINATION",
  CREATE_TUITION_FEE: "CREATE-TUITION_FEE",
  UPDATE_TUITION_FEE: "UPDATE-TUITION_FEE",
  DELETE_TUITION_FEE: "DELETE-TUITION_FEE",
  TUITION_FEE_MODAL: "TUITION_FEE-MODAL",
  GET_MORE_TUITION_FEE_BY_COURSE: "GET-MORE-TUITION_FEE-BY-COURSE",
  GET_MORE_TUITION_FEE_ALL: "GET-MORE-TUITION_FEE-ALL",
  GET_MORE_TUITION_FEE_ALL_ADD: "GET-MORE-TUITION_FEE-ALL-ADD",
  TUITION_FEE_LOADING: "TUITION_FEE_LOADING",
  TUITION_FEE_LOADING_ALL: "TUITION_FEE_LOADING_ALL",
  GET_TUITION_FEE_LAST_PAGE: "GET_TUITION_FEE_LAST_PAGE",
  GET_MORE_TUITION_FEE_BY_COURSE_ADD: "GET_MORE_TUITION_FEE_BY_COURSE_ADD",
};

export const CONSULTATION_ALL_ACTIONS_TYPE = {
  GET_CONSULTATION_PAGINATION: "GET_CONSULTATION_PAGINATION",
  CREATE_CONSULTATION: "CREATE-CONSULTATION",
  UPDATE_CONSULTATION: "UPDATE-CONSULTATION",
  DELETE_CONSULTATION: "DELETE-CONSULTATION",
  CONSULTATION_MODAL: "CONSULTATION-MODAL",
  GET_MORE_CONSULTATION_BY_COURSE: "GET-MORE-CONSULTATION-BY-COURSE",
  GET_MORE_CONSULTATION_ALL: "GET-MORE-CONSULTATION-ALL",
  GET_MORE_CONSULTATION_ALL_ADD: "GET-MORE-CONSULTATION-ALL-ADD",
  CONSULTATION_LOADING: "CONSULTATION_LOADING",
  CONSULTATION_LOADING_ALL: "CONSULTATION_LOADING_ALL",
  GET_CONSULTATION_LAST_PAGE: "GET_CONSULTATION_LAST_PAGE",
  GET_MORE_CONSULTATION_BY_COURSE_ADD: "GET_MORE_CONSULTATION_BY_COURSE_ADD",
};

export const AUTH_ALL_ACTION_TYPE = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  AUTH_LOADING: "AUTH_LOADING",
};

export const CHANGE_PASSPWORD_ACTION_TYPE = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  START_LOADING: "START_LOADING",
};
export const LESSON_TABLE_ALL_ACTION_TYPE = {
  GET_DATA: "GET-DATA",
  CREATE_DATA: "CREATE-DATA",
  UPDATE_DATA: "UPDATE-DATA",
  DELETE_DATA: "DELETE-DATA",
};
export const LESSON_TABLE_COLUMN_ACTION_TYPE = {
  GET_COLUMN: "GET-COLUMN",
};

export const SALARY_ACTION_TYPE = {
  GET_SALARY_PAGINATION: "GET_SALARY_PAGINATION",
  GET_TEACHER_SALARY_PAGINATION: "GET_TEACHER_SALARY_PAGINATION",
  SALARY_LOADING: "SALARY_LOADING",
};

export const DATEPICKER_ACTION_TYPE = {
  START_DATE: "START-DATE",
  END_DATE: "END-DATE",
};

export const MAIN_LESSONS_DATA_ACTION_TYPE = {
  GET_MAIN_LESSONS_DATA: "GET-MAIN_LESSONS_DATA",
  CREATE_MAIN_LESSONS_DATA: "CREATE-MAIN_LESSONS_DATA",
  DELETE_MAIN_LESSONS_DATA: "DELETE-MAIN_LESSONS_DATA",
  UPDATE_MAIN_LESSONS_DATA: "UPDATE-MAIN_LESSONS_DATA",
};

export const CURRENT_LESSONS_DATA_ACTION_TYPE = {
  GET_CURRENT_LESSONS_DATA: "GET-CURRENT_LESSONS_DATA",
  CREATE_CURRENT_LESSONS_DATA: "CREATE-CURRENT_LESSONS_DATA",
  DELETE_CURRENT_LESSONS_DATA: "DELETE-CURRENT_LESSONS_DATA",
  UPDATE_CURRENT_LESSONS_DATA: "UPDATE-CURRENT_LESSONS_DATA",
  COPY_MAIN_CURRENT: "COPY-MAIN-CURRENT",
  COPY_MAIN_CURRENT_BUTTON: "COPY_MAIN_CURRENT_BUTTON",
  UPDATE_OPEN_MODAL: "UPDATE_OPEN_MODAL",
};

export const NOTIFICATION_ACTION_TYPE = {
  GET_NOTIFICATION: "GET-NOTIFICATION",
  CREATE_NOTIFICATION: "CREATE-NOTIFICATION",
  UPDATE_NOTIFICATION: "UPDATE-NOTIFICATION",
  VIEWED_NOTIFICATION: "VIEWED-NOTIFICATION",
  NOTIFICATION_LOADING: "NOTIFICATION_LOADING",
};

export const STATUS_ACTION_TYPE = {
  UPDATE_STATUS: "UPDATE-STATUS",
};

export const MODAL_LESSON_ACTION_TYPE = {
  SET_MODAL_LESSON: "SET_MODAL_LESSON",
  LESSON_MODAL_LOADING: "LESSON_MODAL_LOADING",
  LESSON_DELETE_MODAL_LOADING: "LESSON_DELETE_MODAL_LOADING",
};

export const DROPDOWN_NAME_ACTION_TYPE = {
  GET_DROPDOWN: "GET-DROPDOWN",
};

export const DROPDOWN_ERROR_TYPE = {
  GET_DROPDOWN_ERROR: "GET_DROPDOWN_ERROR",
};

export const LESSON_STATUS_ACTION_TYPE = {
  UPDATE_LESSON_STATUS: "UPDATE_LESSON_STATUS",
};

export const LESSON_TABLE_TYPE_ACTION_TYPE = {
  GET_LESSON_TABLE_TYPE: "GET-TABLE-TYPE",
};

export const MAIN_PAGE_TYPE_ACTION_TYPE = {
  GET_MAIN_PAGE_TYPE: "GET-MAIN-PAGE-TYPE",
};

export const STUDENT_ATTENDACE_ACTION_TYPE = {
  GET_STUDENT_ATTENDANCE_TYPE: "GET-STUDENT-ATTENDACE-TYPE",
};

export const INVALID_TOKEN_ACTION_TYPE = {
  GET_INVALID_TOKEN: "GET-INVALID-TOKEN",
};

export const MAINPAGE_LESSONS_ACTION_TYPE = {
  GET_MAINPAGE_LESSONS: "GET-MAINPAGE-LESSONS",
  UPDATE_MAINPAGE_LESSONS: "UPDATE-MAINPAGE-LESSONS",
  /* temporary table */
  CREATE_TEMPORARY_LESSONS: "CREATE-TEMPORARY-LESSONS",
  UPDATE_TEMPORARY_LESSONS: "UPDATE-TEMPORARY-LESSONS",
  DELETE_TEMPORARY_LESSONS: "DELETE-TEMPORARY-LESSONS",
};

export const FULLED_CELLS_ACTION_TYPE = {
  GET_FULLED_CELLS: "GET_FULLED_CELLS",
  UPDATE_FULLED_CELLS: "UPDATE_FULLED_CELLS",
};

export const USER_ACTION_TYPE = {
  ADD_USER: "ADD-USER",
  UPDATE_IMAGE: "UPDATE-IMAGE",
  GET_IMAGE: "GET-IMAGE",
  LOADING: "LOADING",
  ERROR: "ERROR",
};

export const WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE = {
  GET_SELECTED_DATES: "GET-SELECTED-DATES",
};

export const PAGINATION_PAGE_NUMBER_ACTION_TYPE = {
  GET_PAGE_NUMBER: "GET-PAGE-NUMBER",
  UPDATE_PAGE_NUMBER: "UPDATE-PAGE-NUMBER",
};

export const SEARCH_VALUES_ACTION_TYPES = {
  TEACHERS_SEARCH_VALUE: "TEACHERS_SEARCH_VALUE",
  WORKERS_SEARCH_VALUE: "WORKERS_SEARCH_VALUE",
  GROUPS_SEARCH_VALUE: "GROUPS_SEARCH_VALUE",
  LESSON_TABLE_SEARCH_VALUE: "LESSON_TABLE_SEARCH_VALUE",
  SYLLABUS_SEARCH_VALUE: "SYLLABUS_SEARCH_VALUE",
  CAREER_SEARCH_VALUE: "CAREER_SEARCH_VALUE",
  ADMINS_SEARCH_VALUE: "ADMINS_SEARCH_VALUE",
  STUDENTS_SEARCH_VALUE: "STUDENTS_SEARCH_VALUE",
  TUITION_FEE_SEARCH_VALUE: "TUITION_FEE_SEARCH_VALUE",
  CONSULTATION_SEARCH_VALUE: "CONSULTATION_SEARCH_VALUE",
  COURSES_SEARCH_VALUE: "COURSES_SEARCH_VALUE",
  SALARIES_SEARCH_VALUE: "SALARIES_SEARCH_VALUE",
  EXPENSES_SEARCH_VALUE: "EXPENSES_SEARCH_VALUE",
  BONUS_SEARCH_VALUE: "BONUS_SEARCH_VALUE",
  FINE_SEARCH_VALUE: "FINE_SEARCH_VALUE",
  FEEDBACK_SEARCH_VALUE: "FEEDBACK_SEARCH_VALUE",
  STUDENT_FEEDBACK_SEARCH_VALUE: "STUDENT_FEEDBACK_SEARCH_VALUE",
};

export const DASHBOARD_ACTIONS_TYPE = {
  GET_DASHBOARD: "GET_DASHBOARD",
  GET_DASHBOARD_CONFIRMED_LESSONS: "GET_DASHBOARD_CONFIRMED_LESSONS",
  GET_DASHBOARD_CANCELLED_LESSONS: "GET_DASHBOARD_CANCELLED_LESSONS",
  GET_DASHBOARD_UNVIEWED_LESSONS: "GET_DASHBOARD_UNVIEWED_LESSONS",
  UPDATE_DASHBOARD_UNVIEWED_LESSONS: "UPDATE_DASHBOARD_UNVIEWED_LESSONS",
  GET_DASHBOARD_FINANCE: "GET_DASHBOARD_FINANCE",
  GET_DASHBOARD_COURSE_STATISTIC: "GET_DASHBOARD_COURSE_STATISTIC",
  GET_DASHBOARD_ADVERTISING: "GET_DASHBOARD_ADVERTISING",
  GET_DASHBOARD_LEADBOARD: "GET_DASHBOARD_LEADBOARD:",
  GET_DASHBOARD_STUDENTS_AMOUNT: "GET_DASHBOARD_STUDENTS_AMOUNT",
};

export const FINANCE_ACTIONS_TYPE = {
  GET_FINANCE_CHART: "GET_FINANCE_CHART",
  GET_FINANCE_DATA: "GET_FINANCE_DATA",
};

export const FORGET_PASSWORD_ACTIONS_TYPE = {
  SEND_EMAIL: "SEND_EMAIL",
  CHECKOTP: "CHECKOTP",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  GO_TO_FORGET_PAGE: "GO_TO_FORGET_PAGE",
  FORGET_ERROR: "FORGET_ERROR",
  FORGET_LOADING: "FORGET_LOADING",
};

export const EXPENSES_ACTION_TYPE = {
  GET_EXPENSES: "GET_EXPENSES",
  CREATE_EXPENSES: "CREATE_EXPENSES",
  UPDATE_EXPENSES: "UPDATE_EXPENSES",
  DELETE_EXPENSES: "DELETE_EXPENSES",
  EXPENSES_LOADING: "EXPENSES_LOADING",
  EXPENSES_MODAL: "EXPENSES_MODAL",
  GET_EXPENSES_PAGINATION: "GET_EXPENSES_PAGINATION",
  GET_EXPENSES_LAST_PAGE: "GET_EXPENSES_LAST_PAGE",
};

export const INCOME_ACTION_TYPE = {
  GET_INCOME: "GET_INCOME",
  CREATE_INCOME: "CREATE_INCOME",
  UPDATE_INCOME: "UPDATE_INCOME",
  DELETE_INCOME: "DELETE_INCOME",
  INCOME_LOADING: "INCOME_LOADING",
  GET_INCOME_PAGINATION: "GET_INCOME_PAGINATION",
  GET_INCOME_LAST_PAGE: "GET_INCOME_LAST_PAGE",
};

export const FUNC_COMPONENT_ACTION_TYPE = {
  GET_FUNC_COMP: "GET_FUNC_COMP",
};

export const COURSES_MODAL_ACTION_TYPE = {
  GET_COURSES_MODAL: "GET_COURSES_MODAL",
  COURSE_OPEN_MODAL: "COURSE_OPEN_MODAL",
  COURSE_MODAL_LOADING: "COURSE_MODAL_LOADING",
  CLOSE_COURSE_CONFIRM_MODAL: "CLOSE_COURSE_CONFIRM_MODAL",
  OPEN_COURSE_CONFIRM_MODAL: "OPEN_COURSE_CONFIRM_MODAL",
};

export const STUDENTS_MODAL_ACTION_TYPE = {
  GET_STUDENTS_MODAL: "GET_STUDENTS_MODAL",
  STUDENT_OPEN_MODAL: "STUDENT_OPEN_MODAL",
  STUDENT_MODAL_LOADING: "STUDENT_MODAL_LOADING",
  CLOSE_STUDENT_CONFIRM_MODAL: "CLOSE_STUDENT_CONFIRM_MODAL",
  OPEN_STUDENT_CONFIRM_MODAL: "OPEN_STUDENT_CONFIRM_MODAL",
};

export const TUITION_FEE_MODAL_ACTION_TYPE = {
  GET_TUITION_FEE_MODAL: "GET_TUITION_FEE_MODAL",
  TUITION_FEE_OPEN_MODAL: "TUITION_FEE_OPEN_MODAL",
  TUITION_FEE_MODAL_LOADING: "TUITION_FEE_MODAL_LOADING",
  UPDATE_TUITION_FEE_PAYMENTS: "UPDATE_TUITION_FEE_PAYMENTS",
  CLOSE_CONFIRM_MODAL: "CLOSE_CONFIR_MODAL",
};

export const CONSULTATION_MODAL_ACTION_TYPE = {
  GET_CONSULTATION_MODAL: "GET_CONSULTATION_MODAL",
  CONSULTATION_OPEN_MODAL: "CONSULTATION_OPEN_MODAL",
  CONSULTATION_MODAL_LOADING: "CONSULTATION_MODAL_LOADING",
  CLOSE_CONSULTATION_CONFIRM_MODAL: "CLOSE_CONSULTATION_CONFIRM_MODAL",
  OPEN_CONSULTATION_CONFIRM_MODAL: "OPEN_CONSULTATION_CONFIRM_MODAL",
};

export const TEACHERS_MODAL_ACTION_TYPE = {
  GET_TEACHERS_MODAL: "GET_TEACHERS_MODAL",
  TEACHER_OPEN_MODAL: "TEACHER_OPEN_MODAL",
  TEACHER_MODAL_LOADING: "TEACHER_MODAL_LOADING",
  CLOSE_TEACHER_CONFIRM_MODAL: "CLOSE_TEACHER_CONFIRM_MODAL",
  OPEN_TEACHER_CONFIRM_MODAL: "OPEN_TEACHER_CONFIRM_MODAL",
};

export const WORKER_MODAL_ACTION_TYPE = {
  GET_WORKER_MODAL: "GET_WORKER_MODAL",
  WORKER_OPEN_MODAL: "WORKER_OPEN_MODAL",
  WORKER_MODAL_LOADING: "WORKER_MODAL_LOADING",
};

export const GROUP_MODAL_ACTION_TYPE = {
  GET_GROUP_MODAL: "GET_GROUP_MODAL",
  GROUP_OPEN_MODAL: "GROUP_OPEN_MODAL",
  GROUP_MODAL_LOADING: "GROUP_MODAL_LOADING",
  CLOSE_GROUP_CONFIRM_MODAL: "CLOSE_GROUP_CONFIRM_MODAL",
  OPEN_GROUP_CONFIRM_MODAL: "OPEN_GROUP_CONFIRM_MODAL",
};

export const LESSON_TABLE_MODAL_ACTION_TYPE = {
  GET_LESSON_TABLE_MODAL: "GET_LESSON_TABLE_MODAL",
  LESSON_TABLE_OPEN_MODAL: "LESSON_TABLE_OPEN_MODAL",
  LESSON_TABLE_MODAL_LOADING: "LESSON_TABLE_MODAL_LOADING",
  STUDENT_MODAL: "STUDENT_MODAL",
  CLOSE_LESSON_CONFIRM_MODAL: "CLOSE_LESSON_CONFIRM_MODAL",
  OPEN_LESSON_CONFIRM_MODAL: "OPEN_LESSON_CONFIRM_MODAL",
};
export const SYLLABUS_MODAL_ACTION_TYPE = {
  GET_SYLLABUS_MODAL: "GET_SYLLABUS_MODAL",
  SYLLABUS_OPEN_MODAL: "SYLLABUS_OPEN_MODAL",
  SYLLABUS_MODAL_LOADING: "SYLLABUS_MODAL_LOADING",
  CLOSE_SYLLABUS_CONFIRM_MODAL: "CLOSE_SYLLABUS_CONFIRM_MODAL",
  OPEN_SYLLABUS_CONFIRM_MODAL: "OPEN_SYLLABUS_CONFIRM_MODAL",
};
export const CAREER_MODAL_ACTION_TYPE = {
  GET_CAREER_MODAL: "GET_CAREER_MODAL",
  CAREER_OPEN_MODAL: "CAREER_OPEN_MODAL",
  CAREER_MODAL_LOADING: "CAREER_MODAL_LOADING",
};

export const ADMINS_MODAL_ACTION_TYPE = {
  GET_ADMINS_MODAL: "GET_ADMINS_MODAL",
  ADMIN_OPEN_MODAL: "ADMIN_OPEN_MODAL",
  ADMIN_MODAL_LOADING: "ADMIN_MODAL_LOADING",
};

export const EXPENSES_MODAL_ACTION_TYPE = {
  GET_EXPENSES_MODAL: "GET_EXPENSES_MODAL",
  EXPENSES_OPEN_MODAL: "EXPENSES_OPEN_MODAL",
  EXPENSES_MODAL_LOADING: "EXPENSES_MODAL_LOADING",
  EXPENSES_MODAL_ACTIVATE_GET: "EXPENSES_MODAL_ACTIVATE_GET",
};
export const INCOMES_MODAL_ACTION_TYPE = {
  GET_INCOMES_MODAL: "GET_INCOMES_MODAL",
  INCOMES_OPEN_MODAL: "INCOMES_OPEN_MODAL",
  INCOMES_MODAL_LOADING: "INCOMES_MODAL_LOADING",
  INCOMES_MODAL_ACTIVATE_GET: "INCOMES_MODAL_ACTIVATE_GET",
};

export const BONUS_MODAL_ACTION_TYPE = {
  GET_BONUS_MODAL: "GET_BONUS_MODAL",
  BONUS_MODAL_LOADING: "BONUS_MODAL_LOADING",
  BONUS_OPEN_MODAL: "BONUS_OPEN_MODAL",
};
export const FEEDBACK_MODAL_ACTION_TYPE = {
  GET_FEEDBACK_MODAL: "GET_FEEDBACK_MODAL",
  FEEDBACK_OPEN_MODAL: "FEEDBACK_OPEN_MODAL",
  FEEDBACK_MODAL_LOADING: "FEEDBACK_MODAL_LOADING",
};
export const FINE_MODAL_ACTION_TYPE = {
  GET_FINE_MODAL: "GET_FINE_MODAL",
  FINE_OPEN_MODAL: "FINE_OPEN_MODAL",
  FINE_MODAL_LOADING: "FINE_MODAL_LOADING",
};

export const SIDEBAR_ACTION_TYPE = {
  SIDEBAR_OPEN_MODAL: "SIDEBAR_OPEN_MODAL",
};

export const STIMULATION_PAGE_TYPE_ACTION_TYPE = {
  GET_STIMULATION_PAGE_TYPE: "GET-STIMULATION-PAGE-TYPE",
};

export const BONUS_PAGINATION_ACTION_TYPE = {
  GET_BONUS: "GET-BONUS",
  CREATE_BONUS: "CREATE_BONUS",
  UPDATE_BONUS: "UPDATE_BONUS",
  DELETE_BONUS: "DELETE_BONUS",
  BONUS_LOADING: "BONUS_LOADING",
  BONUS_MODAL: "BONUS_MODAL",
  GET_BONUS_PAGINATION: "GET_BONUS_PAGINATION",
  GET_BONUS_LAST_PAGE: "GET_BONUS_LAST_PAGE",
};

export const TEACHER_BONUS_ACTION_TYPE = {
  GET_TEACHER_BONUS: "GET_TEACHER_BONUS",
  GET_TEACHER_FINE: "GET_TEACHER_FINE",
};

export const FINE_PAGINATION_ACTION_TYPE = {
  GET_FINE: "GET-FINE",
  CREATE_FINE: "CREATE_FINE",
  UPDATE_FINE: "UPDATE_FINE",
  DELETE_FINE: "DELETE_FINE",
  FINE_LOADING: "FINE_LOADING",
  FINE_MODAL: "FINE_MODAL",
  GET_FINE_PAGINATION: "GET_FINE_PAGINATION",
  GET_FINE_LAST_PAGE: "GET_FINE_LAST_PAGE",
};

export const FEEDBACK_PAGE_TYPE_ACTION_TYPE = {
  GET_FEEDBACK_PAGE_TYPE: "GET-FEEDBACK-PAGE-TYPE",
};

export const FEEDBACK_PAGINATION_ACTION_TYPE = {
  GET_FEEDBACK: "GET_FEEDBACK",
  GET_FEEDBACK_LAST_PAGE: "GET_FEEDBACK_LAST_PAGE",
  DELETE_FEEDBACK: "DELETE_FEEDBACK:",
  FEEDBACK_LOADING: "FEEDBACK_LOADING",
};

export const FEEDBACKS_BY_TEACHER_ACTION_TYPE = {
  GET_FEEDBACKS_BY_TEACHER: "GET_FEEDBACKS_BY_TEACHER",
  CREATE_FEEDBACKS_BY_TEACHER: " CREATE_FEEDBACKS_BY_TEACHER",
  UPDATE_FEEDBACKS_BY_TEACHER: " UPDATE_FEEDBACKS_BY_TEACHER",
  DELETE_FEEDBACKS_BY_TEACHER: "DELETE_FEEDBACKS_BY_TEACHER",
};

export const FINANCE_FILTER_ACTION_TYPE = {
  GET_CHOOSE_DATE_FILTER: "GET_CHOOSE_DATE_FILTER",
  GET_MONTHS_FILTER: "GET_MONTHS_FILTER",
  GET_DATE_SELECTED_OPTION: "GET_DATE_SELECTED_OPTION",

  GET_INCOME_CATEGORY_FILTER: "GET_INCOME_CATEGORY_FILTER",
  GET_INCOME_SORTING_FILTER: "GET_INCOME_SORTING_FILTER",

  GET_EXPENSE_CATEGORY_FILTER: "GET_EXPENSE_CATEGORY_FILTER",
  GET_EXPENSE_SORTING_FILTER: "GET_EXPENSE_SORTING_FILTER",

  ClEAR_CATEGORY_SORT: "ClEAR_CATEGORY_SORT",
};

export const FINE_FILTER_ACTION_TYPE = {
  GET_FINE_CATEGORY: "GET_FINE_CATEGORY",
};

export const TEACHER_STATUS_FILTER_ACTION_TYPE = {
  GET_TEACHER_STATUS: "GET_TEACHER_STATUS",
};

export const STUDENT_STATUS_FILTER_ACTION_TYPE = {
  GET_STUDENT_STATUS: "GET_STUDENT_STATUS",
};
export const LESSON_LESSON_TABLE_MODAL_ACTION_TYPE = {
  GET_LESSON_LESSON_TABLE_MODAL: "GET_LESSON_LESSON_TABLE_MODAL",
};

export const MENTOR_TYPES = {
  GET_MENTORS: "GET_MENTORS",
};
