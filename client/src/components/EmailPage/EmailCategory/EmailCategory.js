import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles/EmailCategory.module.css';
import EmailOptions, { More, Refetch, SelectAll } from '../EmailOptions/EmailOptions';
import EmailListItem from './EmailListItem/EmailListItem';
import { CircularProgress } from '@material-ui/core';

export default function EmailCategory({ inbox, sent, drafts, starred, trash, toggleIsCompose }) {
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
        return inbox.length ? (
          <Fragment>
            <EmailOptions>
              <SelectAll />
              <Refetch />
              <More />
            </EmailOptions>

            {inbox.map((item) => (
              <EmailListItem
                key={item._id}
                id={item._id}
                title={item.from}
                subject={item.subject}
                message={item.message}
                date={item.createdAt}
                isRead={item.read}
                isStarred={item.favorite}
              />
            ))}
          </Fragment>
        ) : (
          <div className={styles.center}>Inbox is empty...</div>
        );

      case 'sent':
        return sent.length ? (
          <Fragment>
            <EmailOptions>
              <SelectAll />
              <Refetch />
              <More />
            </EmailOptions>

            {sent.map((item) => (
              <EmailListItem
                key={item._id}
                id={item._id}
                title={`To: ${item.to}`}
                subject={item.subject}
                message={item.message}
                date={item.createdAt}
                isRead={item.read}
                isStarred={item.favorite}
              />
            ))}
          </Fragment>
        ) : (
          <div className={styles.center}>Outbox is empty...</div>
        );

      case 'starred':
        return starred.length ? (
          <Fragment>
            <EmailOptions>
              <SelectAll />
              <Refetch />
              <More />
            </EmailOptions>

            {starred.map((item) => (
              <EmailListItem
                key={item._id}
                id={item._id}
                title={item.from === userEmail ? 'me' : item.from}
                subject={item.subject}
                message={item.message}
                date={item.createdAt}
                isRead={item.read}
                isStarred={true}
              />
            ))}
          </Fragment>
        ) : (
          <div className={styles.center}>Favorites is empty...</div>
        );

      case 'drafts':
        return drafts.length ? (
          <Fragment>
            <EmailOptions>
              <SelectAll />
              <Refetch />
              <More />
            </EmailOptions>

            {drafts.map((item) => (
              <EmailListItem
                key={item._id}
                id={item._id}
                title='Draft'
                subject={item.subject}
                message={item.message}
                date={item.updatedAt}
                isDraft={true}
                toggleIsCompose={toggleIsCompose}
              />
            ))}
          </Fragment>
        ) : (
          <div className={styles.center}>Drafts is empty...</div>
        );

      case 'trash':
        return trash.length ? (
          <Fragment>
            <EmailOptions>
              <SelectAll />
              <Refetch />
              <More />
            </EmailOptions>

            {trash.map((item) => (
              <EmailListItem
                key={item._id}
                id={item._id}
                title={item.from === userEmail ? 'me' : item.from}
                subject={item.subject}
                message={item.message}
                date={item.createdAt}
                isTrash={true}
              />
            ))}
          </Fragment>
        ) : (
          <div className={styles.center}>Trash is empty...</div>
        );

      default:
        break;
    }
  }
}
