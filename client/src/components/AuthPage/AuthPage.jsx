import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import FormLogin from './Form/FormLogin';
import FormRegister from './Form/FormRegister';
import GmailIcon from './img/gmail.svg';
import styles from './style/AuthPage.module.css';

function AuthPage() {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const toggleIsCreateNew = () => setIsCreateNew(!isCreateNew);

  // if the user has registered, and the email used has been applied,
  // then toggle state to show 'login' component with the registered email.
  const userEmail = useSelector((state) => state.userReducer.user.email);
  useEffect(() => {
    if (userEmail) toggleIsCreateNew();
  }, [userEmail]);

  return (
    <div className={styles.page}>
      <img src={GmailIcon} alt='Gmail' />

      {isCreateNew ? (
        <Fragment>
          <FormRegister />
          <a onClick={toggleIsCreateNew}>Login an existing account</a>
        </Fragment>
      ) : (
        <Fragment>
          <FormLogin />
          <a onClick={toggleIsCreateNew}>Create a new account</a>
        </Fragment>
      )}

      <p>
        Disclaimer: this clone is not associated with Google! All accounts & emails are fictive, but
        remain in a database.
      </p>
    </div>
  );
}

export default AuthPage;
