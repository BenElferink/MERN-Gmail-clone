import React, { useState } from 'react';
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

  return (
    <div className={styles.sidebar}>
      <Button className={styles.sidebar__compose} startIcon={<AddRoundedIcon fontSize='large' />}>
        Compose
      </Button>

      <SidebarOption Icon={InboxRoundedIcon} title='Inbox' number={42} />
      <SidebarOption Icon={StarRoundedIcon} title='Starred' number={42} />
      <SidebarOption Icon={SendRoundedIcon} title='Sent' number={42} selected={true} />
      <SidebarOption Icon={NoteRoundedIcon} title='Drafts' number={42} />

      <SidebarOption
        Icon={ExpandMoreRoundedIcon}
        title='More'
        number={1}
        onClick={toggleShowMore}
        className={showMore ? styles.showMore__on : styles.showMore__off}
      />
      {showMore && (
        <>
          <SidebarOption Icon={DeleteRoundedIcon} title='Trash' number={42} />
        </>
      )}
    </div>
  );
}

export default Sidebar;
