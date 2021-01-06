import { SAVE_DRAFT_REQUEST, SAVE_DRAFT_SUCCESS, SAVE_DRAFT_ERROR } from '../constants';
import { saveDraft } from '../../api';

export default (form) => async (dispatch, getState) => {
  dispatch({ type: SAVE_DRAFT_REQUEST });
  try {
    const response = await saveDraft(form, getState().userReducer.token);
    dispatch({ type: SAVE_DRAFT_SUCCESS, payload: response.data.mailbox });
  } catch (error) {
    dispatch({ type: SAVE_DRAFT_ERROR, error: error.response.data.message });
  }
};
