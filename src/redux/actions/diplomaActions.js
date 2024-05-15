import axios from "axios";
import {
  DIPLOMA_ALL_ACTIONS_TYPE,
  DIPLOMA_MODAL_ACTION_TYPE,
} from "../actions-type";
import { apiRoot } from "../../apiRoot";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${apiRoot}/diploma`,
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

const diplomaModalLoading = (loadingValue) => ({
  type: DIPLOMA_MODAL_ACTION_TYPE.DIPLOMA_MODAL_LOADING,
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

export const getDiplomaPaginationAction =
  (length, searchQuery, groupId) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `/?length=${length || 0}&searchQuery=${searchQuery || ""}&groupId=${
          groupId || ""
        }`
      );

      console.log(data, "dataa diplomasss");
      dispatch({
        type: DIPLOMA_ALL_ACTIONS_TYPE.GET_DIPLOMA_PAGINATION,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateDiplomaAction = (newData) => async (dispatch) => {
  dispatch(diplomaModalLoading(true));
  try {
    const { data } = await API.patch(`/`, newData);
    dispatch({ type: DIPLOMA_ALL_ACTIONS_TYPE.UPDATE_DIPLOMA, payload: data });
    dispatch({
      type: DIPLOMA_MODAL_ACTION_TYPE.DIPLOMA_OPEN_MODAL,
      payload: false,
    });
  } catch (error) {
    console.log(error);
  }
};
