import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toggleTrash from './../../../redux/actions/toggleTrash';
import toggleRead from './../../../redux/actions/toggleRead';
import getEmails from './../../../redux/actions/getEmails';
import { Checkbox, IconButton, Tooltip } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import styles from './style/EmailOptions.module.css';

function EmailOptions({ isViewMode }) {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  if (isViewMode) {
    return (
      <div className={styles.settings}>
        <div>
          <Tooltip title='Back' placement='top'>
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Move to trash' placement='top'>
            <IconButton onClick={() => dispatch(toggleTrash(id)) + history.goBack()}>
              <DeleteRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Mark as unread' placement='top'>
            <IconButton onClick={() => dispatch(toggleRead(id)) + history.goBack()}>
              <DraftsRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div>
          <IconButton>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton>
            <ChevronRightRoundedIcon />
          </IconButton>
          <IconButton>
            <KeyboardRoundedIcon />
          </IconButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.settings}>
        <div>
          <Tooltip title='Select all' placement='top'>
            <Checkbox />
          </Tooltip>
          <Tooltip title='Refresh' placement='top'>
            <IconButton onClick={() => dispatch(getEmails())}>
              <RefreshRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='More' placement='top'>
            <IconButton>
              <MoreVertRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div>
          <IconButton>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton>
            <ChevronRightRoundedIcon />
          </IconButton>
          <IconButton>
            <KeyboardRoundedIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default EmailOptions;
