import { FEEDBACK_PAGINATION_ACTION_TYPE } from "../actions-type";
import axios from "axios";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${apiRoot}/feedback`,
  withCredentials:true
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
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


export const getFeedbackPaginationAction =
  (
    page = 1,
    startDate = "",
    endDate = "",
    searchQuery = "",
    from = "teacher"
  ) =>
  async (dispatch) => {
    dispatch(setLoadingFeedbackAction(true));
    try {
      const { data } = await API.get(
        `/?page=${page}&startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&&searchQuery=${searchQuery || ""}&from=${from || "teacher"}`
      );
      dispatch({
        type: FEEDBACK_PAGINATION_ACTION_TYPE.GET_FEEDBACK_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: FEEDBACK_PAGINATION_ACTION_TYPE.GET_FEEDBACK,
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
            `/?page=${page}&startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&&searchQuery=${searchQuery || ""}&from=${from || "teacher"}}`
          );
          dispatch({
            type: FEEDBACK_PAGINATION_ACTION_TYPE.GET_FEEDBACK_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: FEEDBACK_PAGINATION_ACTION_TYPE.GET_FEEDBACK,
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
      dispatch(setLoadingFeedbackAction(false));
    }
  };

export const deleteFeedbackAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({
      type: FEEDBACK_PAGINATION_ACTION_TYPE.DELETE_FEEDBACK,
      payload: _id,
    });
    if(window.location.pathname==="/feedback/student"){
      dispatch(getFeedbackPaginationAction(1, "", "", "", "student"));
    }
    else if (window.location.pathname==="/feedback/teacher" ){
      dispatch(getFeedbackPaginationAction(1, "", "", "", "teacher"));
    }
   
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
        dispatch({
          type: FEEDBACK_PAGINATION_ACTION_TYPE.DELETE_FEEDBACK,
          payload: _id,
        });
        dispatch(getFeedbackPaginationAction(1, "", "", "", ""));
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

export const setLoadingFeedbackAction = (loadingValue) => ({
  type: FEEDBACK_PAGINATION_ACTION_TYPE.FEEDBACK_LOADING,
  payload: loadingValue,
});
