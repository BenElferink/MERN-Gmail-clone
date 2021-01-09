import axios from 'axios';

// api base-url (that you created on server side)
const url = 'http://localhost:8080/api/v1';
const headers = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});

// access to "uploads" folder on the server
export const imageUrl = 'http://localhost:8080/uploads/';

// account routes
export const register = (form) => axios.post(`${url}/account/register`, form);
export const login = (form) => axios.post(`${url}/account/login`, form);
export const getUser = (token) => axios.get(`${url}/account`, headers(token));
export const uploadImage = (form, token) => axios.put(`${url}/account/image`, form, headers(token));

// email routes
export const getEmails = (token) => axios.get(`${url}/email`, headers(token));
export const sendEmail = (form, token) => axios.post(`${url}/email/outbox`, form, headers(token));
export const saveDraft = (form, token) => axios.post(`${url}/email/drafts`, form, headers(token));
export const updateDraft = (id, form, token) =>
  axios.put(`${url}/email/drafts/${id}`, form, headers(token));
export const toggleEmailProperty = (id, toggle, token) =>
  axios.put(`${url}/email/${id}/${toggle}`, null, headers(token));
export const deleteEmail = (id, token) => axios.delete(`${url}/email/${id}`, headers(token));
