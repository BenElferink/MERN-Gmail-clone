import React from 'react';
import SidebarOption from '../SidebarOption/SidebarOption';
import { Button } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/Add';
import InboxRoundedIcon from '@material-ui/icons/Inbox';
import StarRoundedIcon from '@material-ui/icons/Star';
import SendRoundedIcon from '@material-ui/icons/Send';
import NoteRoundedIcon from '@material-ui/icons/Note';
import DeleteRoundedIcon from '@material-ui/icons/Delete';
import styles from './style/Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Button className={styles.sidebar__compose} startIcon={<AddRoundedIcon fontSize='large' />}>
        Compose
      </Button>

      <SidebarOption Icon={InboxRoundedIcon} title='Inbox' number={54} />
      <SidebarOption Icon={StarRoundedIcon} title='Starred' number={54} />
      <SidebarOption Icon={SendRoundedIcon} title='Sent' number={54} />
      <SidebarOption Icon={NoteRoundedIcon} title='Drafts' number={54} />
      <SidebarOption Icon={DeleteRoundedIcon} title='Trash' number={54} />
    </div>
  );
}

export default Sidebar;
