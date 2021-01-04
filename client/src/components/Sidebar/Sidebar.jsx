import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SidebarOption from '../SidebarOption/SidebarOption';
import { Button } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/Add';
import InboxRoundedIcon from '@material-ui/icons/Inbox';
import StarRoundedIcon from '@material-ui/icons/Star';
import SendRoundedIcon from '@material-ui/icons/Send';
import NoteRoundedIcon from '@material-ui/icons/Note';
import DeleteRoundedIcon from '@material-ui/icons/Delete';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import styles from './style/Sidebar.module.css';

function Sidebar({
  toggleIsCompose,
  inboxLength,
  sentLength,
  starredLength,
  draftsLength,
  trashLength,
}) {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);

  const history = useHistory();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Button
        className={styles.compose}
        onClick={toggleIsCompose}
        startIcon={<AddRoundedIcon fontSize='large' />}>
        Compose
      </Button>

      <SidebarOption
        Icon={InboxRoundedIcon}
        title='Inbox'
        number={inboxLength}
        onClick={() => history.push('/mail/inbox')}
        selected={location.pathname === '/mail/inbox'}
      />
      <SidebarOption
        Icon={StarRoundedIcon}
        title='Starred'
        number={starredLength}
        onClick={() => history.push('/mail/starred')}
        selected={location.pathname === '/mail/starred'}
      />
      <SidebarOption
        Icon={SendRoundedIcon}
        title='Sent'
        number={sentLength}
        onClick={() => history.push('/mail/sent')}
        selected={location.pathname === '/mail/sent'}
      />
      <SidebarOption
        Icon={NoteRoundedIcon}
        title='Drafts'
        number={draftsLength}
        onClick={() => history.push('/mail/drafts')}
        selected={location.pathname === '/mail/drafts'}
      />

      <SidebarOption
        Icon={ExpandMoreRoundedIcon}
        title='More'
        number={''}
        onClick={toggleShowMore}
        className={showMore ? styles.showMore__on : styles.showMore__off}
      />
      {showMore && (
        <>
          <SidebarOption
            Icon={DeleteRoundedIcon}
            title='Trash'
            number={trashLength}
            onClick={() => history.push('/mail/trash')}
            selected={location.pathname === '/mail/trash'}
          />
        </>
      )}
    </div>
  );
}

export default Sidebar;
