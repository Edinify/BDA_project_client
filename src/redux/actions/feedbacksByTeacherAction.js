import axios from "axios";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";
import {
  FEEDBACKS_BY_TEACHER_ACTION_TYPE,
  FEEDBACK_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${apiRoot}/feedback`,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

// const REGISTERAPI = axios.create({
//   // "https://deployement.azurewebsites.net/api/user/auth"
//   baseURL: "https://deployement.azurewebsites.net/user/auth",
// });

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
const feedbackModalOpen = (value) => ({
  type: FEEDBACK_MODAL_ACTION_TYPE.FEEDBACK_OPEN_MODAL,
  payload: value,
});
const modalLoading = (loadingValue) => ({
  type: FEEDBACK_MODAL_ACTION_TYPE.FEEDBACK_MODAL_LOADING,
  payload: loadingValue,
});

export const getFeedbacskByTeacher =
  (startDate, endDate, searchQuery, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `teacher/?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&searchQuery=${searchQuery || ""}&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: FEEDBACKS_BY_TEACHER_ACTION_TYPE.GET_FEEDBACKS_BY_TEACHER,
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
              AccessToken: token?.data?.accesstoken,
            })
          );

          if (token) {
            const { data } = await API.get(
              `teacher/?startDate=${startDate || ""}&endDate=${
                endDate || ""
              }&searchQuery=${searchQuery || ""}&monthCount${monthCount || ""}`
            );
            dispatch({
              type: FEEDBACKS_BY_TEACHER_ACTION_TYPE.GET_FEEDBACKS_BY_TEACHER,
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
    }
  };

export const createFeedbacksByTeacher = (feedbackdata) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", feedbackdata);
    dispatch(getFeedbacskByTeacher("", "", "", 1));
    dispatch({
      type: FEEDBACKS_BY_TEACHER_ACTION_TYPE.CREATE_FEEDBACKS_BY_TEACHER,
      payload: data,
    });
    dispatch(feedbackModalOpen(false));
    toastSuccess("Rəy yaradıldı");
  } catch (error) {
    console.log(error);
    if (
      error.response.data.message.error ===
      "Feedback validation failed: student: Path `student` is required."
    ) {
      toastError("Tələbə daxil edin");
    } else if (
      error.response.data.message.error ===
      'Feedback validation failed: student: Cast to ObjectId failed for value "" (type string) at path "student" because of "BSONError"'
    ) {
      toastError("Tələbə daxil edin");
    } else if (
      error.response.data.message.error ===
      "Feedback validation failed: feedback: Path `feedback` is required."
    ) {
      toastError("Rəy daxil edin");
    }
    const originalRequest = error.config;
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

        if (token) {
          const { data } = await API.post("/", feedbackdata);
          dispatch(getFeedbacskByTeacher("", "", "", 1));
          dispatch({
            type: FEEDBACKS_BY_TEACHER_ACTION_TYPE.CREATE_FEEDBACKS_BY_TEACHER,
            payload: data,
          });
          toast.success("Rəy yaradıldı");
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateFeedbacksByTeacher =
  (_id, feedbackdata) => async (dispatch) => {
    dispatch(modalLoading(true));

    try {
      const { data } = await API.patch(`/${_id}`, feedbackdata);
      dispatch({
        type: FEEDBACKS_BY_TEACHER_ACTION_TYPE.UPDATE_FEEDBACKS_BY_TEACHER,
        payload: data,
      });
      dispatch(feedbackModalOpen(false));
      toastSuccess("Rəy yeniləndi");
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

          const { data } = await API.patch(`/${_id}`, feedbackdata);
          dispatch({
            type: FEEDBACKS_BY_TEACHER_ACTION_TYPE.UPDATE_FEEDBACKS_BY_TEACHER,
            payload: data,
          });
          toastSuccess("Rəy yeniləndi");
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(modalLoading(false));
    }
  };

export const deleteFeedbacksByTeacher = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch(getFeedbacskByTeacher("", "", "", 1));
    dispatch({
      type: FEEDBACKS_BY_TEACHER_ACTION_TYPE.DELETE_FEEDBACKS_BY_TEACHER,
      payload: _id,
    });
    toastSuccess("Rəy silindi");
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
        dispatch(getFeedbacskByTeacher("", "", "", 1));
        dispatch({
          type: FEEDBACKS_BY_TEACHER_ACTION_TYPE.DELETE_FEEDBACKS_BY_TEACHER,
          payload: _id,
        });
        toastSuccess("Rəy silindi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};
