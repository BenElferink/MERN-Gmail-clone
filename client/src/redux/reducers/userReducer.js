import {
  CLEAR_ERRORS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
} from './../constants';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: window.localStorage.getItem('token'),
  user: {},
  error: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: '',
      };

    case LOGOUT:
      window.localStorage.setItem('token', '');
      console.log('🌐 Token removed from Local Storage');
      return initialState;

    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case FETCH_USER_REQUEST:
    case UPLOAD_IMAGE_REQUEST:
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

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: '',
      };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          profilePicture: action.payload,
        },
        error: '',
      };

    case REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        user: {},
        error: action.error,
      };

    case LOGIN_ERROR:
    case FETCH_USER_ERROR:
      window.localStorage.setItem('token', '');
      console.log('🌐 Token removed from Local Storage');
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        token: '',
        user: {},
        error: action.error,
      };

    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
