import React, { Component } from 'react'
import _ from 'lodash'

import Message from './Message'
import './ChatRoom.css'

class ChatRoom extends Component {
  constructor(props) {
    super(props)
    this.submitMessage = this.submitMessage.bind(this)
  }

  componentDidMount() {
    const msg = this.msgRef
    this.scrollToBottom();
}

  componentDidUpdate() {
      this.scrollToBottom();
  }

  scrollToBottom() {
      this.chatsRef.scrollTop = this.chatsRef.scrollHeight;
  }

  submitMessage(e) {
    e.preventDefault()
    this.props.addChatRoomMessage({
      username: this.props.chatroomInfo.username,
      content: this.msgRef.value,
      img: "https://avatars1.githubusercontent.com/u/1270302?s=460&v=4"     
    })
    this.msgRef.value = ""
  }

  renderChatRoomMessages(chatroomInfo) {
    const username = chatroomInfo.username
    return _.map(chatroomInfo.chats, chat => {
      return (
        <Message chat={ chat } user={ username } key={ chat.username + chat.content}/>
      )
    })
  }

  render() {
    return(
      <div className="chatroom grey lighten-2">
        <ul 
          className="chats" 
          ref={(ref) => { this.chatsRef = ref}} 
          >
          { this.renderChatRoomMessages(this.props.chatroomInfo) }
        </ul>
        <div className="row grey lighten-5">
          <form className="col s12" onSubmit={(e) => this.submitMessage(e)}>
            <div className="">
              <div className="input-field col s9">
                <input 
                  id="name"  
                  type="text" 
                  className="validate" 
                  ref={(ref) => { this.msgRef = ref}} 
                  />
                <label htmlFor="name">Your message</label>
              </div>
              <div className="input-field col s3">
                <button className="btn waves-effect waves-light" type="submit" name="action">Go!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>  
    ) 
  }
}

export default ChatRoom