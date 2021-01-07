import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { url } from './../../../../api';
import logout from './../../../../redux/actions/logout';
import { Avatar, Badge, Button } from '@material-ui/core';
import styles from './style/AccountControls.module.css';

function AccountControls({ user, toggleShowEditImage, toggleShowProfile }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Badge
        badgeContent='edit'
        color='primary'
        overlap='circle'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          toggleShowEditImage();
          toggleShowProfile();
        }}>
        <Avatar className={styles.avatar} src={`${url}/uploads/${user.imageFileName}`} />
      </Badge>
      {user.name.first} {user.name.last}
      <br />
      {user.email}
      <Link to='/GitHub'>
        <Button>Visit my GitHub page</Button>
      </Link>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </div>
  );
}

export default AccountControls;
