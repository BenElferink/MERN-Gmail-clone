import { FETCH_EMAILS_REQUEST, FETCH_EMAILS_SUCCESS, FETCH_EMAILS_ERROR } from '../constants';
import { getEmails } from '../../api';

export default () => async (dispatch, getState) => {
  dispatch({ type: FETCH_EMAILS_REQUEST });
  try {
    const response = await getEmails(getState().userReducer.token);
    dispatch({ type: FETCH_EMAILS_SUCCESS, payload: response.data.mailbox });
  } catch (error) {
    dispatch({ type: FETCH_EMAILS_ERROR, error: error.response.data.message });
  }
};
