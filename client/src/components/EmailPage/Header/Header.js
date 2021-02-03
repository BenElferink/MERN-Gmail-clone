import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles/Header.module.css';
import AccountControls from './AccountControls/AccountControls';
import EditImageModal from './EditImageModal/EditImageModal';
import GmailLogo from './images/gmail-logo.png';
import { IconButton, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

export default function Header({ toggleShowSidebar }) {
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
          <Avatar src={user.profilePicture} />
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
