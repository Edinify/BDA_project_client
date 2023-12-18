import {
  FINE_MODAL_ACTION_TYPE,
  FINE_PAGINATION_ACTION_TYPE,
  TEACHER_BONUS_ACTION_TYPE,
} from "../actions-type";
import axios from "axios";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/fine`,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
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
  type: FINE_PAGINATION_ACTION_TYPE.FINE_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: FINE_MODAL_ACTION_TYPE.FINE_MODAL_LOADING,
  payload: loadingValue,
});

export const getTeacherFineAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me?startDate=${startDate || ""}&endDate=${endDate || ""}&monthCount=${
          monthCount || ""
        }`
      );
      dispatch({
        type: TEACHER_BONUS_ACTION_TYPE.GET_TEACHER_FINE,
        payload: data,
      });
    } catch (error) {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
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
            `/me?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_BONUS_ACTION_TYPE.GET_TEACHER_FINE,
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

export const getFinePaginationAction =
  (startDate = "", endDate = "", searchQuery = "", page = 1, category) =>
  async (dispatch) => {
    const categoryResult = category ? (category !== "all" ? category : "") : "";
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&searchQuery=${searchQuery}&page=${page}&fineType=${categoryResult}`
      );

      dispatch({
        type: FINE_PAGINATION_ACTION_TYPE.GET_FINE_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: FINE_PAGINATION_ACTION_TYPE.GET_FINE_PAGINATION,
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
            `/?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&searchQuery=${searchQuery}&page=${page}&fineType=${categoryResult}`
          );

          dispatch({
            type: FINE_PAGINATION_ACTION_TYPE.GET_FINE_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: FINE_PAGINATION_ACTION_TYPE.GET_FINE_PAGINATION,
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

export const createFineAction = (fineData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", fineData);
    dispatch(getFinePaginationAction("", "", "", data.lastPage, ""));
    dispatch({ type: FINE_MODAL_ACTION_TYPE.FINE_OPEN_MODAL, payload: false });
    toastSuccess("Yeni cərimə əlavə edildi");
  } catch (error) {
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.post("/", fineData);
        dispatch(getFinePaginationAction("", "", "", data.lastPage, ""));
        dispatch({
          type: FINE_MODAL_ACTION_TYPE.FINE_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni cərimə əlavə edildi");
      } catch (error) {
        console.log(error);
        toastError(error?.response?.data.message);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (
      error?.response?.data?.message ===
      "Fine validation failed: teacher: Path `teacher` is required."
    ) {
      toastError("Müəllim adı düzgün daxil edilməyib");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateFineAction = (_id, fineData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, fineData);
    dispatch(getFinePaginationAction("", "", "", 1, ""));
    dispatch({ type: FINE_PAGINATION_ACTION_TYPE.UPDATE_FINE, payload: data });
    dispatch({ type: FINE_MODAL_ACTION_TYPE.FINE_OPEN_MODAL, payload: false });
    toastSuccess("cərimə yeniləndi");
  } catch (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.patch(`/${_id}`, fineData);
        dispatch(getFinePaginationAction("", "", "", 1, ""));
        dispatch({
          type: FINE_PAGINATION_ACTION_TYPE.UPDATE_FINE,
          payload: data,
        });
        dispatch({
          type: FINE_MODAL_ACTION_TYPE.FINE_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("cərimə yeniləndi");
      } catch (error) {
        console.log(error);
        toastError(error?.response?.data.message);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (
      error?.response?.data?.message ===
      "Fine validation failed: teacher: Path `teacher` is required."
    ) {
      toastError("Müəllim adı düzgün daxil edilməyib");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deletetFineAction =
  ({ _id, startDate, endDate, searchQuery, page, category }) =>
  async (dispatch) => {
    try {
      await API.delete(`/${_id}`);
      dispatch({ type: FINE_PAGINATION_ACTION_TYPE.DELETE_FINE, payload: _id });
      dispatch(
        getFinePaginationAction(startDate, endDate, searchQuery, page, category)
      );

      toastSuccess("cərimə silindi");
    } catch (error) {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
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
          dispatch({
            type: FINE_PAGINATION_ACTION_TYPE.DELETE_FINE,
            payload: _id,
          });
          dispatch(
            getFinePaginationAction(
              startDate,
              endDate,
              searchQuery,
              page,
              category
            )
          );
          toastSuccess("cərimə silindi");
        } catch (error) {
          console.log(error);
          toastError(error?.response?.data.message);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    }
  };
