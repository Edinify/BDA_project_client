import axios from "axios";
import {
  CAREER_ALL_ACTIONS_TYPE,
  CAREER_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/user/worker`,
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
  type: CAREER_ALL_ACTIONS_TYPE.CAREER_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: CAREER_MODAL_ACTION_TYPE.CAREER_MODAL_LOADING,
  payload: loadingValue,
});


export const getCareerAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/all");
    dispatch({ type: CAREER_ALL_ACTIONS_TYPE.GET_ALL_CAREERS, payload: data });
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
        const { data } = await API.get("/all");
        dispatch({ type: CAREER_ALL_ACTIONS_TYPE.GET_ALL_CAREERS, payload: data });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }
  }
};

export const getCareerActiveAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/active");
    dispatch({
      type: CAREER_ALL_ACTIONS_TYPE.GET_ACTIVE_CAREER,
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
        const { data } = await API.get("/active");
        dispatch({
          type: CAREER_ALL_ACTIONS_TYPE.GET_ACTIVE_CAREER,
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

export const getCareerPaginationAction =
  (pageNumber, searchQuery) =>
  async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/?page=${pageNumber}&searchQuery=${searchQuery}`
      );
      dispatch({
        type: CAREER_ALL_ACTIONS_TYPE.GET_CAREER_LAST_PAGE,
        payload: pageNumber,
      });

      dispatch({
        type: CAREER_ALL_ACTIONS_TYPE.GET_CAREER_PAGINATION,
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
            `/?page=${pageNumber}&searchQuery=${searchQuery}`
          );

          dispatch({
            type: CAREER_ALL_ACTIONS_TYPE.GET_CAREER_LAST_PAGE,
            payload: pageNumber,
          });

          dispatch({
            type: CAREER_ALL_ACTIONS_TYPE.GET_CAREER_PAGINATION,
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

export const createCareerAction = (careerData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await REGISTERAPI.post("/worker/sign", careerData);
    dispatch(getCareerPaginationAction(data.lastPage, ""));
    dispatch({
      type: CAREER_MODAL_ACTION_TYPE.CAREER_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni əməkdaş yaradıldı");
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
        const { data } = await REGISTERAPI.post("/worker/sign", careerData);
        dispatch(getCareerPaginationAction(data.lastPage, ""));
        dispatch({
          type: CAREER_MODAL_ACTION_TYPE.CAREER_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni əməkdaş yaradıldı");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }

    if (error?.response?.data?.key === "email-already-exist") {
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
    console.log(error);
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateCareerAction = (_id, careerData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, careerData);
    dispatch({ type: CAREER_ALL_ACTIONS_TYPE.UPDATE_CAREER, payload: data });
    dispatch({
      type: CAREER_MODAL_ACTION_TYPE.CAREER_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("İşçi yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, careerData);
        dispatch({
          type: CAREER_ALL_ACTIONS_TYPE.UPDATE_CAREER,
          payload: data,
        });
        dispatch({
          type: CAREER_MODAL_ACTION_TYPE.CAREER_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("İşçi yeniləndi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "email-already-exist") {
      toastError("Bu email ilə istifadəçi mövcuddur");
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan əməkdaş yenilənə bilməz");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteCareerAction = ({_id, pageNumber, searchQuery}) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch(getCareerPaginationAction(pageNumber, searchQuery));
    dispatch({ type: CAREER_ALL_ACTIONS_TYPE.DELETE_CAREER, payload: _id });
    toastSuccess("İşçi silindi");
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
        dispatch(getCareerPaginationAction(pageNumber, searchQuery));
        dispatch({
          type: CAREER_ALL_ACTIONS_TYPE.DELETE_CAREER,
          payload: _id,
        });
        toastSuccess("İşçi silindi");
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    if (error?.response?.data?.key === "has-current-week-lessons") {
      toastError("Cari həftədə  dərsi olan əməkdaş silinə bilməz");
    }
    console.log(error);
    toastError(error?.response?.data.message);
  }
};


