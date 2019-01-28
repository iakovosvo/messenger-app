import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Message from '../components/Message';
import { getMessages, deleteMessage, updateMessage } from '../actions/index';
import styles from '../styles.module.scss';

class MessageList extends Component {
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
    this.props.getMessages();
  }

  editMessage(message) {
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
    const { messages } = this.props;
    const messageHeader =
      messages.length >= 1 ? 'New Thread' : 'Welcome, start by creating a new thread.';

    return (
      <Fragment>
        <h2 className={styles.messageTitle}>{messageHeader}</h2>
        <div className={styles.messageList}>
          {messages.map(
            message =>
              this.props.parentId === message.id ||
              (this.props.parentId === message.parentId && (
                <Message
                  key={message.id}
                  message={message.message}
                  author={message.author}
                  delete={() => this.props.deleteMessage(message.id)}
                  edit={() => this.editMessage(message)}
                />
              ))
          )}
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
    getMessages: () => {
      dispatch(getMessages());
    },
    deleteMessage: id => {
      dispatch(deleteMessage(id));
    },
    updateMessage: (id, message) => {
      dispatch(updateMessage(id, message));
    }
  };
};

const mapStateToProps = state => {
  return {
    messages: state.messages,
    parentId: state.currentId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);
