import { LOGIN } from './../constants';

export default (state = window.localStorage.getItem('token'), action) => {
  switch (action.type) {
    case LOGIN:
      const token = action.payload;
      window.localStorage.setItem('token', token);
      console.log(`🌐 Token saved to Local Storage: ${token}`);
      return token;

    default:
      return state;
  }
};
