import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../../redux/actions/accountActions';
import styles from './style/AccountControls.module.css';
import { Avatar, Badge, Button } from '@material-ui/core';

function AccountControls({ user, toggleShowEditImage, toggleShowProfile }) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <Badge
        badgeContent='edit'
        color='secondary'
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
        <Avatar className={styles.avatar} src={user.profilePicture} />
      </Badge>

      <p>
        {user.name.first} {user.name.last}
        <br />
        {user.email}
      </p>

      <Button onClick={() => history.push('/GitHub')}>Visit my GitHub page</Button>
      <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
    </div>
  );
}

export default AccountControls;
