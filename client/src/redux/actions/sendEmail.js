import { SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, SEND_EMAIL_ERROR } from '../constants';
import { sendEmail } from '../../api';

export default (form) => async (dispatch, getState) => {
  dispatch({ type: SEND_EMAIL_REQUEST });
  try {
    const response = await sendEmail(form, getState().userReducer.token);
    dispatch({ type: SEND_EMAIL_SUCCESS, payload: response.data.mailbox });
  } catch (error) {
    dispatch({ type: SEND_EMAIL_ERROR, error: error.response.data.message });
  }
};
