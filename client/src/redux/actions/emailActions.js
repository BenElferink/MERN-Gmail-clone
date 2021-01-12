import {
  FETCH_EMAILS_REQUEST,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_ERROR,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SAVE_DRAFT_REQUEST,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_ERROR,
  UPDATE_DRAFT_REQUEST,
  UPDATE_DRAFT_SUCCESS,
  UPDATE_DRAFT_ERROR,
  EMAIL_TRASH_REQUEST,
  EMAIL_TRASH_SUCCESS,
  EMAIL_TRASH_ERROR,
  EMAIL_UNTRASH_REQUEST,
  EMAIL_UNTRASH_SUCCESS,
  EMAIL_UNTRASH_ERROR,
  TOGGLE_EMAIL_PROP_REQUEST,
  TOGGLE_EMAIL_PROP_SUCCESS,
  TOGGLE_EMAIL_PROP_ERROR,
  DELETE_EMAIL_REQUEST,
  DELETE_EMAIL_SUCCESS,
  DELETE_EMAIL_ERROR,
} from './../constants';
import {
  getAllEmails,
  sendEmail,
  saveDraft,
  updateDraft,
  moveToTrash,
  removeFromTrash,
  markAsRead,
  markAsUnread,
  setFavorite,
  unsetFavorite,
  deleteEmail,
} from '../../api';

export const getEmailsAction = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_EMAILS_REQUEST });
  try {
    const response = await getAllEmails(getState().userReducer.token);
    dispatch({ type: FETCH_EMAILS_SUCCESS, payload: response.data.mailbox });
  } catch (error) {
    dispatch({ type: FETCH_EMAILS_ERROR, error });
  }
};

export const sendEmailAction = (form) => async (dispatch, getState) => {
  dispatch({ type: SEND_EMAIL_REQUEST });
  try {
    const response = await sendEmail(getState().userReducer.token, form);
    dispatch({
      type: SEND_EMAIL_SUCCESS,
      payload: { outbox: response.data.sent, inbox: response.data.received },
    });
  } catch (error) {
    dispatch({ type: SEND_EMAIL_ERROR, error });
  }
};

export const saveDraftAction = (form) => async (dispatch, getState) => {
  dispatch({ type: SAVE_DRAFT_REQUEST });
  try {
    const response = await saveDraft(getState().userReducer.token, form);
    dispatch({ type: SAVE_DRAFT_SUCCESS, payload: response.data.draft });
  } catch (error) {
    dispatch({ type: SAVE_DRAFT_ERROR, error });
  }
};

export const updateDraftAction = (id, form) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_DRAFT_REQUEST });
  try {
    const response = await updateDraft(getState().userReducer.token, id, form);
    dispatch({ type: UPDATE_DRAFT_SUCCESS, payload: response.data.draft });
  } catch (error) {
    dispatch({ type: UPDATE_DRAFT_ERROR, error });
  }
};

export const moveToTrashAction = (id) => async (dispatch, getState) => {
  dispatch({ type: EMAIL_TRASH_REQUEST });
  try {
    const response = await moveToTrash(getState().userReducer.token, id);
    dispatch({ type: EMAIL_TRASH_SUCCESS, payload: response.data.mailbox });
  } catch (error) {
    dispatch({ type: EMAIL_TRASH_ERROR, error });
  }
};

export const removeFromTrashAction = (id) => async (dispatch, getState) => {
  dispatch({ type: EMAIL_UNTRASH_REQUEST });
  try {
    const response = await removeFromTrash(getState().userReducer.token, id);
    dispatch({ type: EMAIL_UNTRASH_SUCCESS, payload: response.data.mailbox });
  } catch (error) {
    dispatch({ type: EMAIL_UNTRASH_ERROR, error });
  }
};

export const markAsReadAction = (id) => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_EMAIL_PROP_REQUEST });
  try {
    const response = await markAsRead(getState().userReducer.token, id);
    dispatch({ type: TOGGLE_EMAIL_PROP_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: TOGGLE_EMAIL_PROP_ERROR, error });
  }
};

export const markAsUnreadAction = (id) => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_EMAIL_PROP_REQUEST });
  try {
    const response = await markAsUnread(getState().userReducer.token, id);
    dispatch({ type: TOGGLE_EMAIL_PROP_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: TOGGLE_EMAIL_PROP_ERROR, error });
  }
};

export const setFavoriteAction = (id) => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_EMAIL_PROP_REQUEST });
  try {
    const response = await setFavorite(getState().userReducer.token, id);
    dispatch({ type: TOGGLE_EMAIL_PROP_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: TOGGLE_EMAIL_PROP_ERROR, error });
  }
};

export const unsetFavoriteAction = (id) => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_EMAIL_PROP_REQUEST });
  try {
    const response = await unsetFavorite(getState().userReducer.token, id);
    dispatch({ type: TOGGLE_EMAIL_PROP_SUCCESS, payload: response.data.email });
  } catch (error) {
    dispatch({ type: TOGGLE_EMAIL_PROP_ERROR, error });
  }
};

export const deleteEmailAction = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_EMAIL_REQUEST });
  try {
    const response = await deleteEmail(getState().userReducer.token, id);
    dispatch({ type: DELETE_EMAIL_SUCCESS, payload: response.data.id });
  } catch (error) {
    dispatch({ type: DELETE_EMAIL_ERROR, error });
  }
};
