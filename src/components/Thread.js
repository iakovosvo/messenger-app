import React from 'react';
import classNames from 'classnames';
import styles from '../styles.module.scss';

function Thread(props) {
  const threadClass = classNames(styles.thread, { [styles.threadOpen]: props.activeThread });

  return (
    <div className={threadClass} onClick={props.openThread}>
      <div className={styles.threadAuthor}>{props.message}</div>
      <div className={styles.threadOptions}>
        <button className={styles.threadEdit} onClick={props.editThread}>
          Edit
        </button>
        <button className={styles.threadDelete} onClick={props.deleteThread}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Thread;
