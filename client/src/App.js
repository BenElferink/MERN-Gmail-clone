import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { TokenContext } from './context/TokenContextAPI';
import Account from './components/Account/Account';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import EmailCategory from './components/EmailCategory/EmailCategory';
import styles from './style/App.module.css';
import * as api from './api';

function App() {
  const { token } = useContext(TokenContext);
  const [userData, setUserData] = useState(undefined);

  const updateUserData = async () => {
    try {
      const response = await api.getUserData(token);
      console.log(`✅ ${response.status} ${response.statusText}`);
      console.log(response.data);
      setUserData(response.data.user);
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  useEffect(() => {
    if (token !== undefined && token !== null && token !== 'null') updateUserData();
  }, [token]);

  const [showSidebar, setShowSidebar] = useState(true);
  const toggleMenu = () => setShowSidebar(!showSidebar);

  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route exact path='/'>
            {/* check if user is loged in, if true redirect to to /mail/inbox , else redirect to /account */}
            {userData ? <Redirect to='/mail/inbox' /> : <Redirect to='/account' />}
          </Route>

          <Route path='/account'>
            {/* Login/Register */}
            {userData ? <Redirect to='/mail/inbox' /> : <Account />}
          </Route>

          <Route path='/mail'>
            {userData ? (
              <>
                {/* Mail page */}
                <Header setShowSidebar={setShowSidebar} />
                <main className={styles.main}>
                  {showSidebar && <Sidebar userMail={userData.email} />}

                  {/* Mail categorized lists */}
                  <Route exact path='/mail/:category'>
                    <EmailCategory mailbox={userData.mailbox} />
                  </Route>
                </main>
              </>
            ) : (
              <Redirect to='/account' />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
