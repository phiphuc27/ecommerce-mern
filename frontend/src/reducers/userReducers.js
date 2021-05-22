import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DELETE_RESET,
} from '../constants/userConstants';

const initialState = {
  userInfo: null,
  users: [],
  user: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...initialState, loading: true };

    case USER_DETAILS_REQUEST:
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, updatedSuccess: false };
    case USER_UPDATE_REQUEST:
      return { ...state, updatedLoading: true, updatedSuccess: false };

    case USER_LIST_REQUEST:
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: payload };

    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: payload };

    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedSuccess: true,
        userInfo: payload,
      };

    case USER_UPDATE_SUCCESS:
      return { ...state, updatedLoading: false, updatedSuccess: true };

    case USER_LIST_SUCCESS:
      return { ...state, loading: false, users: payload };
    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, deletedSuccess: true };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_DETAILS_FAIL:
    case USER_UPDATE_PROFILE_FAIL:
    case USER_LIST_FAIL:
    case USER_DELETE_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_UPDATE_FAIL:
      return { ...state, updatedLoading: false, error: payload };

    case USER_UPDATE_PROFILE_RESET:
      return state;

    case USER_UPDATE_RESET:
      return { ...state, users: [], user: null, updatedSuccess: false };

    case USER_DELETE_RESET:
      return { ...state, deletedSuccess: false };

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
