import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toggleRead from './../../../redux/actions/toggleRead';
import { Avatar } from '@material-ui/core';
import styles from './style/EmailView.module.css';

function EmailView({ inbox, sent, drafts, starred, trash }) {
  const { category, id } = useParams();

  const [emailToDisplay, setEmailToDisplay] = useState(() => {
    switch (category) {
      case 'inbox':
        return inbox.filter((item) => item._id === id);
      case 'sent':
        return sent.filter((item) => item._id === id);
      case 'drafts':
        return drafts.filter((item) => item._id === id);
      case 'starred':
        return starred.filter((item) => item._id === id);
      case 'trash':
        return trash.filter((item) => item._id === id);
      default:
        break;
    }
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (!emailToDisplay[0].read) dispatch(toggleRead(id));
  }, [emailToDisplay]);

  return (
    <div className={styles.container}>
      <div>
        <h3>{emailToDisplay[0]?.subject}</h3>
        <div>
          <Avatar />
          {emailToDisplay[0]?.from}
          <br />
          to me
        </div>
        <p>{emailToDisplay[0]?.message}</p>
      </div>
    </div>
  );
}

export default EmailView;
