'use babel';

import React from 'react';
import MessageInput from './messageInput.jsx';
import SendButton from './sendButton.jsx';

export default class InputAndSend extends React.Component {
  constructor() {
    super();
    this.state = { inputMessage: '' };
    this.enterButtonPressed = false;
  }

  setInputMessage(msg) {
    this.setState({ inputMessage: msg });
  }

  unsetEnterButtonPressed() {
    this.enterButtonPressed = false;
  }

  onSendButtonPressed(e) {
    this.props.sendMessage({ time: new Date(), message: this.state.inputMessage });
    this.setState({ inputMessage: '' });
    this.enterButtonPressed = true;
  }

  render() {
    return (
      <div className="bottom_wrapper">
        <MessageInput setInputMessage={this.setInputMessage.bind(this)}
        message={this.state.inputMessage}
        onSendButtonPressed={this.onSendButtonPressed.bind(this)}
        enterButtonPressed={this.enterButtonPressed}
        unsetEnterButtonPressed={this.unsetEnterButtonPressed.bind(this)} />
        <SendButton onSendButtonPressed={this.onSendButtonPressed.bind(this)} />
      </div>
    );
  }
}
