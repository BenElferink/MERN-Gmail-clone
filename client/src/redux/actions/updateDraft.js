import { UPDATE_DRAFT_REQUEST, UPDATE_DRAFT_SUCCESS, UPDATE_DRAFT_ERROR } from '../constants';
import { updateDraft } from '../../api';

export default (id, form) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_DRAFT_REQUEST });
  try {
    const response = await updateDraft(id, form, getState().userReducer.token);
    dispatch({ type: UPDATE_DRAFT_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: UPDATE_DRAFT_ERROR, error: error });
  }
};
