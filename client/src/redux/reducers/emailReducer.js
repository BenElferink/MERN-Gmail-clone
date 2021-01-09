import {
  CLEAR_ERRORS,
  LOGOUT,
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
  TOGGLE_EMAIL_PROP_REQUEST,
  TOGGLE_EMAIL_PROP_SUCCESS,
  TOGGLE_EMAIL_PROP_ERROR,
  DELETE_EMAIL_REQUEST,
  DELETE_EMAIL_SUCCESS,
  DELETE_EMAIL_ERROR,
} from './../constants';

const initialState = {
  isLoading: false,
  mailbox: {},
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: '',
      };

    case LOGOUT:
      return initialState;

    case FETCH_EMAILS_REQUEST:
    case SEND_EMAIL_REQUEST:
    case SAVE_DRAFT_REQUEST:
    case UPDATE_DRAFT_REQUEST:
    case TOGGLE_EMAIL_PROP_REQUEST:
    case DELETE_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_EMAILS_SUCCESS:
    case SEND_EMAIL_SUCCESS:
    case SAVE_DRAFT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mailbox: action.payload,
        error: '',
      };

    case UPDATE_DRAFT_SUCCESS:
    case TOGGLE_EMAIL_PROP_SUCCESS:
      let copyOfMailbox = { ...state.mailbox };
      let isEmailFound = false;
      // search inbox
      if (!isEmailFound)
        for (let i = 0; i < copyOfMailbox.inbox.length; i++) {
          if (copyOfMailbox.inbox[i]._id === action.payload._id) {
            copyOfMailbox.inbox[i] = action.payload;
            isEmailFound = true;
            break;
          }
        }
      // search outbox
      if (!isEmailFound)
        for (let i = 0; i < copyOfMailbox.outbox.length; i++) {
          if (copyOfMailbox.outbox[i]._id === action.payload._id) {
            copyOfMailbox.outbox[i] = action.payload;
            isEmailFound = true;
            break;
          }
        }
      // search drafts
      if (!isEmailFound)
        for (let i = 0; i < copyOfMailbox.drafts.length; i++) {
          if (copyOfMailbox.drafts[i]._id === action.payload._id) {
            copyOfMailbox.drafts[i] = action.payload;
            isEmailFound = true;
            break;
          }
        }
      return {
        ...state,
        isLoading: false,
        mailbox: copyOfMailbox,
        error: '',
      };

    case DELETE_EMAIL_SUCCESS:
      let copyOfMailbox2 = { ...state.mailbox };
      let isEmailFound2 = false;
      // search inbox
      if (!isEmailFound2)
        for (let i = 0; i < copyOfMailbox2.inbox.length; i++) {
          if (copyOfMailbox2.inbox[i]._id === action.payload) {
            copyOfMailbox2.inbox.splice(i, 1);
            isEmailFound2 = true;
            break;
          }
        }
      // search outbox
      if (!isEmailFound2)
        for (let i = 0; i < copyOfMailbox2.outbox.length; i++) {
          if (copyOfMailbox2.outbox[i]._id === action.payload) {
            copyOfMailbox2.outbox.splice(i, 1);
            isEmailFound2 = true;
            break;
          }
        }
      // search drafts
      if (!isEmailFound2)
        for (let i = 0; i < copyOfMailbox2.drafts.length; i++) {
          if (copyOfMailbox2.drafts[i]._id === action.payload) {
            copyOfMailbox2.drafts.splice(i, 1);
            isEmailFound2 = true;
            break;
          }
        }
      return {
        ...state,
        isLoading: false,
        mailbox: copyOfMailbox2,
        error: '',
      };

    case FETCH_EMAILS_ERROR:
    case SEND_EMAIL_ERROR:
    case SAVE_DRAFT_ERROR:
    case UPDATE_DRAFT_ERROR:
    case TOGGLE_EMAIL_PROP_ERROR:
    case DELETE_EMAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
