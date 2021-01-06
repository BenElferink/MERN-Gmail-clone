import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getUser from './redux/actions/getUser';
import AuthPage from './components/AuthPage/AuthPage';
import EmailPage from './components/EmailPage/EmailPage';
import styles from './style/App.module.css';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.userReducer);

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
            {!isLoggedIn ? <AuthPage /> : <Redirect to='/email/inbox' />}
          </Route>
          <Route path='/email'>{isLoggedIn ? <EmailPage /> : <Redirect to='/' />}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
