import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './../constants';
import { login } from './../../api';

export default (form) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await login(form);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, error: error.response.data.message });
  }
};
