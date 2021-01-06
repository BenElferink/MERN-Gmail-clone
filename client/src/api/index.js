import axios from 'axios';

// api base-url (that you created on server side)
const url = 'http://localhost:8080/api/v1';

// account routes
export const register = (form) => axios.post(url + '/account/register', form);
export const login = (form) => axios.post(url + '/account/login', form);
export const getUser = (token) =>
  axios.get(url + '/account', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

// email routes
export const getEmails = (token) =>
  axios.get(url + '/email', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
export const sendEmail = (form, token) =>
  axios.post(url + '/email/outbox', form, {
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
export const updateDraft = (id, form, token) =>
  axios.put(url + '/email/drafts/' + id, form, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
export const toggleRead = (id, token) =>
  axios.put(url + '/email/' + id + '/read', null, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
export const toggleStarred = (id, token) =>
  axios.put(url + '/email/' + id + '/starred', null, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
export const toggleTrash = (id, token) =>
  axios.put(url + '/email/' + id + '/trash', null, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
export const deleteEmail = (id, token) =>
  axios.delete(url + '/email/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
