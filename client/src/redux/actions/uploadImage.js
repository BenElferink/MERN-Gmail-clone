import { UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_ERROR } from '../constants';
import { uploadImage } from '../../api';

export default (form) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_IMAGE_REQUEST });
  try {
    const response = await uploadImage(form, getState().userReducer.token);
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: UPLOAD_IMAGE_ERROR, error: error });
  }
};
