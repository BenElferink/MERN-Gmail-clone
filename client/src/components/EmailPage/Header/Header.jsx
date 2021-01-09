import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { imageUrl } from '../../../api';
import GmailLogo from './img/gmail-logo.png';
import AccountControls from './AccountControls/AccountControls';
import EditImageModal from './EditImageModal/EditImageModal';
import { IconButton, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import styles from './style/Header.module.css';

function Header({ toggleShowSidebar }) {
  const { user } = useSelector((state) => state.userReducer);

  const [showProfile, setShowProfile] = useState(false);
  const [showEditImage, setShowEditImage] = useState(false);

  const toggleShowProfile = () => setShowProfile(!showProfile);
  const toggleShowEditImage = () => setShowEditImage(!showEditImage);

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

      <div className={styles.side + ' ' + styles.relative}>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsRoundedIcon />
        </IconButton>
        <IconButton onClick={toggleShowProfile}>
          <Avatar src={user.imageFileName ? imageUrl + user.imageFileName : ''} />
        </IconButton>

        {showProfile && (
          <AccountControls
            user={user}
            toggleShowProfile={toggleShowProfile}
            toggleShowEditImage={toggleShowEditImage}
          />
        )}
        {showEditImage && <EditImageModal toggleShowEditImage={toggleShowEditImage} />}
      </div>
    </header>
  );
}

export default Header;
