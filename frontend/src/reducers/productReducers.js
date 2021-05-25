import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
} from '../constants/productConstants';

const initialState = {
  products: [],
  product: { reviews: [] },
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAILS_REQUEST:
      return { ...initialState, loading: true };

    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_CREATE_REQUEST:
      return { ...state, createLoading: true };

    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: payload };

    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: payload };

    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        product: payload,
      };

    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, deleteSuccess: true };

    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAILS_FAIL:
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: payload };

    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        createLoading: false,
        error: payload,
      };

    case PRODUCT_CREATE_RESET:
      return { ...state, product: { reviews: [] } };

    default:
      return state;
  }
};
