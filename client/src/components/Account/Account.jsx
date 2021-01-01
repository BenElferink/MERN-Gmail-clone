import React, { useState } from 'react';
import GmailIcon from './img/gmail.svg';
import FormLogin from './../Form/FormLogin';
import FormRegister from './../Form/FormRegister';
import styles from './style/Account.module.css';

function Account() {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const toggleIsCreateNew = () => setIsCreateNew(!isCreateNew);

  return (
    <div className={styles.account}>
      <img src={GmailIcon} alt='Gmail' />

      {isCreateNew ? (
        <FormRegister toggleIsCreateNew={toggleIsCreateNew} />
      ) : (
        <FormLogin toggleIsCreateNew={toggleIsCreateNew} />
      )}
    </div>
  );
}

export default Account;
