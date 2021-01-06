import { TOGGLE_TRASH_REQUEST, TOGGLE_TRASH_SUCCESS, TOGGLE_TRASH_ERROR } from '../constants';
import { toggleTrash } from '../../api';

export default (id) => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_TRASH_REQUEST });
  try {
    const response = await toggleTrash(id, getState().userReducer.token);
    dispatch({ type: TOGGLE_TRASH_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: TOGGLE_TRASH_ERROR, error: error });
  }
};
