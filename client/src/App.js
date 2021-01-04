import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getUserData from './redux/actions/getUserData';
import AuthPage from './components/AuthPage/AuthPage';
import EmailPage from './components/EmailPage/EmailPage';
import styles from './style/App.module.css';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserData(token));
  }, [token]);

  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route
            exact
            path='/'
            component={() => (!user.isLoggedIn ? <AuthPage /> : <Redirect to='/mail/inbox' />)}
          />
          <Route
            path='/mail'
            component={() => (user.isLoggedIn ? <EmailPage /> : <Redirect to='/' />)}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
