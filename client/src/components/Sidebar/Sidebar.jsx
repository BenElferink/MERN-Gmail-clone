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

function Sidebar() {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);

  const history = useHistory();
  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      <Button className={styles.sidebar__compose} startIcon={<AddRoundedIcon fontSize='large' />}>
        Compose
      </Button>

      <SidebarOption
        Icon={InboxRoundedIcon}
        title='Inbox'
        number={42}
        onClick={() => history.push('/')}
        selected={location.pathname === '/'}
      />
      <SidebarOption
        Icon={StarRoundedIcon}
        title='Starred'
        number={42}
        onClick={() => history.push('/starred')}
        selected={location.pathname === '/starred'}
      />
      <SidebarOption
        Icon={SendRoundedIcon}
        title='Sent'
        number={42}
        onClick={() => history.push('/sent')}
        selected={location.pathname === '/sent'}
      />
      <SidebarOption
        Icon={NoteRoundedIcon}
        title='Drafts'
        number={42}
        onClick={() => history.push('/drafts')}
        selected={location.pathname === '/drafts'}
      />

      <SidebarOption
        Icon={ExpandMoreRoundedIcon}
        title='More'
        number={1}
        onClick={toggleShowMore}
        className={showMore ? styles.showMore__on : styles.showMore__off}
      />
      {showMore && (
        <>
          <SidebarOption
            Icon={DeleteRoundedIcon}
            title='Trash'
            number={42}
            onClick={() => history.push('/trash')}
            selected={location.pathname === '/trash'}
          />
        </>
      )}
    </div>
  );
}

export default Sidebar;
