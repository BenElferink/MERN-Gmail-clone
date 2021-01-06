import React from 'react';
import { IconButton, Avatar } from '@material-ui/core';
import GmailLogo from './img/gmail-logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import styles from './style/Header.module.css';

function Header({ toggleShowSidebar }) {
  return (
    <header className={styles.container}>
      <div className={styles.side}>
        <IconButton onClick={toggleShowSidebar}>
          <MenuIcon />
        </IconButton>
        <img src={GmailLogo} alt='gmail logo' />
      </div>

      <div className={styles.middle}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input type='text' placeholder='Search mail' />
      </div>

      <div className={styles.side}>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <Avatar />
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
