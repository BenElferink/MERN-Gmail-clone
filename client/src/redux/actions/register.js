import { REGISTER } from './../constants';
import { register } from './../../api';

export default (form) => async (dispatch) => {
  try {
    const response = await register(form);
    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    dispatch({ type: REGISTER, payload: response.data.email });
  } catch (error) {
    console.error(`❌ ${error}`);
    error.response.data.message && window.alert(error.response.data.message); // email is already taken
  }
};
