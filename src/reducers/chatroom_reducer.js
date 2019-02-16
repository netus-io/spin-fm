import {
  ADD_CHATROOM_MESSAGE,
  REMOVE_ALL_CHATROOM_MESSAGES } from '../actions/types';

// const INITIAL_STATE = { }
const lenna = "https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/220px-Lenna_%28test_image%29.png"
const INITIAL_STATE = {
  username: "kPatch",
  chats: [{
      username: "kPatch",
      content: "Hello World!",
      img: lenna,
  }, {
      username: "Lenna",
      content: "Hey! What's up?",
      img: lenna,
  }, {
      username: "kPatch",
      content: "Just coding up this app. Hbu?",
      img: lenna,
  }, {
      username: "Lenna",
      content: "Cool!.",
      img: lenna,
  }, {
      username: "Lenna",
      content: "What is it about?",
      img: lenna,
  }, {
      username: "Lenna",
      content: ":)",
      img: lenna,
  }, {
      username: "kPatch",
      content: "It's called spinning.fm, it's p2p music network.",
      img: lenna,
  }, {
      username: "Alice Chen",
      content: "Wow!! How can I join??!",
      img: lenna,
  }]
};

export default(state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_CHATROOM_MESSAGE:
      return {
        ...state,
        'chatroom_messages': state.chats.push(action.payload)
      }
    case REMOVE_ALL_CHATROOM_MESSAGES:
      return INITIAL_STATE
    default:
      return state
  }
}