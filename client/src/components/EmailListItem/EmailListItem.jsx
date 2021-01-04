import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toggleStarred } from './../../api';
import { Checkbox, IconButton } from '@material-ui/core';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import styles from './style/EmailListItem.module.css';

function EmailListItem({ id, title, subject, message, date, isRead, isStarred }) {
  const history = useHistory();
  const token = useSelector((state) => state.token);

  const clickStar = async () => {
    try {
      const response = await toggleStarred(id, token);
      console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    } catch (error) {
      console.log(`❌ ${error}`);
    }
  };

  return (
    <div className={`${styles.item} ${isRead ? styles.read : styles.unread}`}>
      <Checkbox />
      {isStarred !== undefined && (
        <IconButton onClick={clickStar}>
          {isStarred ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
        </IconButton>
      )}

      <div className={styles.message} onClick={() => history.push(`/mail/view/${id}`)}>
        <h4>{title}</h4>
        &nbsp;&nbsp;
        {/* <div className={styles.message_content}> */}
        <p>
          <span>{subject}</span>
          &nbsp;&nbsp;
          {message}
        </p>
        {/* </div> */}
        &nbsp;&nbsp;
        <span>{dateToString(date)}</span>
      </div>
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
      return 'Loading...';
  }
};

export default EmailListItem;
