import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getEmailsAction,
  moveToTrashAction,
  removeFromTrashAction,
  markAsUnreadAction,
  setFavoriteAction,
  unsetFavoriteAction,
  deleteEmailAction,
} from '../../../redux/actions/emailActions';
import styles from './styles/EmailOptions.module.css';
import { Checkbox, IconButton, Tooltip } from '@material-ui/core';
// import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
// import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

export default function EmailOptions(props) {
  return (
    <div className={styles.component}>
      <div className={styles.wrapper}>
        {/* This is where the developer needs to insert the export functions below */}
        {props.children}
      </div>

      <div className={styles.wrapper}>
        {/* 
        <IconButton>
          <ChevronLeftRoundedIcon />
        </IconButton>
        <IconButton>
          <ChevronRightRoundedIcon />
        </IconButton>
         */}
        <Tooltip title='null'>
          <IconButton>
            <KeyboardRoundedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export function SelectOne() {
  // TODO
  return (
    <Tooltip
      // title='Select / Unselect'
      title='null'>
      <Checkbox />
    </Tooltip>
  );
}

export function SelectAll() {
  // TODO
  return (
    <Tooltip
      // title='Select all / Unselect all'
      title='null'>
      <Checkbox />
    </Tooltip>
  );
}

export function GoBack() {
  const history = useHistory();
  return (
    <Tooltip title='Back'>
      <IconButton onClick={() => history.goBack()}>
        <ArrowBackRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export function Refetch() {
  const dispatch = useDispatch();
  return (
    <Tooltip title='Refresh'>
      <IconButton onClick={() => dispatch(getEmailsAction())}>
        <RefreshRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export function MarkUnread({ id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Tooltip title='Mark as unread'>
      <IconButton
        onClick={() => {
          dispatch(markAsUnreadAction(id));
          history.goBack();
        }}>
        <DraftsRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export function MarkStar({ id, isStarred }) {
  const dispatch = useDispatch();
  if (isStarred) {
    return (
      <Tooltip title='Unfavorite'>
        <IconButton onClick={() => dispatch(unsetFavoriteAction(id))}>
          <StarRoundedIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title='Favorite'>
        <IconButton onClick={() => dispatch(setFavoriteAction(id))}>
          <StarOutlineRoundedIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

export function PlaceTrash({ id, isInTrash }) {
  const dispatch = useDispatch();
  const history = useHistory();
  if (isInTrash) {
    return (
      <Tooltip title='Not trash'>
        <IconButton
          onClick={() => {
            dispatch(removeFromTrashAction(id));
            history.goBack();
          }}>
          <RestoreFromTrashRoundedIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title='Move to trash'>
        <IconButton
          onClick={() => {
            dispatch(moveToTrashAction(id));
            history.goBack();
          }}>
          <DeleteRoundedIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

export function Delete({ id }) {
  const dispatch = useDispatch();
  return (
    <Tooltip title='Delete'>
      <IconButton onClick={() => dispatch(deleteEmailAction(id))}>
        <DeleteForeverRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export function More() {
  // TODO
  return (
    <Tooltip
      // title='More'
      title='null'>
      <IconButton>
        <MoreVertRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}
