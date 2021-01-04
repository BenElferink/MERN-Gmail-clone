import React from 'react';
import { IconButton } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import styles from './style/EmailOptions.module.css';

function EmailOptions({ children }) {
  return (
    <div className={styles.settings}>
      <div>{children}</div>
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

export default EmailOptions;
