import { message } from '../actions/index';

const initialState = {
  messages: [],
  currentId: ''
};

export default function rootReducer(state = initialState, { type, data }) {
  switch (type) {
    case message.addMessage:
      return {
        ...state,
        messages: [...state.messages, data]
      };
    case message.updateMessageSuccess:
      return {
        ...state,
        messages: state.messages.map(message => {
          if (message.id === data.id) {
            return {
              ...message,
              ...data
            };
          } else {
            return message;
          }
        })
      };
    case message.getParentId:
      return {
        ...state,
        currentId: data.id
      };
    case message.setParentId:
      return {
        ...state,
        currentId: data.id
      };
    case message.loadMessages: {
      return {
        ...state,
        messages: [...state.messages, ...data]
      };
    }
    case message.loadMessage: {
      return {
        ...state,
        messages: [...state.messages, data]
      };
    }
    case message.loadThread: {
      return {
        ...state,
        messages: [...state.messages, data]
      };
    }
    case message.showThread: {
      return {
        ...state,
        messages: state.messages.filter(message => message.parentId === data.id)
      };
    }
    case message.deleteMessage: {
      return {
        ...state,
        messages: state.messages.filter(message => message.id !== data.id)
      };
    }
    default:
      return state;
  }
}
