import { Fragment, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmailsAction } from '../../redux/actions/emailActions';
import styles from './styles/EmailPage.module.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import EmailCategory from './EmailCategory/EmailCategory';
import EmailView from './EmailView/EmailView';
import ComposeMail from './ComposeMail/ComposeMail';

export default function EmailPage() {
  const dispatch = useDispatch();
  const mailbox = useSelector((state) => state.emailReducer.mailbox);
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [starred, setStarred] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [trash, setTrash] = useState([]);

  // this gets all emails linked to the user, upon mount
  useEffect(() => {
    dispatch(getEmailsAction());
  }, [dispatch]);

  // this sorts all the emails by categories and time,
  // and sets all states accordingly.
  // this runs each time the mailbox (redux) was updated
  useEffect(() => {
    // filter mailbox to UI categories
    let inboxArr = [...mailbox.inbox],
      sentArr = [...mailbox.outbox],
      draftsArr = [...mailbox.drafts],
      trashArr = [...mailbox.trash],
      starredArr = mailbox.inbox
        .filter((email) => email.favorite)
        .concat(mailbox.outbox.filter((email) => email.favorite));

    // sort all categories by date
    inboxArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    sentArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    draftsArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    trashArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    starredArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // update states with changes
    setInbox(inboxArr);
    setSent(sentArr);
    setDrafts(draftsArr);
    setTrash(trashArr);
    setStarred(starredArr);
  }, [mailbox]);

  // these states mount/unmount certain components
  const [showSidebar, setShowSidebar] = useState(true);
  const [isCompose, setIsCompose] = useState(false);
  // this state holds the draft email information (if a draft was clicked for editing)
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
            starredLength={starred.length}
            draftsLength={drafts.length}
            trashLength={trash.length}
          />
        )}

        <div className={styles.container} className='scroll'>
          <Route exact path='/email/:category'>
            <EmailCategory
              inbox={inbox}
              sent={sent}
              starred={starred}
              drafts={drafts}
              trash={trash}
              toggleIsCompose={toggleIsCompose}
            />
          </Route>

          <Route path='/email/:category/view/:id'>
            <EmailView inbox={inbox} sent={sent} drafts={drafts} starred={starred} trash={trash} />
          </Route>
        </div>

        {isCompose && <ComposeMail toggleIsCompose={toggleIsCompose} composeDraft={composeDraft} />}
      </main>
    </Fragment>
  );
}
