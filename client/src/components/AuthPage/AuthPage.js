import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles/AuthPage.module.css';
import FormLogin from './Form/FormLogin';
import FormRegister from './Form/FormRegister';
import GmailIcon from './images/gmail.svg';

export default function AuthPage() {
  const { user, isLoading, error } = useSelector((state) => state.userReducer);

  // defines if the register or login form is displayed
  const [isCreateNew, setIsCreateNew] = useState(false);
  const toggleIsCreateNew = () => setIsCreateNew(!isCreateNew);

  // if the user has registered, and the email used has been applied,
  // then toggle state to show 'login' component with the registered email.
  useEffect(() => {
    if (user.email) {
      toggleIsCreateNew();
      alert('Account successfully created!');
    }
    // eslint-disable-next-line
  }, [user.email]);

  return (
    <div className={styles.page}>
      <img src={GmailIcon} alt='Gmail' />

      {isCreateNew ? (
        <Fragment>
          <FormRegister isLoading={isLoading} error={error} />
          <button className={styles.link} onClick={toggleIsCreateNew}>
            Login an existing account
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <FormLogin isLoading={isLoading} error={error} user={user} />
          <button className={styles.link} onClick={toggleIsCreateNew}>
            Create a new account
          </button>
        </Fragment>
      )}

      <p>
        Disclaimer: this clone is not associated with Google! All accounts & emails are fictive, but
        remain in a database.
      </p>
    </div>
  );
}
