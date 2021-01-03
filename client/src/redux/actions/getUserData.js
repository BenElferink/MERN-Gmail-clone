import { GET_USER_DATA } from './../constants';
import { getUserData } from './../../api';

export default (token) => async (dispatch) => {
  try {
    const response = await getUserData(token);
    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    dispatch({ type: GET_USER_DATA, payload: response.data.user });
  } catch (error) {
    console.error(`❌ ${error}`);
  }
};
