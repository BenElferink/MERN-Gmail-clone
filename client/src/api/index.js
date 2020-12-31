import axios from 'axios';

// api base-url (that you created on server side)
const url = 'http://localhost:8080/api/v1';

export const register = (form) => axios.post(url + '/account/register', form);
export const login = (form) => axios.post(url + '/account/login', form);
export const getUserData = (token) =>
  axios.post(url + '/account', { headers: { Authorization: 'Bearer ' + token } });
