import React from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import styles from './style/EmailCategory.module.css';

function EmailCategory() {
  return (
    <div className={styles.emailCategory}>
      <div className={styles.emailCategory__settings}>
        <div>
          <Checkbox />
          <IconButton>
            <RefreshRoundedIcon />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
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

      <div>
        <div className={`${styles.emailCategory__listItem} ${styles.unread}`}>
          <Checkbox />
          <IconButton>
            <StarOutlineRoundedIcon />
          </IconButton>
          <h4>received_from@gmail.com</h4>
          &nbsp;&nbsp;
          <div className={styles.emailCategory__listItem__message}>
            <h3>Top Subject!</h3>
            &nbsp;&nbsp;
            <p>Project X is launching! Happy New Year!!!</p>
          </div>
          &nbsp;&nbsp;
          <p>Dec 30</p>
        </div>
      </div>

      <div className={`${styles.emailCategory__listItem} ${styles.read}`}>
        <Checkbox />
        <IconButton>
          <StarRoundedIcon />
        </IconButton>
        <h4>received_from@gmail.com</h4>
        &nbsp;&nbsp;
        <div className={styles.emailCategory__listItem__message}>
          <h3>Top Subject!</h3>
          &nbsp;&nbsp;
          <p>Project X is launching! Happy New Year!!!</p>
        </div>
        &nbsp;&nbsp;
        <p>Dec 30</p>
      </div>

      <div className={`${styles.emailCategory__listItem} ${styles.read}`}>
        <Checkbox />
        <IconButton>
          <StarOutlineRoundedIcon />
        </IconButton>
        <h4>received_from@gmail.com</h4>
        &nbsp;&nbsp;
        <div className={styles.emailCategory__listItem__message}>
          <h3>Top Subject!</h3>
          &nbsp;&nbsp;
          <p>Project X is launching! Happy New Year!!!</p>
        </div>
        &nbsp;&nbsp;
        <p>Dec 30</p>
      </div>
    </div>
  );
}

export default EmailCategory;
