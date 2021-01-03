import { LOGIN } from './../constants';
import { login } from './../../api';

export default (form) => async (dispatch) => {
  try {
    const response = await login(form);
    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    dispatch({ type: LOGIN, payload: response.data.token });
  } catch (error) {
    console.error(`❌ ${error}`);
    error.response.data.message && window.alert(error.response.data.message); // bad credentials
  }
};
