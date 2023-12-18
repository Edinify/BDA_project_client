import axios from "axios";
import {
  TUITION_FEE_ALL_ACTIONS_TYPE,
  TUITION_FEE_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const API = axios.create({
  baseURL: `${apiRoot}/user/student`,
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

const pageLoading = (loadingValue) => ({
  type: TUITION_FEE_ALL_ACTIONS_TYPE.TUITION_FEE_LOADING,
  payload: loadingValue,
});
export const setLoadingAllTuitionFeeAction = (loadingValue) => ({
  type: TUITION_FEE_ALL_ACTIONS_TYPE.TUITION_FEE_LOADING_ALL,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: TUITION_FEE_MODAL_ACTION_TYPE.TUITION_FEE_MODAL_LOADING,
  payload: loadingValue,
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

export const getActiveTuitionFeeAction = (payload) => async (dispatch) => {
  dispatch(pageLoading(true));
  try {
    const { data } = await API.get(
      `/active?studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}`
    );
    if (payload.studentsCount > 0) {
      dispatch({
        type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_MORE_TUITION_FEE_ALL,
        payload: data,
      });
    } else {
      dispatch({
        type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_MORE_TUITION_FEE_ALL_ADD,
        payload: data,
      });
    }
  } catch (error) {
    const originalRequest = error.config;
    console.log(error);
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token?.data?.accesstoken,
          })
        );
        const { data } = await API.get(
          `/active?studentsCount=${payload.studentsCount}&searchQuery=${payload.searchQuery}`
        );
        if (payload.studentsCount > 0) {
          dispatch({
            type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_MORE_TUITION_FEE_ALL,
            payload: data,
          });
        } else {
          dispatch({
            type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_MORE_TUITION_FEE_ALL_ADD,
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
    dispatch(pageLoading(false));
    dispatch(setLoadingAllTuitionFeeAction(false));
  }
};

export const getTuitionFeePaginationAction =
  (pageNumber, searchQuery, status = "all") =>
  async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/pagination/?page=${pageNumber}&searchQuery=${searchQuery}&status=${status}`
      );
      dispatch({
        type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_TUITION_FEE_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch({
        type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_TUITION_FEE_PAGINATION,
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

          const { data } = await API.get(
            `/pagination/?page=${pageNumber}&searchQuery=${searchQuery}&status=${status}`
          );
          dispatch({
            type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_TUITION_FEE_LAST_PAGE,
            payload: pageNumber,
          });
          dispatch({
            type: TUITION_FEE_ALL_ACTIONS_TYPE.GET_TUITION_FEE_PAGINATION,
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

export const createTuitionFeeAction = (tuitionFeeData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await REGISTERAPI.post("/student/sign", tuitionFeeData);
    dispatch(getTuitionFeePaginationAction(data.lastPage, "", "all"));
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni tələbə yaradıldı");
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

        const { data } = await REGISTERAPI.post("/student/sign", tuitionFeeData);
        dispatch(getTuitionFeePaginationAction(data.lastPage, "", "all"));
        dispatch({
          type: TUITION_FEE_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni tələbə yaradıldı");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    console.log(error);
    if (error?.response?.data?.key === "email-already-exist") {
      dispatch({
        type: TUITION_FEE_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
        payload: true,
      });
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateTuitionFeeAction = (_id, tuitionFeeData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, tuitionFeeData);
    dispatch({
      type: TUITION_FEE_ALL_ACTIONS_TYPE.UPDATE_TUITION_FEE,
      payload: data,
    });
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Tələbə yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, tuitionFeeData);
        dispatch({
          type: TUITION_FEE_ALL_ACTIONS_TYPE.UPDATE_TUITION_FEE,
          payload: data,
        });
        dispatch({
          type: TUITION_FEE_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Tələbə yeniləndi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    console.log(error);
    if (error?.response?.data?.key === "email-already-exist") {
      // dispatch({type:TUITION_FEE_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL,payload:true})
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan tələbə yenilənə bilməz");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteTuitionFeeAction =
  ({ _id, pageNumber, searchQuery, status }) =>
  async (dispatch) => {
    try {
      await API.delete(`/${_id}`);
      dispatch(getTuitionFeePaginationAction(pageNumber, searchQuery, status));
      dispatch({
        type: TUITION_FEE_ALL_ACTIONS_TYPE.DELETE_TUITION_FEE,
        payload: _id,
      });
      toastSuccess("Tələbə silindi");
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
          dispatch(
            getTuitionFeePaginationAction(pageNumber, searchQuery, status)
          );
          dispatch({
            type: TUITION_FEE_ALL_ACTIONS_TYPE.DELETE_TUITION_FEE,
            payload: _id,
          });
          toastSuccess("Tələbə silindi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      if (error?.response?.data?.key === "has-current-week-lessons") {
        toastError("Cari həftədə  dərsi olan tələbə silinə bilməz");
      }
      console.log(error);
      toastError(error?.response?.data.message);
    }
  };
