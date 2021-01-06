import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toggleStarred from '../../../../redux/actions/toggleStarred';
import deleteEmail from '../../../../redux/actions/deleteEmail';
import { Checkbox, IconButton } from '@material-ui/core';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import styles from './style/EmailListItem.module.css';

function EmailListItem({
  id,
  title,
  subject,
  message,
  date,
  isRead,
  isStarred,
  isTrash,
  isDraft,
  toggleIsCompose,
}) {
  const history = useHistory();
  const { category } = useParams();
  const dispatch = useDispatch();

  return (
    <div className={`${styles.item} ${isRead ? styles.read : styles.unread}`}>
      <Checkbox />

      {isStarred !== undefined && (
        <IconButton onClick={() => dispatch(toggleStarred(id))}>
          {isStarred ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
        </IconButton>
      )}

      {isTrash && (
        <IconButton onClick={() => dispatch(deleteEmail(id))}>
          <DeleteRoundedIcon />
        </IconButton>
      )}

      <div
        className={styles.message}
        onClick={() =>
          isDraft ? toggleIsCompose(id) : history.push(`/email/${category}/view/${id}`)
        }>
        <h4>{title}</h4>
        &nbsp;&nbsp;
        <p>
          <span>{subject}</span>
          &nbsp;&nbsp;
          {message}
        </p>
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
