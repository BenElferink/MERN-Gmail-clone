import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getUserData from './../../redux/actions/getUserData';
import EmailOptions from '../EmailOptions/EmailOptions';
import EmailListItem from '../EmailListItem/EmailListItem';
import { Checkbox, IconButton } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import styles from './style/EmailCategory.module.css';

function EmailCategory({ inbox, sent, starred, drafts, trash, userEmail }) {
  const { category } = useParams();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

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
              isStarred={undefined}
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
              isStarred={undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailCategory;
