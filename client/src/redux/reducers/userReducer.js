import { REGISTER, LOGIN, GET_USER_DATA } from './../constants';

export default (
  state = {
    email: '',
    name: {
      first: '',
      middle: '',
      last: '',
    },
    imageFileName: '',
    mailbox: [],
    isLoggedIn: false,
  },
  action,
) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, email: action.payload };

    case LOGIN:
      return { ...state, isLoggedIn: true };

    case GET_USER_DATA:
      return { ...action.payload, isLoggedIn: true };

    default:
      return state;
  }
};
