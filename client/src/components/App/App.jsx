import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getUser from './../../redux/actions/getUser';
import AuthPage from '../AuthPage/AuthPage';
import EmailPage from '../EmailPage/EmailPage';
import styles from './style/App.module.css';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.userReducer);

  // if a token exists, try to get the user data from the server,
  // if this fetch has succeeded, App will redirect us to the emails page
  // if this fetch failed, that means the token has expired and the user needs to login
  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token]);

  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route exact path='/'>
            {!isLoggedIn ? <Redirect to='/account' /> : <Redirect to='/email/inbox' />}
          </Route>
          <Route exact path='/account'>
            {!isLoggedIn ? <AuthPage /> : <Redirect to='/email/inbox' />}
          </Route>
          <Route path='/email'>
            {/* This route has multiple sub-routes */}
            {isLoggedIn ? <EmailPage /> : <Redirect to='/account' />}
          </Route>
          <Route
            exact
            path='/GitHub'
            component={() => (window.location.href = 'https://github.com/belferink1996')}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
