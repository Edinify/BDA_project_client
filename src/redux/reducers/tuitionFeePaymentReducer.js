import { TUITION_FEE_PAYMENT_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  latedPayment: 0,
  paidPayment: 0,
  willPayPayment: 0,
};

export const tuitionFeePaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_LATED_PAYMENT:
      return {
        ...state,
        latedPayment: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_PAID_PAYMENT:
      return {
        ...state,
        paidPayment: action.payload,
      };
    case TUITION_FEE_PAYMENT_ACTIONS_TYPE.GET_WILL_PAY_PAYMENT:
      return {
        ...state,
        willPayPayment: action.payload,
      };

    default:
      return state;
  }
};
