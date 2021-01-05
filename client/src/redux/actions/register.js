import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from './../constants';
import { register } from './../../api';

export default (form) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await register(form);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, error: error.response.data.message });
  }
};
