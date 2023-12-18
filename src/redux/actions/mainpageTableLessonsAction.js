import axios from "axios";
import { MAINPAGE_LESSONS_ACTION_TYPE } from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/lesson`,
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
const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials:true
});


const toastError=(message)=>{
  toast.error(message,{
    position: "top-right",
    toastClassName: "custom-toast",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",

  })
}

export const getMainpageTableLessonsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await API.get(
      `/main/panel?teacherId=${payload.teacherId || ""}&studentId=${
        payload.studentId || ""
      }&startDate=${payload.startDate || ""}&endDate=${
        payload.endDate || ""
      }&status=${payload.status}&attendance=${payload.attendance}`
    );

    dispatch({
      type: MAINPAGE_LESSONS_ACTION_TYPE.GET_MAINPAGE_LESSONS,
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
          `/main/panel?teacherId=${payload.teacherId || ""}&studentId=${
            payload.studentId || ""
          }&startDate=${payload.startDate}&endDate=${payload.endDate}&status=${
            payload.status
          }&attendance=${payload.attendance}`
        );
        dispatch({
          type: MAINPAGE_LESSONS_ACTION_TYPE.GET_MAINPAGE_LESSONS,
          payload: data,
        });
      } catch (error) {
        toastError(error?.response?.data?.message);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }
  }
};
