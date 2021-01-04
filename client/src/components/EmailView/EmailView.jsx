import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmailOptions from '../EmailOptions/EmailOptions';
import { IconButton, Avatar } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import styles from './style/EmailView.module.css';

function EmailView() {
  const history = useHistory();
  const { id } = useParams();

  const mailbox = useSelector((state) => state.user.mailbox);

  const [mailToDisplay] = useState(() => {
    for (let i = 0; i < mailbox.length; i++) {
      const mailId = mailbox[i]._id;
      if (mailId === id) return mailbox[i];
    }
  });

  return (
    <div className={styles.container}>
      <EmailOptions>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </EmailOptions>

      <div>
        <h3>{mailToDisplay.subject}</h3>
        <div>
          <Avatar />
          {mailToDisplay.from}
          <br />
          to me
        </div>
        <p>{mailToDisplay.message}</p>
      </div>
    </div>
  );
}

export default EmailView;
