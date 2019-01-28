import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Thread from '../components/Thread';
import {
  getThreads,
  deleteMessage,
  updateMessage,
  showThread,
  setParentId
} from '../actions/index';
import styles from '../styles.module.scss';

class ThreadList extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      id: '',
      message: '',
      author: '',
      parentId: '',
      onEdit: false
    };
  }
  componentDidMount() {
    this.props.getThreads();
  }

  deleteThread(id) {
    this.props.messages.forEach(message => {
      if (id === message.parentId || id === message.id) {
        this.props.deleteMessage(message.id);
      }
    });
  }

  editThread(message) {
    this.setState({
      id: message.id,
      message: message.message,
      author: message.author,
      parentId: message.parentId,
      onEdit: true
    });
  }

  onChange(e) {
    const message = e.target.value;
    this.setState(() => ({ message }));
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateMessage({
      id: this.state.id,
      message: this.state.message,
      author: this.state.author,
      parentId: this.props.parentId
    });
    this.setState({ message: '', onEdit: false });
  }

  render() {
    const { messages, setParentId, currentId } = this.props;
    //const active = currentId ===

    return (
      <Fragment>
        <h2 className={styles.threadTitle}>Threads</h2>
        <div className={styles.ThreadList}>
          {messages.map(message => {
            const activeThread = currentId === message.id ? 'Open' : '';
            return (
              message.parentId === null && (
                <Thread
                  activeThread={activeThread}
                  openThread={() => setParentId(message.id)}
                  key={message.id}
                  message={message.message}
                  author={message.author}
                  deleteThread={() => this.deleteThread(message.id)}
                  editThread={() => this.editThread(message)}
                />
              )
            );
          })}
          {this.state.onEdit && (
            <div className={styles.form}>
              <form onSubmit={this.onSubmit}>
                <input
                  className={styles.input}
                  value={this.state.message}
                  onChange={this.onChange}
                  type="text"
                />
                <button type="submit" className={styles.button}>
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getThreads: () => {
      dispatch(getThreads());
    },
    deleteMessage: id => {
      dispatch(deleteMessage(id));
    },
    updateMessage: id => {
      dispatch(updateMessage(id));
    },
    showThread: parentId => {
      dispatch(showThread(parentId));
    },
    setParentId: parentId => {
      dispatch(setParentId(parentId));
    }
  };
};

const mapStateToProps = state => {
  return {
    messages: state.messages,
    currentId: state.currentId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadList);
