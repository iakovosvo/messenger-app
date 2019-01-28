import axios from 'axios';

const apiBase = 'http://localhost:3000';

export const message = {
  addMessage: 'ADD_MESSAGE',
  updateMessageSuccess: 'UPDATE_MESSAGE_SUCCESS',
  getParentId: 'GET_PARENT_ID',
  setParentId: 'SET_PARENT_ID',
  loadMessages: 'LOAD_MESSAGES',
  loadMessage: 'LOAD_MESSAGE',
  loadThread: 'LOAD_THREAD',
  showThread: 'SHOW_THREAD',
  loadThreads: 'LOAD_THREADS',
  addMessageFailure: 'ADD_MESSAGE_FAIL',
  updateMessageFailure: 'UPDATE_MESSAGE_FAIL',
  deleteMessage: 'DELETE_MESSAGE'
};

export const getParentId = id => ({
  type: message.getParentId,
  data: {
    id
  }
});

export const setParentId = id => ({
  type: message.getParentId,
  data: {
    id
  }
});

export const loadMessages = data => ({
  type: message.loadMessages,
  data
});

export const loadMessage = data => ({
  type: message.loadMessage,
  data
});

export const loadThread = data => ({
  type: message.loadThread,
  data
});

export const showThread = id => ({
  type: message.showThread,
  data: {
    id
  }
});

export const loadThreads = data => ({
  type: message.loadThreads,
  data
});

export const addMessageFailure = error => ({
  type: message.addMessageFailure,
  data: {
    error
  }
});

export const updateMessageFailure = error => ({
  type: message.updateMessageFailure,
  data: {
    error
  }
});

export const updateMessageSuccess = data => ({
  type: message.updateMessageSuccess,
  data
});

export const deleteMessageSuccess = id => {
  return {
    type: message.deleteMessage,
    data: {
      id
    }
  };
};

export const addMessage = ({ message, author, parentId }, callback) => {
  return dispatch => {
    axios
      .post(`${apiBase}/messages`, {
        message,
        author,
        parentId
      })
      .then(res => {
        dispatch(loadMessage(res.data));
      })
      .catch(error => {
        dispatch(addMessageFailure(error.message));
      });
  };
};

export const updateMessage = ({ id, message, author, parentId }, callback) => {
  return dispatch => {
    axios
      .put(`${apiBase}/messages/${id}`, {
        message,
        author,
        parentId
      })
      .then(res => {
        dispatch(updateMessageSuccess(res.data));
      })
      .catch(error => {
        dispatch(updateMessageFailure(error.message));
      });
  };
};

export const addThread = ({ message, author, parentId }, callback) => {
  return dispatch => {
    axios
      .post(`${apiBase}/messages`, {
        message,
        author,
        parentId
      })
      .then(res => {
        dispatch(loadThread(res.data));
        dispatch(getParentId(res.data.id));
      })
      .catch(error => {
        dispatch(addMessageFailure(error.message));
      });
  };
};

export const deleteMessage = id => {
  return dispatch => {
    return axios.delete(`${apiBase}/messages/${id}`).then(() => {
      dispatch(deleteMessageSuccess(id));
    });
  };
};

export const deleteThread = id => {
  return dispatch => {
    return axios.delete(`${apiBase}/messages/${id}`).then(() => {
      dispatch(deleteMessageSuccess(id));
    });
  };
};

export const getMessages = () => {
  return dispatch => {
    return axios
      .get(`${apiBase}/messages`)
      .then(response => {
        dispatch(loadMessages(response.data));
      })
      .catch(error => {
        dispatch(addMessageFailure(error.message));
      });
  };
};

export const getThreads = () => {
  return dispatch => {
    return axios
      .get(`${apiBase}/messages`)
      .then(response => {
        dispatch(loadThreads(response.data));
      })
      .catch(error => {
        dispatch(addMessageFailure(error.message));
      });
  };
};
