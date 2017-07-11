'use babel';

import React from 'react';
import InputAndSend from './inputAndSend/inputAndSend.jsx';
import TopMenu from './topMenu.jsx';
import MessagesView from './messagesView/messagesView.jsx';
import PartnerMessage from './messagesView/partnerMessage.jsx';
import UserMessage from './messagesView/userMessage.jsx';

export default class ChatWindow extends React.PureComponent {
  constructor() {
    super();
    this.state = {messages: [<PartnerMessage message='Why am i so sexy?' time={1} key={1}/>]};
    this.counter = 2;
  }

  shouldComponentUpdate(a, b) {
    return true;
  }
  
  pushMessage(msgObject) {
    const messages = this.state.messages;
    if (msgObject.sender === 'user') {
      messages.push(<UserMessage key={this.counter} message={msgObject.message} time={msgObject.time} />);
    } else {
      messages.push(<PartnerMessage key={this.counter} message={msgObject.message} time={msgObject.time} />)
    }
    this.counter++;
    this.setState({messages});
  }

  render() {
    return (
      <div className="chat_window" >
        <TopMenu />
        <MessagesView messages={this.state.messages}/>
        
        <InputAndSend pushMessage={this.pushMessage.bind(this)}/>
      </div>
    );
  }
}