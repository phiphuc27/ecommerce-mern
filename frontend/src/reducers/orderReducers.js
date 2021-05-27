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
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_FAIL,
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
    case ORDER_MY_LIST_REQUEST:
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true };

    case ORDER_PAY_REQUEST:
      return { ...state, payLoading: true };

    case ORDER_DELIVER_REQUEST:
      return { ...state, deliverLoading: true };

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
        payLoading: false,
        paySuccess: true,
      };

    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        deliverLoading: false,
        deliverSuccess: true,
      };

    case ORDER_MY_LIST_SUCCESS:
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };

    case ORDER_CREATE_FAIL:
    case ORDER_DETAILS_FAIL:
    case ORDER_MY_LIST_FAIL:
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, error: payload };

    case ORDER_PAY_FAIL:
      return { ...state, payLoading: false, error: payload };

    case ORDER_DELIVER_FAIL:
      return { ...state, deliverLoading: false, error: payload };

    case ORDER_PAY_RESET:
    case ORDER_DELIVER_RESET:
      return { ...initialState, orders: state.orders, order: state.order };

    case ORDER_MY_LIST_RESET:
      return { ...state, orders: [] };

    default:
      return state;
  }
};
