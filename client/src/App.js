import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { TokenContext } from './context/TokenContextAPI';
import Account from './components/Account/Account';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import EmailCategory from './components/EmailCategory/EmailCategory';
import ComposeMail from './components/ComposeMail/ComposeMail';
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
  const toggleShowSidebar = () => setShowSidebar(!showSidebar);
  const [isCompose, setIsCompose] = useState(false);
  const toggleIsCompose = () => setIsCompose(!isCompose);

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
                <Header toggleShowSidebar={toggleShowSidebar} />
                <main className={styles.main}>
                  {showSidebar && <Sidebar userData={userData} toggleIsCompose={toggleIsCompose} />}

                  {/* Mail categorized lists */}
                  <Route exact path='/mail/:category'>
                    <EmailCategory userData={userData} updateUserData={updateUserData} />
                  </Route>
                </main>
              </>
            ) : (
              <Redirect to='/account' />
            )}
          </Route>
        </Switch>

        {userData && isCompose && (
          <ComposeMail userEmail={userData.email} toggleIsCompose={toggleIsCompose} />
        )}
      </div>
    </Router>
  );
}

export default App;
