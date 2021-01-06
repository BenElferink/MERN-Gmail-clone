import { TOGGLE_STAR_REQUEST, TOGGLE_STAR_SUCCESS, TOGGLE_STAR_ERROR } from '../constants';
import { toggleStarred } from '../../api';

export default (id) => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_STAR_REQUEST });
  try {
    const response = await toggleStarred(id, getState().userReducer.token);
    dispatch({ type: TOGGLE_STAR_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: TOGGLE_STAR_ERROR, error: error });
  }
};
