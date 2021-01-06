import { combineReducers } from 'redux';
import userReducer from './userReducer';
import emailReducer from './emailReducer';

export default combineReducers({
  userReducer,
  emailReducer,
});
