import React, { Fragment, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getEmails from './../../redux/actions/getEmails';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import EmailOptions from './EmailOptions/EmailOptions';
import EmailCategory from './EmailCategory/EmailCategory';
import EmailView from './EmailView/EmailView';
import ComposeMail from './ComposeMail/ComposeMail';
import styles from './style/EmailPage.module.css';

function EmailPage() {
  const dispatch = useDispatch();
  const mailbox = useSelector((state) => state.emailReducer.mailbox);
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [starred, setStarred] = useState([]);
  const [trash, setTrash] = useState([]);

  // this gets all emails linked to the user, upon mount
  useEffect(() => {
    dispatch(getEmails());
  }, []);

  // this sorts all the emails by categories and time,
  // and sets all states accordingly.
  // this runs each time the mailbox (redux) was updated
  useEffect(() => {
    // filter mailbox to UI categories
    let inboxArr = mailbox.inbox?.filter((email) => !email.trash);
    let sentArr = mailbox.outbox?.filter((email) => !email.trash);
    let draftsArr = mailbox.drafts?.filter((email) => !email.trash);
    let starredArr = mailbox.inbox
      ?.filter((email) => email.starred && !email.trash)
      .concat(mailbox.outbox?.filter((email) => email.starred && !email.trash));
    let trashArr = mailbox.inbox
      ?.filter((email) => email.trash)
      .concat(
        mailbox.outbox?.filter((email) => email.trash),
        mailbox.drafts?.filter((email) => email.trash),
      );

    // sort all categories by date
    inboxArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    sentArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    draftsArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    starredArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    trashArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // update states with changes
    inboxArr && setInbox(inboxArr);
    sentArr && setSent(sentArr);
    starredArr && setStarred(starredArr);
    draftsArr && setDrafts(draftsArr);
    trashArr && setTrash(trashArr);
  }, [mailbox]);

  // these states mount/unmount certain components
  const [showSidebar, setShowSidebar] = useState(true);
  const [isCompose, setIsCompose] = useState(false);
  // this state holds draft email information if a draft was clicked for editing
  const [composeDraft, setComposeDraft] = useState(undefined);

  const toggleShowSidebar = () => setShowSidebar(!showSidebar);
  const toggleIsCompose = (id) => {
    setIsCompose(!isCompose);

    // if activated by clicking a draft, set draft details in state
    if (id) {
      drafts.forEach((draft) => draft._id === id && setComposeDraft(draft));
    } else {
      setComposeDraft(undefined);
    }
  };

  return (
    <Fragment>
      <Header toggleShowSidebar={toggleShowSidebar} />
      <main className={styles.main}>
        {showSidebar && (
          <Sidebar
            toggleIsCompose={toggleIsCompose}
            inboxLength={inbox.length}
            sentLength={sent.length}
            draftsLength={drafts.length}
            starredLength={starred.length}
            trashLength={trash.length}
          />
        )}

        <div className={styles.container}>
          <Route exact path='/email/:category'>
            <EmailOptions />
            <EmailCategory
              inbox={inbox}
              sent={sent}
              drafts={drafts}
              starred={starred}
              trash={trash}
              toggleIsCompose={toggleIsCompose}
            />
          </Route>

          <Route path='/email/:category/view/:id'>
            <EmailOptions isViewMode={true} />
            <EmailView inbox={inbox} sent={sent} drafts={drafts} starred={starred} trash={trash} />
          </Route>
        </div>

        {isCompose && <ComposeMail toggleIsCompose={toggleIsCompose} composeDraft={composeDraft} />}
      </main>
    </Fragment>
  );
}

export default EmailPage;
