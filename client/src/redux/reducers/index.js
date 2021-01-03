import { combineReducers } from 'redux';
import token from './tokenReducer';
import user from './userReducer';

export default combineReducers({
  token,
  user,
});
