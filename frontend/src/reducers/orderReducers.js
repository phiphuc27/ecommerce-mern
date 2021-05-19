import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_GET_LIST_REQUEST,
  ORDER_GET_LIST_SUCCESS,
  ORDER_GET_LIST_FAIL,
  ORDER_GET_LIST_RESET,
} from '../constants/orderConstants';

const initialState = {
  orders: [],
  order: {
    orderItems: [],
    shippingAddress: {},
    user: {},
  },
};

export const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { ...initialState, loading: true };

    case ORDER_DETAILS_REQUEST:
    case ORDER_GET_LIST_REQUEST:
      return { ...state, loading: true };

    case ORDER_PAY_REQUEST:
      return { ...state, loadingPay: true, success: false };

    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: payload };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: payload,
      };

    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        loadingPay: false,
        success: true,
      };

    case ORDER_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };

    case ORDER_CREATE_FAIL:
    case ORDER_DETAILS_FAIL:
    case ORDER_GET_LIST_FAIL:
      return { ...state, loading: false, error: payload };

    case ORDER_PAY_FAIL:
      return { ...state, loadingPay: false, error: payload };

    case ORDER_PAY_RESET:
      return { ...state, loadingPay: false, success: false };
    case ORDER_GET_LIST_RESET:
      return { ...state, orders: [] };

    default:
      return state;
  }
};
