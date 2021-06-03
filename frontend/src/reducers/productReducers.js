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
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productConstants';

const initialState = {
  products: [],
  productsTop: [],
  product: { reviews: [] },
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAILS_REQUEST:
      return { ...initialState, loading: true };

    case PRODUCT_DELETE_REQUEST:
    case PRODUCT_TOP_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_CREATE_REQUEST:
      return { ...state, createLoading: true };

    case PRODUCT_UPDATE_REQUEST:
      return { ...state, updateLoading: true };

    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, createReviewLoading: true };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
      };

    case PRODUCT_TOP_SUCCESS:
      return { ...state, loading: false, productsTop: payload };

    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: payload };

    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        product: payload,
      };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        product: payload,
      };

    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, deleteSuccess: true };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        createReviewLoading: false,
        createReviewSuccess: true,
      };

    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAILS_FAIL:
    case PRODUCT_DELETE_FAIL:
    case PRODUCT_TOP_FAIL:
      return { ...state, loading: false, error: payload };

    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        createLoading: false,
        error: payload,
      };

    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        updateLoading: false,
        error: payload,
      };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        createReviewLoading: false,
        createReviewError: payload,
      };

    case PRODUCT_CREATE_RESET:
    case PRODUCT_UPDATE_RESET:
      return { ...initialState, products: state.products };

    default:
      return state;
  }
};
