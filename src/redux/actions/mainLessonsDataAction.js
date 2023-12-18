import axios from "axios";
import {
  MAIN_LESSONS_DATA_ACTION_TYPE,
  MODAL_LESSON_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials:true
});

const API = axios.create({
  baseURL: `${apiRoot}/lesson/`,
  withCredentials:true
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
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

export const setLessonLoadingAction = (loadingValue) => ({
  type: MODAL_LESSON_ACTION_TYPE.LESSON_MODAL_LOADING,
  payload: loadingValue,
});
export const clearLessonModal = () => ({
  type: MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON,
  payload: { modalLesson: {}, openModal: false },
});

export const getMainLessonsDataAction = (id) => async (dispatch) => {
  try {
    const { data } = await API.get(`/main?teacherId=${id}`);
    dispatch({
      type: MAIN_LESSONS_DATA_ACTION_TYPE.GET_MAIN_LESSONS_DATA,
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

        const { data } = await API.get(`/main?teacherId=${id}`);
        dispatch({
          type: MAIN_LESSONS_DATA_ACTION_TYPE.GET_MAIN_LESSONS_DATA,
          payload: data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }
  }
};

export const updateMainLessonsDataAction = (payload) => async (dispatch) => {
  dispatch(setLessonLoadingAction(true));
  try {
    const { data } = await API.patch(`table/${payload._id}`, payload);

    dispatch(clearLessonModal());

    dispatch({
      type: MAIN_LESSONS_DATA_ACTION_TYPE.UPDATE_MAIN_LESSONS_DATA,
      payload: data,
    });
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
          type: MAIN_LESSONS_DATA_ACTION_TYPE.UPDATE_MAIN_LESSONS_DATA,
          payload: data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }
  } finally {
    dispatch(setLessonLoadingAction(false));
  }
};

export const createMainLessonsDataAction = (mainData) => async (dispatch) => {
  dispatch(setLessonLoadingAction(true));
  try {
    const { data } = await API.post("/", mainData);

    dispatch(clearLessonModal());

    dispatch({
      type: MAIN_LESSONS_DATA_ACTION_TYPE.CREATE_MAIN_LESSONS_DATA,
      payload: data,
    });
    toastSuccess("Yeni dərs  yaradıldı");
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

        const { data } = await API.post("/", mainData);

        dispatch(clearLessonModal());

        dispatch({
          type: MAIN_LESSONS_DATA_ACTION_TYPE.CREATE_MAIN_LESSONS_DATA,
          payload: data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }
  }
};

export const deleteMainLessonsDataAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`table/panel/${_id}`);
    dispatch({
      type: MAIN_LESSONS_DATA_ACTION_TYPE.DELETE_MAIN_LESSONS_DATA,
      payload: _id,
    });
    toastSuccess("Dərs silindi");
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

        await API.delete(`main/panel/${_id}`);
        dispatch({
          type: MAIN_LESSONS_DATA_ACTION_TYPE.DELETE_MAIN_LESSONS_DATA,
          payload: _id,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }
  } finally {
    dispatch(setLessonLoadingAction(false));
  }
};
