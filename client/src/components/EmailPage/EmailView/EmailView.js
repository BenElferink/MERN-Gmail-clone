import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markAsReadAction } from '../../../redux/actions/emailActions';
import styles from './styles/EmailView.module.css';
import EmailOptions, { Delete, GoBack, MarkUnread, PlaceTrash } from '../EmailOptions/EmailOptions';
import { Avatar } from '@material-ui/core';

export default function EmailView({ inbox, sent, drafts, starred, trash }) {
  const dispatch = useDispatch();
  const { category, id } = useParams();

  const [emailToDisplay] = useState(() => {
    switch (category) {
      case 'inbox':
        return inbox.find((item) => item._id === id);
      case 'sent':
        return sent.find((item) => item._id === id);
      case 'drafts':
        return drafts.find((item) => item._id === id);
      case 'starred':
        return starred.find((item) => item._id === id);
      case 'trash':
        return trash.find((item) => item._id === id);
      default:
        break;
    }
  });

  // this side effect marks the email as read (if it wasn't already marked as read)
  useEffect(() => {
    if (!emailToDisplay.read) dispatch(markAsReadAction(id));
  }, [dispatch, emailToDisplay, id]);

  return (
    <Fragment>
      <EmailOptions>
        <GoBack />
        <PlaceTrash id={id} isInTrash={category === 'trash'} />
        {category === 'trash' ? <Delete /> : <MarkUnread id={id} />}
      </EmailOptions>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3>{emailToDisplay.subject}</h3>
          <div>
            <Avatar className={styles.avatar} />
            {emailToDisplay.from}
            <br />
            to me
          </div>
          <p>{emailToDisplay.message}</p>
        </div>
      </div>
    </Fragment>
  );
}
