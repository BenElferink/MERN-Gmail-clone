import axios from 'axios';

const url = 'https://gmail-clone-backend.herokuapp.com/api/v1';
const headers = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});

// account routes
export const register = (form) => axios.post(`${url}/account/register`, form);
export const login = (form) => axios.post(`${url}/account/login`, form);
export const getUser = (token) => axios.get(`${url}/account`, headers(token));
export const uploadImage = (token, image) =>
  axios.put(`${url}/account/image`, image, headers(token));

// email routes
export const getAllEmails = (token) => axios.get(`${url}/email`, headers(token));
export const sendEmail = (token, form) => axios.post(`${url}/email/send`, form, headers(token));
export const saveDraft = (token, form) => axios.post(`${url}/email/draft`, form, headers(token));
export const updateDraft = (token, id, form) =>
  axios.put(`${url}/email/draft/${id}`, form, headers(token));
export const moveToTrash = (token, id) =>
  axios.put(`${url}/email/${id}/trash`, null, headers(token));
export const removeFromTrash = (token, id) =>
  axios.put(`${url}/email/${id}/untrash`, null, headers(token));
export const markAsRead = (token, id) => axios.put(`${url}/email/${id}/read`, null, headers(token));
export const markAsUnread = (token, id) =>
  axios.put(`${url}/email/${id}/unread`, null, headers(token));
export const setFavorite = (token, id) =>
  axios.put(`${url}/email/${id}/favorite`, null, headers(token));
export const unsetFavorite = (token, id) =>
  axios.put(`${url}/email/${id}/unfavorite`, null, headers(token));
export const deleteEmail = (token, id) => axios.delete(`${url}/email/${id}`, headers(token));
