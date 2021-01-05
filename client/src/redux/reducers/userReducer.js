import {
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from './../constants';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: window.localStorage.getItem('token'),
  user: {},
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: '',
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { email: action.payload },
        error: '',
      };

    case REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        user: {},
        error: action.error,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      window.localStorage.setItem('token', action.payload);
      console.log('🌐 Token saved to Local Storage', action.payload);
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: action.payload,
        error: '',
      };

    case LOGIN_ERROR:
      window.localStorage.setItem('token', '');
      console.log('🌐 Token removed from Local Storage');
      return {
        ...state,
        isLoading: false,
        token: '',
        error: action.error,
      };

    case LOGOUT:
      window.localStorage.setItem('token', '');
      console.log('🌐 Token removed from Local Storage');
      return {
        ...state,
        isLoggedIn: false,
        token: '',
        user: {},
      };

    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: '',
      };

    case FETCH_USER_ERROR:
      window.localStorage.setItem('token', '');
      console.log('🌐 Token removed from Local Storage');
      return {
        ...state,
        isLoading: false,
        token: '',
        user: {},
        error: action.error,
      };

    default:
      return state;
  }
};
