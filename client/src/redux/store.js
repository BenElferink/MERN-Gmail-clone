import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { userReducer } from './reducers/userReducer';
import { emailReducer } from './reducers/emailReducer';

const allReducers = combineReducers({
  userReducer,
  emailReducer,
});

export const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk, logger)));
