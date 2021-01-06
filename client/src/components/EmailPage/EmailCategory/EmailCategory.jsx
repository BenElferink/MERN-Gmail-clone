import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmailListItem from './EmailListItem/EmailListItem';

function EmailCategory({ inbox, sent, drafts, starred, trash }) {
  const { category } = useParams();
  const userEmail = useSelector((state) => state.userReducer.user.email);

  switch (category) {
    case 'inbox':
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

    case 'sent':
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

    case 'drafts':
      return drafts.map((item) => (
        <EmailListItem
          key={item._id}
          id={item._id}
          title='Draft'
          subject={item.subject}
          message={item.message}
          date={item.updatedAt}
          isRead={true}
        />
      ));

    case 'starred':
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

    case 'trash':
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

    default:
      break;
  }
}

export default EmailCategory;
