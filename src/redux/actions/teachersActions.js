import axios from "axios";
import {
  MENTOR_TYPES,
  TEACHER_ALL_ACTIONS_TYPE,
  TEACHERS_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/user/teacher`,
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
  type: TEACHER_ALL_ACTIONS_TYPE.TEACHER_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_MODAL_LOADING,
  payload: loadingValue,
});

export const getAllTeachersAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/all");
    dispatch({ type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER, payload: data });
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
        dispatch({ type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER, payload: data });
      } catch (error) {
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
        console.log(error);
      }
    }
  }
};

export const getActiveTeachersAction = () => async (dispatch) => {
  try {
    const { data } = await API.get("/active");
    dispatch({
      type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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
          type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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

export const getTeachersByCourseId = (courseId) => async (dispatch) => {
  try {
    const { data } = await API.get("/by-course", {
      params: { courseId: courseId, role: "teacher" },
    });
    dispatch({
      type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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
          type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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

export const getTeachersPaginationAction =
  (pageNumber, searchQuery, status = "all", role) =>
  async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      console.log(role, "teacher role");
      const { data } = await API.get(
        `/pagination/?page=${pageNumber}&searchQuery=${searchQuery}&status=${status}&role=${role}`
      );

      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER_LAST_PAGE,
        payload: pageNumber,
      });

      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER_PAGINATION,
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
            `/pagination/?page=${pageNumber}&searchQuery=${searchQuery}&status=${status}`
          );

          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER_LAST_PAGE,
            payload: pageNumber,
          });

          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_TEACHER_PAGINATION,
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

export const createTeacherAction = (teacherData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", teacherData);
    dispatch(getTeachersPaginationAction(data.lastPage, "", "all"));
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
      payload: false,
    });
    // dispatch({ type: TEACHER_ALL_ACTIONS_TYPE.CREATE_TEACHER, payload: data });
    toastSuccess("Yeni təlimçi yaradıldı");
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
        const { data } = await REGISTERAPI.post("/teacher/sign", teacherData);
        dispatch(getTeachersPaginationAction(data.lastPage, "", "all"));
        dispatch({
          type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni təlimçi yaradıldı");
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

export const updateTeacherAction = (_id, teacherData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, teacherData);
    dispatch({ type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER, payload: data });
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Təlimçi yeniləndi");
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
        const { data } = await API.patch(`/${_id}`, teacherData);
        dispatch({
          type: TEACHER_ALL_ACTIONS_TYPE.UPDATE_TEACHER,
          payload: data,
        });
        dispatch({
          type: TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Təlimçi yeniləndi");
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
      toastError("Cari həftədə  dərsi olan təlimçi yenilənə bilməz");
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteTeacherAction =
  ({ _id, pageNumber, searchQuery, status }) =>
  async (dispatch) => {
    try {
      await API.delete(`/${_id}`);
      dispatch(getTeachersPaginationAction(pageNumber, searchQuery, status));
      dispatch({ type: TEACHER_ALL_ACTIONS_TYPE.DELETE_TEACHER, payload: _id });
      toastSuccess("Təlimçi silindi");
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
            getTeachersPaginationAction(pageNumber, searchQuery, status)
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.DELETE_TEACHER,
            payload: _id,
          });
          toastSuccess("Təlimçi silindi");
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      if (error?.response?.data?.key === "has-current-week-lessons") {
        toastError("Cari həftədə  dərsi olan təlimçi silinə bilməz");
      }
      console.log(error);
      toastError(error?.response?.data.message);
    }
  };

export const getTeacherLessonStatisticsAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/chart?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_LESSON_STATISTICS,
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
            `/me/chart?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_LESSON_STATISTICS,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      console.log(error);
    }
  };

export const getTeacherConfirmedLessonsAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/confirmed-lessons?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_CONFIRMED_LESSONS,
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
            `/me/confirmed-lessons?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_CONFIRMED_LESSONS,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      console.log(error);
    }
  };

export const getTeacherCancelledLessonsAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/cancelled-lessons?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_CANCELLED_LESSONS,
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
            `/me/cancelled-lessons?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_CANCELLED_LESSONS,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      console.log(error);
    }
  };

export const getTeacherUnviewedLessonsAction =
  (startDate, endDate, monthCount) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/unviewed-lessons?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_UNVIEWED_LESSONS,
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
            `/me/unviewed-lessons?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_UNVIEWED_LESSONS,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      console.log(error);
    }
  };

export const getTeacherLeaderboradOrderAction =
  (startDate, endDate, monthCount, byFilter) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/me/leaderboard-order?startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}&byFilter=${byFilter}`
      );
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.GET_LEADERBOARD_ORDER,
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
            `/me/leaderboard-order?startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}&byFilter=${byFilter}`
          );
          dispatch({
            type: TEACHER_ALL_ACTIONS_TYPE.GET_LEADERBOARD_ORDER,
            payload: data,
          });
        } catch (error) {
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
      console.log(error);
    }
  };

// Mentors Actions

export const getMentorsByCourseId = (courseId) => async (dispatch) => {
  try {
    const { data } = await API.get("/by-course", {
      params: { courseId: courseId, role: "mentor" },
    });
    console.log(data, "mentors in action");
    dispatch({
      type: MENTOR_TYPES.GET_MENTORS,
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
          type: TEACHER_ALL_ACTIONS_TYPE.GET_ACTIVE_TEACHERS,
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
