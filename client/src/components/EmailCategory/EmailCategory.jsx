import React from 'react';
import { useParams } from 'react-router-dom';
import { Checkbox, IconButton } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import styles from './style/EmailCategory.module.css';

function EmailCategory({ mailbox }) {
  const { category } = useParams();

  const listToDisplay = (type) => {
    const itemUI = (email) => (
      <div
        className={`${styles.emailCategory__listItem} ${email.read ? styles.read : styles.unread}`}>
        <Checkbox />
        <IconButton>{email.starred ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}</IconButton>
        <h4>{email.from}</h4>
        &nbsp;&nbsp;
        <div className={styles.emailCategory__listItem__message}>
          <h3>{email.subject}</h3>
          &nbsp;&nbsp;
          <p>{email.message}</p>
        </div>
        &nbsp;&nbsp;
        <p>Dec 30</p>
      </div>
    );

    switch (type) {
      case 'inbox':
        return mailbox.received.map((item) => itemUI(item));
      case 'sent':
        return mailbox.sent.map((item) => itemUI(item));
      case 'drafts':
        return mailbox.drafts.map((item) => itemUI(item));
      case 'trash':
        return mailbox.trash.map((item) => itemUI(item));
      case 'starred':
        return 'TBA';
      default:
        return 'Unexpected error!';
    }
  };

  return (
    <div className={styles.emailCategory}>
      <div className={styles.emailCategory__settings}>
        <div>
          <Checkbox />
          <IconButton>
            <RefreshRoundedIcon />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton>
            <ChevronRightRoundedIcon />
          </IconButton>
          <IconButton>
            <KeyboardRoundedIcon />
          </IconButton>
        </div>
      </div>

      <div>{listToDisplay(category)}</div>
    </div>
  );
}

export default EmailCategory;
