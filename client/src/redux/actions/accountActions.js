import {
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
import { register, login, getUser, uploadImage } from './../../api';

export const logoutAction = () => {
  return { type: LOGOUT };
};

export const registerAction = (form) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await register(form);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, error: error.response.data.message });
  }
};

export const loginAction = (form) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await login(form);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, error: error.response.data.message });
  }
};

export const getUserAction = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const response = await getUser(getState().userReducer.token);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, error: error.response.data.message });
  }
};

export const uploadImageAction = (image) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_IMAGE_REQUEST });
  try {
    const response = await uploadImage(getState().userReducer.token, image);
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: response.data.profilePicture });
  } catch (error) {
    dispatch({ type: UPLOAD_IMAGE_ERROR, error });
  }
};
