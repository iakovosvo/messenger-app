import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addThread, loadThreads } from '../actions/index';
import styles from '../styles.module.scss';

class NewThread extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: '',
      author: 'John'
    };
  }

  onChange = e => {
    const message = e.target.value;
    this.setState(() => ({ message }));
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.addThread({
      message: this.state.message,
      author: this.state.author,
      parentId: null
    });
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <h1 className={styles.threadsTitle}>Start a new thread</h1>
        <form onSubmit={this.onSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            value={this.state.message}
            onChange={this.onChange}
            placeholder="Enter a thread name"
          />
          <button type="submit" className={styles.button}>
            Create
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addThread: ({ message, author, parentId }) => {
      dispatch(addThread({ message, author, parentId }));
    },
    loadThreads: () => {
      dispatch(loadThreads());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewThread);
