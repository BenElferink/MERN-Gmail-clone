import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { markAsRead, markAsUnread } from './../../api';
import EmailOptions from '../EmailOptions/EmailOptions';
import { IconButton, Avatar } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import styles from './style/EmailView.module.css';

function EmailView() {
  const history = useHistory();
  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const mailbox = useSelector((state) => state.user.mailbox);
  const [mailToDisplay] = useState(() => {
    for (let i = 0; i < mailbox.length; i++) {
      const mailId = mailbox[i]._id;
      if (mailId === id) return mailbox[i];
    }
  });

  const markReadAsTrue = async () => {
    try {
      const response = await markAsRead(id, token);
      console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  const markReadAsFalse = async () => {
    try {
      const response = await markAsUnread(id, token);
      console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  useEffect(() => {
    markReadAsTrue();
  }, []);

  return (
    <div className={styles.container}>
      <EmailOptions>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <IconButton>
          <DeleteRoundedIcon />
        </IconButton>
        <IconButton onClick={markReadAsFalse}>
          <DraftsRoundedIcon />
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
