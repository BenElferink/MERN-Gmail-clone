import React from 'react';
import styles from './style/SidebarOption.module.css';

function SidebarOption({ Icon, title, number, selected, onClick, className }) {
  return (
    <div className={`${styles.item} ${selected && styles.active} ${className}`} onClick={onClick}>
      <Icon fontSize='large' />
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
}

export default SidebarOption;
