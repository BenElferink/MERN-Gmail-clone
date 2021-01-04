import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toggleRead, toggleTrash } from './../../api';
import EmailOptions from '../EmailOptions/EmailOptions';
import { IconButton, Avatar, Tooltip } from '@material-ui/core';
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

  const moveToTrash = async () => {
    try {
      const response = await toggleTrash(id, token);
      console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  const toggleReadStatus = async () => {
    try {
      const response = await toggleRead(id, token);
      console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  useEffect(() => {
    if (!mailToDisplay.read) toggleReadStatus();
  }, []);

  return (
    <div className={styles.container}>
      <EmailOptions>
        <Tooltip title='Back' placement='top'>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete' placement='top'>
          <IconButton onClick={() => moveToTrash() + history.goBack()}>
            <DeleteRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Mark as unread' placement='top'>
          <IconButton onClick={() => toggleReadStatus() + history.goBack()}>
            <DraftsRoundedIcon />
          </IconButton>
        </Tooltip>
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
