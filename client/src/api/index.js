import axios from 'axios';

// api base-url (that you created on server side)
const url = 'http://localhost:8080/api/v1';

// authenticate token route
export const authenticateToken = (token) =>
  axios.get(url + '/account/register', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

// account routes
export const register = (form) => axios.post(url + '/account/register', form);
export const login = (form) => axios.post(url + '/account/login', form);
export const getUserData = (token) =>
  axios.get(url + '/account', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

// email routes
export const sendEmail = (form, token) =>
  axios.post(url + '/email', form, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
export const saveDraft = (form, token) =>
  axios.post(url + '/email/drafts', form, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
export const handleStar = (id, token) =>
  axios.put(url + '/email/' + id + '/star', null, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
