import axios from "axios";
import {
  LESSON_TABLE_ALL_ACTIONS_TYPE,
  LESSON_TABLE_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/lesson`,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const REGISTERAPI = axios.create({
  baseURL: `${apiRoot}/user/auth`,
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

REGISTERAPI.interceptors.request.use((req) => {
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
const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    toastClassName: "custom-toast",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
const pageLoading = (loadingValue) => ({
  type: LESSON_TABLE_ALL_ACTIONS_TYPE.LESSON_TABLE_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_MODAL_LOADING,
  payload: loadingValue,
});

export const getLessonTablePaginationAction =
  (pageNumber, searchQuery, groupId) => async (dispatch) => {
    dispatch(pageLoading(true));
    // console.log(pageNumber, searchQuery, groupId);
    try {
      const { data } = await API.get(
        `/?page=${pageNumber}&searchQuery=${searchQuery}&groupId=${groupId}`
      );
      // console.log(data);
      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_LAST_PAGE,
        payload: pageNumber,
      });

      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_PAGINATION,
        payload: data,
      });
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
          const { data } = await API.get(
            `/?page=${pageNumber}&searchQuery=${searchQuery}&groupId=${groupId}`
          );

          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_LAST_PAGE,
            payload: pageNumber,
          });

          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_TABLE_PAGINATION,
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
      dispatch(pageLoading(false));
    }
  };

export const createLessonTableAction =
  (lessonTableData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.post("/", lessonTableData);
      dispatch(getLessonTablePaginationAction(data.lastPage, "", data.group));
      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
        payload: false,
      });
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
          const { data } = await API.post("/create", lessonTableData);
          dispatch(getLessonTablePaginationAction(data.lastPage, ""));
          dispatch({
            type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Yeni dərs yaradıldı");
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      console.log(error);
    } finally {
      dispatch(modalLoading(false));
    }
  };

export const updateLessonTableAction =
  (_id, lessonTableData) => async (dispatch) => {
    dispatch(modalLoading(true));

    try {
      const { data } = await API.patch(`/${_id}`, lessonTableData);

      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE,
        payload: data,
      });
      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
        payload: false,
      });
      dispatch({
        type: LESSON_TABLE_MODAL_ACTION_TYPE.STUDENT_MODAL,
        payload: false,
      });
      toastSuccess("Dərs yeniləndi");
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
          const { data } = await API.patch(`/${_id}`, lessonTableData);
          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.UPDATE_LESSON_TABLE,
            payload: data,
          });
          dispatch({
            type: LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Dərs yeniləndi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(modalLoading(false));
    }
  };

export const deleteLessonTableAction =
  ({ _id, pageNumber, searchQuery }) =>
  async (dispatch) => {
    try {
      await API.delete(`/${_id}`);
      dispatch(getLessonTablePaginationAction(pageNumber, searchQuery));
      dispatch({
        type: LESSON_TABLE_ALL_ACTIONS_TYPE.DELETE_LESSON_TABLE,
        payload: _id,
      });
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
          await API.delete(`/${_id}`);
          dispatch(getLessonTablePaginationAction(pageNumber, searchQuery));
          dispatch({
            type: LESSON_TABLE_ALL_ACTIONS_TYPE.DELETE_LESSON_TABLE,
            payload: _id,
          });
          toastSuccess("Dərs silindi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      if (error?.response?.data?.key === "has-current-week-lessons") {
        toastError("Cari həftədə  dərsi olan dərs silinə bilməz");
      }
      console.log(error);
      toastError(error?.response?.data.message);
    }
  };
