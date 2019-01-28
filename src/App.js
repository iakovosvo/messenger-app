import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageList from './containers/MessageList';
import NewMessage from './containers/NewMessage';
import NewThread from './containers/NewThread';
import ThreadList from './containers/ThreadList';
import styles from './styles.module.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: ''
    };
  }

  render() {
    const { messages } = this.props;
    return (
      <div className={styles.main}>
        <div className={styles.threads}>
          <NewThread />
          <ThreadList />
        </div>
        <div className={styles.messages}>
          <MessageList />
          {messages.length >= 1 && <NewMessage />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(App);
