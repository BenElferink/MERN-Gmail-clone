import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmailListItem from './EmailListItem/EmailListItem';
import { CircularProgress } from '@material-ui/core';
import styles from './style/EmailCategory.module.css';

function EmailCategory({ inbox, sent, drafts, starred, trash, toggleIsCompose }) {
  const { category } = useParams();
  const { isLoading } = useSelector((state) => state.emailReducer);
  const userEmail = useSelector((state) => state.userReducer.user.email);

  if (isLoading) {
    return (
      <div className={styles.center}>
        <CircularProgress color='secondary' />
      </div>
    );
  } else {
    switch (category) {
      case 'inbox':
        if (inbox.length) {
          return inbox.map((item) => (
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
          ));
        } else {
          return <div className={styles.center}>Inbox is empty</div>;
        }

      case 'sent':
        if (sent.length) {
          return sent.map((item) => (
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
          ));
        } else {
          return <div className={styles.center}>Outbox is empty</div>;
        }

      case 'drafts':
        if (drafts.length) {
          return drafts.map((item) => (
            <EmailListItem
              key={item._id}
              id={item._id}
              title='Draft'
              subject={item.subject}
              message={item.message}
              date={item.updatedAt}
              isRead={true}
              isDraft={true}
              toggleIsCompose={toggleIsCompose}
            />
          ));
        } else {
          return <div className={styles.center}>No drafts...</div>;
        }

      case 'starred':
        if (starred.length) {
          return starred.map((item) => (
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
          ));
        } else {
          return <div className={styles.center}>No favorites...</div>;
        }

      case 'trash':
        if (trash.length) {
          return trash.map((item) => (
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
          ));
        } else {
          return <div className={styles.center}>Trash is empty</div>;
        }

      default:
        break;
    }
  }
}

export default EmailCategory;
