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
} from '../constants/userConstants';

const initialState = {
  user: {},
  userInfo: null,
  loading: false,
  error: '',
  updatedSuccess: false,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...initialState, loading: true };

    case USER_DETAILS_REQUEST:
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, updatedSuccess: false, user: {} };

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

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_DETAILS_FAIL:
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_UPDATE_PROFILE_RESET:
      return state;

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
