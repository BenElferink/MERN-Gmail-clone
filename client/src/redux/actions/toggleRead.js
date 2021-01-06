import { TOGGLE_READ_REQUEST, TOGGLE_READ_SUCCESS, TOGGLE_READ_ERROR } from '../constants';
import { toggleRead } from '../../api';

export default (id) => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_READ_REQUEST });
  try {
    const response = await toggleRead(id, getState().userReducer.token);
    dispatch({ type: TOGGLE_READ_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: TOGGLE_READ_ERROR, error: error });
  }
};
