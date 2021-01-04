import React, { Fragment, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './../Header/Header';
import Sidebar from './../Sidebar/Sidebar';
import ComposeMail from './../ComposeMail/ComposeMail';
import EmailCategory from './../EmailCategory/EmailCategory';
import EmailView from '../EmailView/EmailView';
import styles from './style/EmailPage.module.css';

function EmailPage() {
  const user = useSelector((state) => state.user);

  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [starred, setStarred] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [trash, setTrash] = useState([]);

  useEffect(() => {
    let inboxArr = user.mailbox.filter(
      (email) => email.to === user.email && !email.draft && !email.trash,
    );
    let sentArr = user.mailbox.filter(
      (email) => email.from === user.email && !email.draft && !email.trash,
    );
    let starredArr = user.mailbox.filter((email) => email.starred && !email.draft && !email.trash);
    let draftsArr = user.mailbox.filter((email) => email.draft && !email.trash);
    let trashArr = user.mailbox.filter((email) => email.trash);
    setInbox(inboxArr);
    setSent(sentArr);
    setStarred(starredArr);
    setDrafts(draftsArr);
    setTrash(trashArr);
  }, [user]);

  const [showSidebar, setShowSidebar] = useState(true);
  const [isCompose, setIsCompose] = useState(false);

  const toggleShowSidebar = () => setShowSidebar(!showSidebar);
  const toggleIsCompose = () => setIsCompose(!isCompose);

  return (
    <Fragment>
      <Header toggleShowSidebar={toggleShowSidebar} />
      <main className={styles.main}>
        {showSidebar && (
          <Sidebar
            toggleIsCompose={toggleIsCompose}
            inboxLength={inbox.length}
            sentLength={sent.length}
            starredLength={starred.length}
            draftsLength={drafts.length}
            trashLength={trash.length}
          />
        )}
        {isCompose && <ComposeMail toggleIsCompose={toggleIsCompose} />}

        <Route exact path='/mail/:category'>
          <EmailCategory
            inbox={inbox}
            sent={sent}
            starred={starred}
            drafts={drafts}
            trash={trash}
            userEmail={user.email}
          />
        </Route>
        <Route exact path='/mail/view/:id'>
          <EmailView />
        </Route>
      </main>
    </Fragment>
  );
}

export default EmailPage;
