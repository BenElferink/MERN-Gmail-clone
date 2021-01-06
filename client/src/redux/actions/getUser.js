import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from '../constants';
import { getUser } from '../../api';

export default () => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const response = await getUser(getState().userReducer.token);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, error: error.response.data.message });
  }
};
