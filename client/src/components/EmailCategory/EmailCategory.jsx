import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getUserData from './../../redux/actions/getUserData';
import EmailListItem from '../EmailListItem/EmailListItem';
import styles from './style/EmailCategory.module.css';
import { Checkbox, IconButton, Tooltip } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import EmailOptions from '../EmailOptions/EmailOptions';

function EmailCategory({ inbox, sent, starred, drafts, trash, userEmail }) {
  const { category } = useParams();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <EmailOptions>
        <Tooltip title='Select all' placement='top'>
          <Checkbox />
        </Tooltip>
        <Tooltip title='Refresh' placement='top'>
          <IconButton onClick={() => dispatch(getUserData(token))}>
            <RefreshRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='More' placement='top'>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </Tooltip>
      </EmailOptions>

      {category === 'inbox' && (
        <div>
          {inbox.map((item) => (
            <EmailListItem
              key={item._id}
              id={item._id}
              title={item.from}
              subject={item.subject}
              message={item.message}
              date={item.createdAt}
              isRead={item.read}
              isStarred={item.starred}
            />
          ))}
        </div>
      )}

      {category === 'sent' && (
        <div>
          {sent.map((item) => (
            <EmailListItem
              key={item._id}
              id={item._id}
              title={`To: ${item.to}`}
              subject={item.subject}
              message={item.message}
              date={item.createdAt}
              isRead={item.read}
              isStarred={item.starred}
            />
          ))}
        </div>
      )}

      {category === 'starred' && (
        <div>
          {starred.map((item) => (
            <EmailListItem
              key={item._id}
              id={item._id}
              title={item.from === userEmail ? 'me' : item.from}
              subject={item.subject}
              message={item.message}
              date={item.createdAt}
              isRead={item.read}
              isStarred={item.starred}
            />
          ))}
        </div>
      )}

      {category === 'drafts' && (
        <div>
          {drafts.map((item) => (
            <EmailListItem
              key={item._id}
              id={item._id}
              title='Draft'
              subject={item.subject}
              message={item.message}
              date={item.updatedAt}
              isRead={true}
            />
          ))}
        </div>
      )}

      {category === 'trash' && (
        <div>
          {trash.map((item) => (
            <EmailListItem
              key={item._id}
              id={item._id}
              title={item.from === userEmail ? 'me' : item.from}
              subject={item.subject}
              message={item.message}
              date={item.createdAt}
              isRead={item.read}
              isTrash={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailCategory;
