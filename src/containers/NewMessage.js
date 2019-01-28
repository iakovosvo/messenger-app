import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage, loadMessages } from '../actions/index';
import styles from '../styles.module.scss';

class NewMessage extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: '',
      author: 'Author',
      parentId: ''
    };
  }

  onChange(e) {
    const message = e.target.value;
    this.setState(() => ({ message }));
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addMessage({
      message: this.state.message,
      author: this.state.author,
      parentId: this.props.parentId
    });
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            value={this.state.message}
            onChange={this.onChange}
            placeholder="Type a message"
          />
          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMessage: ({ message, author, parentId }) => {
      dispatch(addMessage({ message, author, parentId }));
    },
    loadMessages: () => {
      dispatch(loadMessages());
    }
  };
};

const mapStateToProps = state => {
  return {
    parentId: state.currentId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessage);
