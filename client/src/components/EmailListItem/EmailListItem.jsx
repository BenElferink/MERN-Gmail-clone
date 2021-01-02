import React from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import styles from './style/EmailListItem.module.css';

function EmailListItem({ email, swapRecipient }) {
  return (
    <div className={`${styles.email__listItem} ${email.read ? styles.read : styles.unread}`}>
      <Checkbox />
      <IconButton>{email.starred ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}</IconButton>
      <h4>{swapRecipient ? email.to : email.from}</h4>
      &nbsp;&nbsp;
      <div className={styles.email__listItem__message}>
        <h3>{email.subject}</h3>
        &nbsp;&nbsp;
        <p>{email.message}</p>
      </div>
      &nbsp;&nbsp;
      <p>{dateToString(email.createdAt)}</p>
    </div>
  );
}

const dateToString = (dateObj) => {
  let day = new Date(dateObj).getDate();
  let month = new Date(dateObj).getMonth();
  switch (month) {
    case 0:
      return `Jan ${day}`;
    case 1:
      return `Feb ${day}`;
    case 2:
      return `Mar ${day}`;
    case 3:
      return `Apr ${day}`;
    case 4:
      return `May ${day}`;
    case 5:
      return `Jun ${day}`;
    case 6:
      return `Jul ${day}`;
    case 7:
      return `Aug ${day}`;
    case 8:
      return `Sep ${day}`;
    case 9:
      return `Oct ${day}`;
    case 10:
      return `Nov ${day}`;
    case 11:
      return `Dec ${day}`;
    default:
      return 'Unexpected error';
  }
};

export default EmailListItem;
