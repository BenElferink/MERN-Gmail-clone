import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmailOptions from '../EmailOptions/EmailOptions';
import { Avatar, Checkbox, IconButton } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import styles from './style/EmailView.module.css';

function EmailView() {
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
        <Checkbox />
        <IconButton onClick={() => dispatch(getUserData(token))}>
          <RefreshRoundedIcon />
        </IconButton>
        <IconButton>
          <MoreVertRoundedIcon />
        </IconButton>
      </EmailOptions>

      <div>
        {mailToDisplay._id}
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
