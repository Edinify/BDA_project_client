import axios from "axios";
import {
  CURRENT_LESSONS_DATA_ACTION_TYPE,
  DASHBOARD_ACTIONS_TYPE,
  MAINPAGE_LESSONS_ACTION_TYPE,
  // LESSON_TABLE_MODAL_ACTION_TYPE,
  MODAL_LESSON_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/lesson/`,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const setLessonLoadingAction = (loadingValue) => ({
  type: MODAL_LESSON_ACTION_TYPE.LESSON_MODAL_LOADING,
  payload: loadingValue,
});
export const setLessondDeleteLoadingAction = (loadingValue) => ({
  type: MODAL_LESSON_ACTION_TYPE.LESSON_DELETE_MODAL_LOADING,
  payload: loadingValue,
});
export const clearLessonModal = () => ({
  type: MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON,
  payload: { modalLesson: {}, openModal: false },
});

export const getCurrentLessonsDataAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.get(`/current?teacherId=${id}`);
    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.GET_CURRENT_LESSONS_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.get(`/current?teacherId=${id}`);
        dispatch({
          type: CURRENT_LESSONS_DATA_ACTION_TYPE.GET_CURRENT_LESSONS_DATA,
          payload: data,
        });
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};

export const updateCurrentLessonsDataAction = (payload) => async (dispatch) => {
  dispatch(setLessonLoadingAction(true));
  try {
    const { data } = await API.patch(`table/${payload._id}`, payload);

    dispatch(clearLessonModal());

    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_CURRENT_LESSONS_DATA,
      payload: data,
    });
    /* temporary table */
    if (window.location.pathname === "/temporary-table") {
      dispatch({
        type: MAINPAGE_LESSONS_ACTION_TYPE.UPDATE_TEMPORARY_LESSONS,
        payload: data,
      });
    }

    toastSuccess("Dərs  yeniləndi");
  } catch (error) {
    console.log(error);
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.patch(`table/${payload._id}`, payload);

        dispatch(clearLessonModal());

        dispatch({
          type: CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_CURRENT_LESSONS_DATA,
          payload: data,
        });
        toastSuccess("Dərs yeniləndi");
        /* temporary table */

        if (window.location.pathname === "/temporary-table") {
          dispatch({
            type: MAINPAGE_LESSONS_ACTION_TYPE.UPDATE_TEMPORARY_LESSONS,
            payload: data,
          });
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(setLessonLoadingAction(false));
  }
};

export const updateCurrentLessonsDataInMainPanelAction =
  (payload) => async (dispatch) => {
    dispatch(setLessonLoadingAction(true));
    try {
      const { data } = await API.patch(
        `main/panel/${payload.lessonData._id}/?whoFor=${
          payload?.studentTab || ""
        }`,
        payload.lessonData
      );

      dispatch(clearLessonModal());

      dispatch({
        type: MAINPAGE_LESSONS_ACTION_TYPE.UPDATE_MAINPAGE_LESSONS,
        payload: data,
      });
      if (window.location.pathname === "/dashboard") {
        dispatch({
          type: DASHBOARD_ACTIONS_TYPE.UPDATE_DASHBOARD_UNVIEWED_LESSONS,
          payload: data,
        });
      }
      toastSuccess("Dərs  yeniləndi");
    } catch (error) {
      console.log(error, "error");
      if (error.response.data.key === "create-error-occurred") {
        toastError("Xəta baş verdi");
      }
      const originalRequest = error.config;
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const { data } = await API.patch(
            `main/panel/${payload.lessonData._id}?whoFor=${
              payload?.studentTab || ""
            }`,
            payload.lessonData
          );

          dispatch(clearLessonModal());

          dispatch({
            type: MAINPAGE_LESSONS_ACTION_TYPE.UPDATE_MAINPAGE_LESSONS,
            payload: data,
          });
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(setLessonLoadingAction(false));
    }
  };

export const createCurrentLessonsDataAction =
  (tablepageData) => async (dispatch) => {
    dispatch(setLessonLoadingAction(true));
    try {
      const { data } = await API.post("/", tablepageData);

      dispatch(clearLessonModal());

      dispatch({
        type: CURRENT_LESSONS_DATA_ACTION_TYPE.CREATE_CURRENT_LESSONS_DATA,
        payload: data,
      });

      /* temporary table */
      if (window.location.pathname === "/temporary-table") {
        dispatch({
          type: MAINPAGE_LESSONS_ACTION_TYPE.CREATE_TEMPORARY_LESSONS,
          payload: data,
        });
      }
      toastSuccess("Yeni dərs yaradıldı");
    } catch (error) {
      const originalRequest = error.config;
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const { data } = await API.post("/", tablepageData);

          dispatch(clearLessonModal());

          dispatch({
            type: CURRENT_LESSONS_DATA_ACTION_TYPE.CREATE_CURRENT_LESSONS_DATA,
            payload: data,
          });

          /* temporary table */
          if (window.location.pathname === "/temporary-table") {
            dispatch({
              type: MAINPAGE_LESSONS_ACTION_TYPE.CREATE_TEMPORARY_LESSONS,
              payload: data,
            });
          }
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(setLessonLoadingAction(false));
    }
  };

export const deleteCurrentLessonsDataAction = (_id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`table/panel/${_id}`);

    dispatch(clearLessonModal());

    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.DELETE_CURRENT_LESSONS_DATA,
      payload: data._id,
    });
    /* temporary table */
    if (window.location.pathname === "/temporary-table") {
      dispatch({
        type: MAINPAGE_LESSONS_ACTION_TYPE.DELETE_TEMPORARY_LESSONS,
        payload: data._id,
      });
    }
    toastSuccess("Dərs silindi");
  } catch (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.delete(`table/panel/${_id}`);

        // dispatch(clearLessonModal());

        dispatch({
          type: CURRENT_LESSONS_DATA_ACTION_TYPE.DELETE_CURRENT_LESSONS_DATA,
          payload: data._id,
        });
        /* temporary table */
        if (window.location.pathname === "/temporary-table") {
          dispatch({
            type: MAINPAGE_LESSONS_ACTION_TYPE.DELETE_TEMPORARY_LESSONS,
            payload: data._id,
          });
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    // dispatch(setLessondDeleteLoadingAction(false));
  }
};

export const copyMainToCurrent = () => async (dispatch) => {
  try {
    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.COPY_MAIN_CURRENT_BUTTON,
      payload: { disabled: true },
    });

    const { data } = await API.post("/current/all");
    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_OPEN_MODAL,
      payload: true,
    });
    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.COPY_MAIN_CURRENT,
      payload: data,
    });
    // dispatch(getCopyMainToCurrentButton())
  } catch (error) {
    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_OPEN_MODAL,
      payload: false,
    });
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.post("/current/all");
        dispatch({
          type: CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_OPEN_MODAL,
          payload: true,
        });
        dispatch({
          type: CURRENT_LESSONS_DATA_ACTION_TYPE.COPY_MAIN_CURRENT,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_OPEN_MODAL,
          payload: false,
        });
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};

export const getCopyMainToCurrentButton = () => async (dispatch) => {
  try {
    const { data } = await API.get("/update-button");
    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.COPY_MAIN_CURRENT_BUTTON,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CURRENT_LESSONS_DATA_ACTION_TYPE.UPDATE_OPEN_MODAL,
      payload: false,
    });
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );
        const { data } = await API.get("/update-button");
        dispatch({
          type: CURRENT_LESSONS_DATA_ACTION_TYPE.COPY_MAIN_CURRENT_BUTTON,
          payload: data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    console.log(error);
  }
};
