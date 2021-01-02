import React from 'react';
import { useParams } from 'react-router-dom';
import EmailListItem from '../EmailListItem/EmailListItem';
import { Checkbox, IconButton } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import styles from './style/EmailCategory.module.css';

function EmailCategory({ userData, updateUserData }) {
  const { category } = useParams();

  return (
    <div className={styles.emailCategory}>
      <div className={styles.emailCategory__settings}>
        <div>
          <Checkbox />
          <IconButton onClick={updateUserData}>
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

      <div>{listToDisplay(category, userData)}</div>
    </div>
  );
}

const listToDisplay = (category, userData) => {
  switch (category) {
    case 'inbox':
      return userData.mailbox.inbox.map((item) => (
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
    case 'sent':
      return userData.mailbox.sent.map((item) => (
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
    case 'drafts':
      return userData.mailbox.drafts.map((item) => (
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
      ));
    case 'starred':
      return userData.mailbox.starred.map((item) => (
        <EmailListItem
          key={item._id}
          id={item._id}
          title={item.from === userData.email ? 'me' : item.from}
          subject={item.subject}
          message={item.message}
          date={item.createdAt}
          isRead={item.read}
          isStarred={item.starred}
        />
      ));
    case 'trash':
      return userData.mailbox.trash.map((item) => (
        <EmailListItem
          key={item._id}
          id={item._id}
          title={item.from === userData.email ? 'me' : item.from}
          subject={item.subject}
          message={item.message}
          date={item.createdAt}
          isRead={item.read}
          isStarred={undefined}
        />
      ));
    default:
      return 'Loading...';
  }
};

export default EmailCategory;
