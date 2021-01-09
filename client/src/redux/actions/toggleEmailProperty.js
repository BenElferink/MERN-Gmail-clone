import {
  TOGGLE_EMAIL_PROP_REQUEST,
  TOGGLE_EMAIL_PROP_SUCCESS,
  TOGGLE_EMAIL_PROP_ERROR,
} from '../constants';
import { toggleEmailProperty } from '../../api';

export default (id, toggle) => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_EMAIL_PROP_REQUEST });
  try {
    const response = await toggleEmailProperty(id, toggle, getState().userReducer.token);
    dispatch({ type: TOGGLE_EMAIL_PROP_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: TOGGLE_EMAIL_PROP_ERROR, error: error });
  }
};
