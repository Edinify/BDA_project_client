import axios from "axios";
import {
  SYLLABUS_ALL_ACTIONS_TYPE,
  SYLLABUS_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/syllabus`,
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
const setLoadingSyllabusAction = (loadingValue) => ({
  type: SYLLABUS_ALL_ACTIONS_TYPE.SYLLABUS_LOADING,
  payload: loadingValue,
});
const pageLoading = (loadingValue) => ({
  type: SYLLABUS_ALL_ACTIONS_TYPE.SYLLABUS_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_MODAL_LOADING,
  payload: loadingValue,
});

export const getAllSyllabusAction = (courseId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/all?courseId=${courseId}`);
    // console.log(data);
    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.GET_ACTIVE_SYLLABUS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
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
        const { data } = await API.get(`/all?courseId=${courseId}`);
        dispatch({
          type: SYLLABUS_ALL_ACTIONS_TYPE.GET_ACTIVE_SYLLABUS,
          payload: data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        // console.log(error);
      }
    }
  }
};

export const getSyllabusActiveAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/active");
    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.GET_ACTIVE_SYLLABUS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
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
          type: SYLLABUS_ALL_ACTIONS_TYPE.GET_ACTIVE_SYLLABUS,
          payload: data,
        });
      } catch (error) {
        // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};

export const getSyllabusPaginationAction =
  (length, searchQuery, courseId) => async (dispatch) => {
    dispatch(setLoadingSyllabusAction(true));
    try {
      const { data } = await API.get(
        `/pagination?length=${length}&searchQuery=${searchQuery}&courseId=${courseId}`
      );
      dispatch({
        type: SYLLABUS_ALL_ACTIONS_TYPE.GET_SYLLABUS_PAGINATION,
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
            `/pagination?length=${length}&searchQuery=${searchQuery}&courseId=${courseId}`
          );

          dispatch({
            type: SYLLABUS_ALL_ACTIONS_TYPE.GET_SYLLABUS_PAGINATION,
            payload: data,
          });
        } catch (error) {
          // console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(pageLoading(false));
    }
  };

export const createSyllabusAction = (syllabusData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", syllabusData);
    dispatch(
      getSyllabusPaginationAction(data.lastPage, "", syllabusData.courseId)
    );
    dispatch({
      type: SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni sillabus yaradıldı");
  } catch (error) {
    const originalRequest = error.config;

    if (error?.response?.data?.key === "syllabus-already-exists") {
      toastError("Bu nömrəli mövzu artıq mövcuddur");
    }

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
        const { data } = await API.post("/", syllabusData);
        dispatch(
          getSyllabusPaginationAction(data.lastPage, "", syllabusData.courseId)
        );
        dispatch({
          type: SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni sillabus yaradıldı");
      } catch (error) {
        // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
    // console.log(error);
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateSyllabusAction = (_id, syllabusData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, syllabusData);
    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.UPDATE_SYLLABUS,
      payload: data,
    });
    dispatch({
      type: SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("İşçi yeniləndi");
  } catch (error) {
    const originalRequest = error.config;

    if (error?.response?.data?.key === "syllabus-already-exists") {
      toastError("Bu nömrəli mövzu artıq mövcuddur");
    }

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
        const { data } = await API.patch(`/${_id}`, syllabusData);
        dispatch({
          type: SYLLABUS_ALL_ACTIONS_TYPE.UPDATE_SYLLABUS,
          payload: data,
        });
        dispatch({
          type: SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_OPEN_MODAL,
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
      toastError("Cari həftədə  dərsi olan sillabus yenilənə bilməz");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteSyllabusAction =
  ({ _id, pageNumber, searchQuery, courseId }) =>
  async (dispatch) => {
    try {
      await API.delete(`/${_id}`);
      dispatch(getSyllabusPaginationAction(pageNumber, searchQuery, courseId));
      dispatch({
        type: SYLLABUS_ALL_ACTIONS_TYPE.DELETE_SYLLABUS,
        payload: _id,
      });
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
          dispatch(
            getSyllabusPaginationAction(pageNumber, searchQuery, courseId)
          );
          dispatch({
            type: SYLLABUS_ALL_ACTIONS_TYPE.DELETE_SYLLABUS,
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
        toastError("Cari həftədə  dərsi olan sillabus silinə bilməz");
      }
      // console.log(error);
      toastError(error?.response?.data.message);
    }
  };

export const confirmSyllabusChangesAction =
  (_id, syllabusData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/confirm/${_id}`, syllabusData);
      dispatch({
        type: SYLLABUS_ALL_ACTIONS_TYPE.UPDATE_SYLLABUS,
        payload: data,
      });
      dispatch({
        type: SYLLABUS_MODAL_ACTION_TYPE.CLOSE_SYLLABUS_CONFIRM_MODAL,
      });
      toastSuccess("Yeniləmələr təsdiqləndi!");
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
          const { data } = await API.patch(`/${_id}`, syllabusData);
          dispatch({
            type: SYLLABUS_ALL_ACTIONS_TYPE.UPDATE_SYLLABUS,
            payload: data,
          });
          dispatch({
            type: SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_OPEN_MODAL,
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
        toastError("Cari həftədə  dərsi olan sillabus yenilənə bilməz");
      }
    } finally {
      dispatch(modalLoading(false));
    }
  };

export const cancelSyllabusChangesAction =
  (_id, syllabusData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/cancel/${_id}`, syllabusData);
      dispatch({
        type: SYLLABUS_ALL_ACTIONS_TYPE.UPDATE_SYLLABUS,
        payload: data,
      });
      dispatch({
        type: SYLLABUS_MODAL_ACTION_TYPE.CLOSE_SYLLABUS_CONFIRM_MODAL,
      });
      toastSuccess("Yeniləmələr ləğv edildi!");
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
          const { data } = await API.patch(`/${_id}`, syllabusData);
          dispatch({
            type: SYLLABUS_ALL_ACTIONS_TYPE.UPDATE_SYLLABUS,
            payload: data,
          });
          dispatch({
            type: SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_OPEN_MODAL,
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
        toastError("Cari həftədə  dərsi olan sillabus yenilənə bilməz");
      }
    } finally {
      dispatch(modalLoading(false));
    }
  };
