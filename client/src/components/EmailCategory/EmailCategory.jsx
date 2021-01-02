import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import EmailListItem from '../EmailListItem/EmailListItem';
import { Checkbox, IconButton } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import styles from './style/EmailCategory.module.css';

function EmailCategory({ mailbox, updateUserData }) {
  const { category } = useParams();

  const listToDisplay = (type) => {
    switch (type) {
      case 'inbox':
        return mailbox.inbox.map((item) => <EmailListItem key={item._id} email={item} />);
      case 'sent':
        return mailbox.sent.map((item) => <EmailListItem key={item._id} email={item} />);
      case 'drafts':
        return mailbox.drafts.map((item) => (
          <EmailListItem key={item._id} email={item} swapRecipient={true} />
        ));
      case 'trash':
        return mailbox.trash.map((item) => <EmailListItem key={item._id} email={item} />);
      case 'starred':
        return mailbox.starred.map((item) => <EmailListItem key={item._id} email={item} />);
      default:
        return 'Unexpected error!';
    }
  };

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

      <div>{listToDisplay(category)}</div>
    </div>
  );
}

export default EmailCategory;
