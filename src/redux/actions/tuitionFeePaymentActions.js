import axios from "axios";
import { apiRoot } from "../../apiRoot";
import { TUITION_FEE_PAYMENT_ACTIONS_TYPE } from "../actions-type";

const API = axios.create({
  baseURL: `${apiRoot}/tution-fee`,
  withCredentials: true,
});

export const getLatedPayment =
  (monthCount, startDate, endDate, allDate) => async (dispatch) => {
    try {
      const { data } = await API.get(
        `late-payment/?monthCount=${monthCount}&startDate=${startDate}&endDate=${endDate}&allDate=${allDate}`
      );

      dispatch({
        type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_LATED_PAYMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getPaidPayment =
  (monthCount, startDate = "", endDate = "", currentDay = true) =>
  async (dispatch) => {
    try {
      const { data } = await API.get(
        `paid-amount/?monthCount=${monthCount}&startDate=${startDate}&endDate=${endDate}&currentDay=${currentDay}`
      );
      dispatch({
        type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_PAID_PAYMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getWillPayPayment = (monthCount,startDate,endDate,allDate) => async (dispatch) => {
  try {
    const { data } = await API.get(`/pay-amount/?monthCount=${monthCount}&startDate=${startDate}&endDate=${endDate}&allDate=${allDate}`);
    dispatch({
      type: TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_WILL_PAY_PAYMENT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
