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

const initialState = {
  isLoading: false,
  mailbox: {
    inbox: [],
    outbox: [],
    drafts: [],
    trash: [],
  },
  error: '',
};

export const emailReducer = (state = initialState, action) => {
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
    case EMAIL_TRASH_REQUEST:
    case EMAIL_UNTRASH_REQUEST:
    case TOGGLE_EMAIL_PROP_REQUEST:
    case DELETE_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_EMAILS_SUCCESS:
    case EMAIL_TRASH_SUCCESS:
    case EMAIL_UNTRASH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mailbox: action.payload,
        error: '',
      };

    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mailbox: {
          ...state.mailbox,
          outbox: [...state.mailbox.outbox, action.payload.outbox],
          inbox: [...state.mailbox.inbox, action.payload.inbox],
        },
        error: '',
      };

    case SAVE_DRAFT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mailbox: { ...state.mailbox, drafts: [...state.mailbox.drafts, action.payload] },
        error: '',
      };

    case UPDATE_DRAFT_SUCCESS:
      let copyOfDrafts = [...state.mailbox.drafts];
      for (let i = 0; i < copyOfDrafts.length; i++) {
        if (copyOfDrafts[i]._id === action.payload._id) {
          copyOfDrafts[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        isLoading: false,
        mailbox: { ...state.mailbox, drafts: copyOfDrafts },
        error: '',
      };

    case TOGGLE_EMAIL_PROP_SUCCESS:
      let copyOfInbox = [...state.mailbox.inbox],
        copyOfOutbox = [...state.mailbox.outbox],
        isEmailFound = false;
      // search inbox
      if (!isEmailFound)
        for (let i = 0; i < copyOfInbox.length; i++) {
          if (copyOfInbox[i]._id === action.payload._id) {
            copyOfInbox[i] = action.payload;
            isEmailFound = true;
            break;
          }
        }
      // search outbox
      if (!isEmailFound)
        for (let i = 0; i < copyOfOutbox.length; i++) {
          if (copyOfOutbox[i]._id === action.payload._id) {
            copyOfOutbox[i] = action.payload;
            isEmailFound = true;
            break;
          }
        }
      return {
        ...state,
        isLoading: false,
        mailbox: { ...state.mailbox, inbox: copyOfInbox, outbox: copyOfOutbox },
        error: '',
      };

    case DELETE_EMAIL_SUCCESS:
      let copyOfTrash = [...state.mailbox.trash],
        copyOfDrafts2 = [...state.mailbox.drafts],
        isEmailFound2 = false;
      for (let i = 0; i < copyOfTrash.length; i++) {
        if (copyOfTrash[i]._id === action.payload) {
          copyOfTrash.splice(i, 1);
          copyOfDrafts2 = true;
          break;
        }
      }
      if (!isEmailFound2) {
        for (let i = 0; i < copyOfDrafts2.length; i++) {
          if (copyOfDrafts2[i]._id === action.payload) {
            copyOfDrafts2.splice(i, 1);
            break;
          }
        }
      }
      return {
        ...state,
        isLoading: false,
        mailbox: { ...state.mailbox, trash: copyOfTrash, drafts: copyOfDrafts2 },
        error: '',
      };

    case FETCH_EMAILS_ERROR:
    case SEND_EMAIL_ERROR:
    case SAVE_DRAFT_ERROR:
    case UPDATE_DRAFT_ERROR:
    case EMAIL_TRASH_ERROR:
    case EMAIL_UNTRASH_ERROR:
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
