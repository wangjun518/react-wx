import React, {Component} from 'react'
import FriendItemList from  './FriendItemList'
import MessageList from  './MessageList'
import SendMessageBox from './SendMessageBox'

import './ChatContainer.less'


class ChatContainer extends Component{
  constructor(props){
    super(props)
  }
  handleSendMessage(msgHTML){
    this.refs.messageList.addMessageHtml(msgHTML);
  }
  render(){
    return (
      <div className="chat-container">
        <div className="chat-friends">
          <FriendItemList />
        </div>
        <div className="chat-right">
          ADS
        </div>
        <div className="chat-message">
          <MessageList ref="messageList"/>
          <SendMessageBox onSendMessage={this.handleSendMessage.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default ChatContainer;
