import axios from "axios";
import { DIPLOMA_ALL_ACTIONS_TYPE } from "../actions-type";
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

const toastSuccess = (message) => {
  toast .success(message, {
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
        `/?length=${length}&searchQuery=${searchQuery}&groupId=${groupId}`
      );

      console.log(data,"dataa")
      dispatch({
        type: DIPLOMA_ALL_ACTIONS_TYPE.GET_DIPLOMA_PAGINATION,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };


  export const updateDiplomaAction=(id,newData)=>async(dispatch)=>{
    try {
        const {data} = await API.patch(`/${id}`,newData);
        dispatch({type:DIPLOMA_ALL_ACTIONS_TYPE.UPDATE_DIPLOMA,payload:data}) 
    } catch (error) {
        console.log(error)
    }
  }


