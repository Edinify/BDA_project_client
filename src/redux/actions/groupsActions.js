import axios from "axios";
import {
  GROUP_ALL_ACTIONS_TYPE,
  GROUP_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/group`,
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

export const setLoadingAllGroupsAction = (loadingValue) => ({
  type: GROUP_ALL_ACTIONS_TYPE.GROUP_LOADING_ALL,
  payload: loadingValue,
});
const pageLoading = (loadingValue) => ({
  type: GROUP_ALL_ACTIONS_TYPE.GROUP_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: GROUP_MODAL_ACTION_TYPE.GROUP_MODAL_LOADING,
  payload: loadingValue,
});

export const getGroupsAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/all");
    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS, payload: data });
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
        dispatch({
          type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS,
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

export const getGroupsWithTeacherAction = (teacherId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/with-teacher?teacherId=${teacherId}`);
    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS, payload: data });
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
        dispatch({
          type: GROUP_ALL_ACTIONS_TYPE.GET_ALL_GROUPS,
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

export const getGroupsByCourseIdAction = (payload) => async (dispatch) => {
  dispatch(pageLoading(true));
  try {
    const { data } = await API.get(
      `/with-course?groupsCount=${payload.groupsCount}&searchQuery=${payload.searchQuery}`,
      { params: { courseIds: payload.courseIds } }
    );
    // console.log(data);
    if (payload.groupsCount > 0) {
      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL,
        payload: data,
      });
    } else {
      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL_ADD,
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
          `/with-course?groupsCount=${payload.groupsCount}&searchQuery=${payload.searchQuery}&courseId=${payload.courseId}`
        );
        if (payload.groupsCount > 0) {
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL,
            payload: data,
          });
        } else {
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL_ADD,
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
    dispatch(setLoadingAllGroupsAction(false));
  }
};

export const getGroupsPaginationAction =
  (pageNumber, searchQuery, completed) => async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/pagination?page=${pageNumber}&searchQuery=${searchQuery}&completed=${completed}`
      );
      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.GET_GROUP_LAST_PAGE,
        payload: pageNumber,
      });

      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.GET_GROUP_PAGINATION,
        payload: data,
      });
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
              AccessToken: token.data.accesstoken,
            })
          );
          const { data } = await API.get(
            `/pagination?page=${pageNumber}&searchQuery=${searchQuery}&completed=${completed}`
          );

          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.GET_GROUP_LAST_PAGE,
            payload: pageNumber,
          });

          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.GET_GROUP_PAGINATION,
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

export const createGroupAction = (groupData) => async (dispatch) => {
  dispatch(modalLoading(true));
  const completed =
    window.location.pathname === "/groups/current" ? true : false;
  try {
    const { data } = await API.post("/", groupData);
    dispatch(getGroupsPaginationAction(data.lastPage, "", completed));
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni əməkdaş yaradıldı");
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
            AccessToken: token.data.accesstoken,
          })
        );
        const { data } = await API.post("/", groupData);
        dispatch(getGroupsPaginationAction(data.lastPage, "", completed));
        dispatch({
          type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
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

export const updateGroupAction = (_id, groupData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, groupData);
    dispatch({ type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP, payload: data });
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Qrup yeniləndi");
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
            AccessToken: token.data.accesstoken,
          })
        );
        const { data } = await API.patch(`/${_id}`, groupData);
        dispatch({
          type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP,
          payload: data,
        });
        dispatch({
          type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Qrup yeniləndi");
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

export const deleteGroupAction =
  ({ _id, pageNumber, searchQuery, completed }) =>
  async (dispatch) => {
    try {
      await API.delete(`/${_id}`);
      dispatch(getGroupsPaginationAction(pageNumber, searchQuery, completed));
      dispatch({ type: GROUP_ALL_ACTIONS_TYPE.DELETE_GROUP, payload: _id });
      toastSuccess("Qrup silindi");
    } catch (error) {
      const originalRequest = error.config;
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log(error);
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
            getGroupsPaginationAction(pageNumber, searchQuery, completed)
          );
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.DELETE_GROUP,
            payload: _id,
          });
          toastSuccess("Qrup silindi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      console.log(error);
      toastError(error?.response?.data.message);
    }
  };

export const confirmGroupChangesAction =
  (_id, groupData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/confirm/${_id}`, groupData);
      dispatch({ type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP, payload: data });
      dispatch({
        type: GROUP_MODAL_ACTION_TYPE.CLOSE_GROUP_CONFIRM_MODAL,
      });
      toastSuccess("Yeniliklər təsdiqləndi!");
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
              AccessToken: token.data.accesstoken,
            })
          );
          const { data } = await API.patch(`/${_id}`, groupData);
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP,
            payload: data,
          });
          dispatch({
            type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Qrup yeniləndi");
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

export const cancelGroupChangesAction =
  (_id, groupData) => async (dispatch) => {
    dispatch(modalLoading(true));
    try {
      const { data } = await API.patch(`/changes/cancel/${_id}`, groupData);
      dispatch({ type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP, payload: data });
      dispatch({
        type: GROUP_MODAL_ACTION_TYPE.CLOSE_GROUP_CONFIRM_MODAL,
        payload: false,
      });
      toastSuccess("Yeniliklər ləğv edildi!");
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
              AccessToken: token.data.accesstoken,
            })
          );
          const { data } = await API.patch(`/${_id}`, groupData);
          dispatch({
            type: GROUP_ALL_ACTIONS_TYPE.UPDATE_GROUP,
            payload: data,
          });
          dispatch({
            type: GROUP_MODAL_ACTION_TYPE.GROUP_OPEN_MODAL,
            payload: false,
          });
          toastSuccess("Qrup yeniləndi");
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
