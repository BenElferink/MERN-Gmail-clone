import React, { useState } from 'react';
import GmailIcon from './img/gmail.svg';
import FormLogin from '../Form/FormLogin';
import FormRegister from '../Form/FormRegister';
import styles from './style/AuthPage.module.css';

function AuthPage() {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const toggleIsCreateNew = () => setIsCreateNew(!isCreateNew);

  return (
    <div className={styles.page}>
      <img src={GmailIcon} alt='Gmail' />

      {isCreateNew ? (
        <FormRegister toggleIsCreateNew={toggleIsCreateNew} />
      ) : (
        <FormLogin toggleIsCreateNew={toggleIsCreateNew} />
      )}

      <p>
        Disclaimer: this clone is not associated with Google! All accounts & emails are fictive, but
        remain in a database.
      </p>
    </div>
  );
}

export default AuthPage;