import React from 'react';
import styles from '../styles.module.scss';

function Message(props) {
  return (
    <div className={styles.message}>
      <div className={styles.messageAuthor}>{props.author}</div>
      <div className={styles.messageText}>{props.message}</div>
      <button className={styles.messageEdit} onClick={props.edit}>
        Edit
      </button>
      <button className={styles.messageDelete} onClick={props.delete}>
        Delete
      </button>
    </div>
  );
}

export default Message;
