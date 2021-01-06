import { DELETE_EMAIL_REQUEST, DELETE_EMAIL_SUCCESS, DELETE_EMAIL_ERROR } from '../constants';
import { deleteEmail } from '../../api';

export default (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_EMAIL_REQUEST });
  try {
    const response = await deleteEmail(id, getState().userReducer.token);
    dispatch({ type: DELETE_EMAIL_SUCCESS, payload: response.data.id });
  } catch (error) {
    dispatch({ type: DELETE_EMAIL_ERROR, error: error.response.data.message });
  }
};
